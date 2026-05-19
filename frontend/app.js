//saving books in the localStorage

function addNewBook() {
    const form = document.querySelector("#book-form");
    if (!form) {
        return;
    }
    const savedBooks = localStorage.getItem("books");
    let bookshelf = savedBooks ? JSON.parse(savedBooks) : [];

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const bookCover = document.querySelector("#book-cover").files[0];
        const bookTitle = document.querySelector("#book-title").value;
        const bookGenre = document.querySelector("#book-genre").value;
        const bookAuthor = document.querySelector("#book-author").value;
        const bookPublisher = document.querySelector("#book-publisher").value;
        const bookPages = document.querySelector("#book-pages").value;
        const bookStatus = document.querySelector("input[name='status']:checked").value;
        const bookReview = document.querySelector("#book-review").value;
        const bookQuotes = document.querySelector("#book-quotes").value;

        const book = {
            cover: bookCover.name,
            title: bookTitle,
            genre: bookGenre,
            author: bookAuthor,
            publisher: bookPublisher,
            pages: bookPages,
            status: bookStatus,
            review: bookReview,
            quotes: bookQuotes
        };

        bookshelf.push(book);
        const bookInText = JSON.stringify(bookshelf);
        localStorage.setItem("books", bookInText);
        form.reset();
    });
}

//rendering the bookshelf 

function renderBooks() {
    const books = localStorage.getItem("books");
    const booksArray = JSON.parse(books);
    const bookshelf = document.querySelector(".bookshelf");

    if (booksArray === null || booksArray.length === 0) {
        bookshelf.innerHTML = `<article><p>Your bookSELF is still empty. <a href="add-new-book.html">Add your first book</a> and make this space your own.</p></article>`
        return;
    }
    bookshelf.innerHTML = "";

    booksArray.forEach(book => {

        bookshelf.innerHTML += `
    <article>
    <figure>
    <a href="#">
    <img class="book-cover" src="./img/${book.cover}" alt="book cover of ${book.title}">
    </a>
    </figure>
    <h3>${book.title}</h3>
    <p>${book.author}</p>
    <span class="book-details">${book.publisher}, ${book.pages} p.</span>
    <span class="stars"></span>
    <a href="#">${book.genre}</a>
    <a href="#">Edit</a>
    <a href="#">Book details</a>
    </article>`
    });
}




function init() {
    addNewBook();
    renderBooks();
}

init();