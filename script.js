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