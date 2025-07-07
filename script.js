// 1️⃣ Select DOM elements
const searchButton = document.getElementById('searchBtn');  // Button to trigger the API call
const bookContainer = document.getElementById('bookResults');  // Section where books will be displayed

/ 2️⃣ Define a function that fetches homeschooling books from the API
function fetchBooks() {
  // 3️⃣ Clear any previous results before loading new ones
  bookContainer.innerHTML = '';

  // 4️⃣ Define the API URL for homeschooling subject
  const url = 'https://openlibrary.org/subjects/home_schooling.json?limit=10';

  // 5️⃣ Make the API request
  fetch(url)
    .then(response => {
      // 6️⃣ Check if the request was successful (status 200 OK)
      if (!response.ok) {
        throw new Error('Network response was not ok');
        }
      // 7️⃣ Parse the response into JSON
      return response.json();
    })
    .then(data => {
      // 8️⃣ Extract the array of books from the response object
      const books = data.works;

      // 9️⃣ Loop over each book object in the array
      books.forEach(book => {
        // 1️⃣0️⃣ Create a card element for the book
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow p-4 mb-4';

        // 1️⃣1️⃣ Create and add the book title
        const title = document.createElement('h2');
        title.textContent = book.title;
        title.className = 'text-xl font-bold mb-2';

        // 1️⃣2️⃣ Get the author's name if available
        const author = document.createElement('p');
        author.textContent = book.authors?.[0]?.name || 'Unknown author';
        author.className = 'text-gray-600';

        // 1️⃣3️⃣ Append the title and author to the card
        card.appendChild(title);
        card.appendChild(author);