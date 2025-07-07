// 1️⃣ Select DOM elements
const searchButton = document.getElementById('searchBtn');  // Button to trigger the API call
const bookContainer = document.getElementById('bookResults');  // Section where books will be displayed

/ 2️⃣ Define a function that fetches homeschooling books from the API
function fetchBooks() {
  // 3️⃣ Clear any previous results before loading new ones
  bookContainer.innerHTML = '';