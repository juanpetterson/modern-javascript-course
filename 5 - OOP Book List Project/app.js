// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add Book To List
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');

  // Create tr element
  const row = document.createElement('tr');

  // Inserts cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
};

// Show Alert
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement('div');
  //Add classes
  div.className = `alert ${className}`;
  //Add  text
  div.appendChild(document.createTextNode(message));
  //Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');
  // Insert alert
  container.insertBefore(div, form);

  // Timeout after 3sec
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);
};

// Delete book
UI.prototype.deleteBook = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

// Clear Field
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

// Event Listener for add Book
const bookForm = document.getElementById('book-form');
bookForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
    return;
  }
  // Add book to list
  ui.addBookToList(book);

  ui.showAlert('Book Added!', 'success');

  // Clear fields
  ui.clearFields();
});

// Event Listener for Delete
const bookList = document.getElementById('book-list');
bookList.addEventListener('click', function(e) {
  e.preventDefault();

  // Instantiate UI
  const ui = new UI();
  ui.deleteBook(e.target);

  // Show message
  ui.showAlert('Book Removed!', 'success');
});
