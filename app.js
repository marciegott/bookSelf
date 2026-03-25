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
        const bookPages = document.querySelector("#book-pages").value;
        const bookStatus = document.querySelector("input[name='status']:checked").value;
        const bookReview = document.querySelector("#book-review").value;
        const bookQuotes = document.querySelector("#book-quotes").value;

        const book = {
            cover: bookCover.name,
            title: bookTitle,
            genre: bookGenre,
            author: bookAuthor,
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



function init() {
    addNewBook();
}

init();