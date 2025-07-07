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
  // 10️⃣ Clear out any previous book shown in the container
  bookContainer.innerHTML = '';

  // 11️⃣ Get the book from the array using the current index
  const book = books[currentIndex];

  // 12️⃣ Create a new card for the book
  const card = document.createElement('div');
  card.className = 'bg-white rounded-lg shadow p-4 mb-4 text-center';

  // 13️⃣ If the book has a cover image, create and add an <img> element
  if (book.cover_id) {
    const image = document.createElement('img');
    image.src = `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`;  // Construct the cover image URL
    image.alt = `Cover of ${book.title}`;
    image.className = 'w-full h-64 object-cover rounded mb-4';
    card.appendChild(image);
  }

  // 14️⃣ Create and add the book title
  const title = document.createElement('h2');
  title.textContent = book.title;
  title.className = 'text-xl font-bold mb-2';
  card.appendChild(title);

  // 15️⃣ Get and display the author’s name if available
  const author = document.createElement('p');
  author.textContent = book.authors?.[0]?.name || 'Unknown author';   // Use optional chaining to avoid errors
  author.className = 'text-gray-600';
  card.appendChild(author);