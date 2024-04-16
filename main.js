
const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks() {
    const tableContainer = document.getElementById('tableContainer');
    let table = document.getElementById('booksTable');
    if (!table) {
        table = createBooksTable();
        tableContainer.appendChild(table);
    }

    //this is to clear the table:
    table.innerHTML = '';

    //this is to create table headers

    const headers = ['Title', 'Author', 'Pages', 'Read', 'Remove', 'Toggle Read'];
    const headerRow = table.insertRow();
    headers.forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell)
    });

    //populate books
    myLibrary.forEach((book, index) => {
        const row = table.insertRow();

        const titleCell = row.insertCell();
        titleCell.textContent = book.title;

        const authorCell = row.insertCell();
        authorCell.textContent = book.author;

        const pagesCell = row.insertCell();
        pagesCell.textContent = book.pages;

        const readCell = row.insertCell();
        readCell.textContent = book.read ? 'Yes' : 'No';

        //adds a remove button 
        const removeCell = row.insertCell();
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            displayBooks();
        });
        removeCell.appendChild(removeButton);

        //adds a read toggle
        const toggleCell = row.insertCell();
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Toggle Read';
        toggleButton.addEventListener('click', () => {
            book.read = !book.read;
            displayBooks();
        });
        toggleCell.appendChild(toggleButton);
    });
}

function createBooksTable() {
    const table = document.createElement('table');
    table.setAttribute('id', 'booksTable');
    return table;
}

addBookToLibrary('The Hobbit', 'J.R.R Tolkien', 295, false);
addBookToLibrary('1984', 'George Orwell', 328, false);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 208, false);

console.log(myLibrary);

//toggle add book form
document.addEventListener('DOMContentLoaded', () => {
    const showFormButton = document.getElementById('showFormButton');
    const bookForm = document.getElementById('bookForm');
    const addBookButton = document.getElementById('addBookButton');

    showFormButton.addEventListener('click', () => {
        const formError = document.getElementById('formError');

        bookForm.classList.toggle('visible');

        formError.hidden = true;

        if (bookForm.classList.contains('visible')) {
            showFormButton.textContent = 'Close Form';
        } else {
            showFormButton.textContent = 'Add New Book';
        }
    });

    addBookButton.addEventListener('click', (e) => {
        e.preventDefault();

        const formError = document.getElementById('formError');
        //checks if form is valid
        if (!bookForm.checkValidity()) {
            formError.hidden = false;
            return;
        } else {
            formError.hidden = true;
        }

        //retrieves form values
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const read = document.getElementById('read').checked;

        //adds book to library and updates the display
        addBookToLibrary(title, author, pages, read);
        displayBooks();

        //resets form field and hide from
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('pages').value = '';
        document.getElementById('read').checked = false;

        //hide form after submission
        bookForm.classList.remove('visible');
        showFormButton.textContent = 'Add New Book';
    });
    displayBooks();
});