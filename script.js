// 1️⃣ Select DOM elements from the HTML
const searchButton = document.getElementById('searchBtn');           // Button to show the next book
const bookContainer = document.getElementById('bookResults');        // Container where the book card will be displayed

// 2️⃣ Create variables to hold fetched books and track which one to show
let books = [];               // Will store the array of books from the API
let currentIndex = 0;         // Will track which book index we're currently showing

// 3️⃣ Function to fetch all homeschooling books from the API when the page loads
function fetchAllBooks() {
  const url = 'https://openlibrary.org/subjects/home_schooling.json?limit=10';  // API endpoint with a limit of 10 books
