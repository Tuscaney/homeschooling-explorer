// 1️⃣ Select DOM elements from the HTML
const searchButton = document.getElementById('searchBtn');           // Button to show the next book
const bookContainer = document.getElementById('bookResults');        // Container where the book card will be displayed

// 2️⃣ Create variables to hold fetched books and track which one to show
let books = [];               // Will store the array of books from the API
let currentIndex = 0;         // Will track which book index we're currently showing

// 3️⃣ Function to fetch all homeschooling books from the API when the page loads
function fetchAllBooks() {
  const url = 'https://openlibrary.org/subjects/home_schooling.json?limit=10';  // API endpoint with a limit of 10 books

  // 4️⃣ Fetch the data from the API
  fetch(url)
    .then(response => {
      // 5️⃣ Check if the HTTP response was successful (status code 200 OK)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // 6️⃣ Convert the response to JSON
      return response.json();
    })
    .then(data => {
      // 7️⃣ Store the book list in the global `books` array
      books = data.works;
      currentIndex = 0;         // Reset the index to start at the beginning
      showNextBook();           // Show the first book as soon as data is ready
    })
    .catch(error => {
      // 8️⃣ If there's an error (like network issues), show a message
      console.error('Error fetching books:', error);
      bookContainer.innerHTML = '<p class="text-red-500">Failed to load data. Please try again later.</p>';
    });
}

// 9️⃣ Function to display the next book in the list
function showNextBook() {
  // 1️⃣0️⃣ Clear out any previous book shown in the container
  bookContainer.innerHTML = '';

  // 1️⃣1️⃣ Get the current book from the array using the index
  const book = books[currentIndex];

  // 1️⃣2️⃣ Create a new card element to hold book info
  const card = document.createElement('div');
  card.className = 'bg-white rounded-lg shadow-md p-4 mb-6 max-w-md mx-auto transition duration-300 hover:shadow-lg';

  // 1️⃣3️⃣ If the book has a cover image, create an <img> element
  if (book.cover_id) {
    const image = document.createElement('img');
    image.src = `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`; // M = Medium size
    image.alt = `Cover of ${book.title}`;
    image.className = 'w-full h-64 object-cover rounded mb-4';
    card.appendChild(image);
  }

  // 1️⃣4️⃣ Add the book title as a heading
  const title = document.createElement('h2');
  title.textContent = book.title;
  title.className = 'text-xl font-semibold text-orange-700 mb-2';
  card.appendChild(title);

  // 1️⃣5️⃣ Display the author’s name if available
  const author = document.createElement('p');
  author.textContent = book.authors?.[0]?.name || 'Unknown author';  // Optional chaining prevents errors
  author.className = 'text-gray-600 italic mb-4';
  card.appendChild(author);

  // 1️⃣6️⃣ Add a “View on Open Library” button (styled as a link)
  const infoLink = document.createElement('a');
  infoLink.href = `https://openlibrary.org${book.key}`;   // Use the book’s key to build the link
  infoLink.target = '_blank';                             // Opens in new tab
  infoLink.textContent = 'View on Open Library';
  infoLink.className = 'inline-block bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition';
  card.appendChild(infoLink);

  // 1️⃣7️⃣ Add the completed card to the page
  bookContainer.appendChild(card);

  // 1️⃣8️⃣ Move to the next book index for the next button click
  currentIndex = (currentIndex + 1) % books.length;  // Loops back to the start after the last book
}

// 1️⃣9️⃣ Add an event listener to the search button
searchButton.addEventListener('click', showNextBook); // On click, show the next book

// 2️⃣0️⃣ Fetch books once the page is loaded so we’re ready to display them
fetchAllBooks();
