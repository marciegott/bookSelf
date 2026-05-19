
//adding a event listener to get the user search

const form = document.querySelector("#search-form");
const input = document.querySelector("#book-search")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userSearch = input.value;
    searchApiBooks(userSearch); 
})

//searching the book
async function searchApiBooks(search) {
    const query = search.split(" ").join("+");
    const url = `https://openlibrary.org/search.json?q=title:"${query}" OR author:"${query}"`;

    try {
        const response = await fetch (url);
        if (response.ok)
        {   
            const jsonResponse = await response.json();
            const books = jsonResponse.docs
            .map((b) => ({
                title: b.title,
                author: b.author_name ? b.author_name.join(', ') : 'Unknown Author',
                releasedYear: b.first_publish_year,
                cover_i: b.cover_i
            }))
            .sort((a, b) => a.releasedYear - b.releasedYear);
            displaySearch(books);
        } else {
        throw new Error("Error:");
        }
} 
catch (error) {
        console.log(error);
    }
}

function displaySearch (books){

    const bookshelf = document.querySelector(".search-results");
    bookshelf.innerHTML = "";

    books.forEach(book => { 
        const coverUrl = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : 'https://via.placeholder.com/150x200?text=No+Cover';
    bookshelf.innerHTML += `<article>
    <figure>
        <img class="book-cover" src="${coverUrl}" alt="Cover of ${book.title}">
    </figure>
    <h3>${book.title}</h3>
    <p>${book.author}</p>
    <p>${book.releasedYear}</p>
    </article>`
    })
}
