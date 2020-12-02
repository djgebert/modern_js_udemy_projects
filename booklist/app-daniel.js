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
  
  this.title, this.author, this.isbn = title, author, isbn;

  /**
   * @returns {string} The book's title
   */
  Book.prototype.title = () => title;

  /** @returns {string} The book's author */
  Book.prototype.author = () => author;

  /** @returns {number} The book's ISBN */
  Book.prototype.isbnValue = () => isbn;
}



// Write list of books to local storage


// Load list of books to local storage


// Delete an existing book from the list


// Add a book to the list
/**
 * Adds a book to the current global list
 * @param {Event} event 
 */
function addABook(event){
  try{
    const existingISBNs = bookList.map(book => book.isbnValue());
    if(existingISBNs.includes(isbnInput.value)){
      throw(new Error("ISBN already exists."));
    }
    const newBook = new Book(titleInput.value, authorInput.value, isbnInput.value);
    bookList.push(newBook);
    console.log(`Added ${newBook.title()} by ${newBook.author()}.`);
  }
  catch(error){
    displayError(error);
  }
  displayBooks();
  event.preventDefault();
}


// Display full book list
function displayBooks(){
  bookList.forEach(function(book){
    /** @type {HTMLTableRowElement} */  
    const newRowElement = document.createElement("tr");
    newRowElement.setAttribute("id", book.isbnValue());
    newRowElement.innerHTML = `
    <td>${book.title()}</td>
    <td>${book.author()}</td>
    <td>${book.isbnValue()}</td>
    <td><i class="fa fa-trash"></i></td>
    `
    bookListElement.appendChild(newRowElement);
  })
}

// Display error
function displayError(error){
  console.log("Error: " + error);
}
