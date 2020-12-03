// UI constants
/** @type {HTMLInputElement} */
const titleInput = document.getElementById("title");
/** @type {HTMLInputElement} */
const authorInput = document.getElementById("author");
/** @type {HTMLInputElement} */
const isbnInput = document.getElementById("isbn");
/** @type {HTMLFormElement} */
const bookForm = document.getElementById("book-form");
/** @type {HTMLTableSectionElement} */
const bookListElement = document.getElementById("book-list");

// Listeners
bookForm.addEventListener("submit", addABook);
bookListElement.addEventListener('click', handleDeleteClick);


/**
 * The global booklist.
 * @type {Array.<Book>}
 */
let bookList = [];

/**
 * Represents a book
 * @constructor
 * @param {string} title - The title of the book
 * @param {string} author - The author of the book
 * @param {number} isbn - The unique ISBN of the book
 */ 
function Book(title, author, isbn){
  if(!(title && author && isbn)){
    throw(new Error("Please provide all fields."));
  }
  
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}



// Write list of books to local storage


// Load list of books to local storage

/**
 * Handle a click on a delete icon
 * @param {Event} event 
 */
function handleDeleteClick(event){
  if(event.target.classList.contains('fa-trash')){
    /** @type {HTMLTableRowElement} */
    const rowElementToDelete = event.target.parentElement.parentElement;
    deleteABook(rowElementToDelete.id);
  }
}


// Delete an existing book from the list
function deleteABook(isbn){
  
  try{
    bookList.splice(bookList.findIndex(book => book.isbn === isbn), 1);
  }
  catch(error){
    displayError(error);
  }
  displayBooks();
}

// Add a book to the list
/**
 * Adds a book to the current global list
 * @param {Event} event 
 */
function addABook(event){
  try{
    const existingISBNs = bookList.map(book => book.isbn);
    if(existingISBNs.includes(isbnInput.value)){
      throw(new Error("ISBN already exists."));
    }
    const newBook = new Book(titleInput.value, authorInput.value, isbnInput.value);
    bookList.push(newBook);
    console.log(`Added ${newBook.title} by ${newBook.author}.`);
  }
  catch(error){
    displayError(error);
  }
  displayBooks();
  event.preventDefault();
}


// Display full book list
function displayBooks(){
  bookListElement.innerHTML = "";
  bookList.forEach(function(book){
    /** @type {HTMLTableRowElement} */  
    const newRowElement = document.createElement("tr");
    newRowElement.setAttribute("id", book.isbn);
    newRowElement.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><i class="fa fa-trash"></i></td>
    `
    bookListElement.appendChild(newRowElement);
  })
}

// Display error
function displayError(error){
  console.log("Error: " + error);
}
