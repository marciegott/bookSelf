import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

//rota principal: localhost
app.get("/", (req, res) => {
    res.send("Servidor da Minha Estante Virtual funcionando! 📚");
});

//populando os livros para poder criar as primeiras rotas
let books = [
    { id: 1, title: "Beach Read", author: "Emily Henry", pages: 361, read: false, genre: "romance" },
    { id: 2, title: "People We Meet on Vacation", author: "Emily Henry", pages: 384, read: true, genre: "romance" },
    { id: 3, title: "Book Lovers", author: "Emily Henry", pages: 400, read: false, genre: "romance" },
];
let nextId = 4;

function getBookIndexById(id) {
    const numberId = Number(id);
    return books.findIndex((l)=>(l.id===numberId));
}

// get all the books, filters: read, unread, author and genre
app.get ("/books", (req, res) => {
    
    if (Object.keys(req.query).length === 0) {
        return res.json(books);
    }

    let filteredBooks = books;
    const { read, author, genre} = req.query;

    if(read!= undefined) {
        const isRead = read === "true";
        filteredBooks = filteredBooks.filter((book) => book.read === isRead);
    }

    if(author) {
        filteredBooks = filteredBooks.filter((book) => book.author === author);
    }
    
    if (genre) {
        filteredBooks = filteredBooks.filter((book) => book.genre === genre);
    }

    res.json(filteredBooks);
});

app.get("/books/stats", (req,res) => {
    const totalBooks = books.length;
    const readBooks = books.filter((book) => book.read === true)
    const totalReadBooks = readBooks.length;
    const unreadBooks = totalBooks - totalReadBooks;
    const totalPages = books.reduce((acc, book) => acc + (book.pages || 0), 0);
    const readPages = readBooks.reduce((acc, book) => acc + (book.pages || 0), 0);

    res.json ({
        totalBooks,
        totalReadBooks, 
        unreadBooks,
        totalPages,
        readPages
    })
});


// get the book by the ID, if can't find, return 404
app.get("/books/:id", (req, res)=>{
    const id = Number(req.params.id); //converting the ID from string to Number
    const book = books.find((l)=>l.id===id);
    if (!book){
        return res.status(404).json({error: "Book not found"});
    }
    res.json(book);
});

//post new books, title and author are required - return 400 if it's missing
app.post("/books", (req, res)=> {
    const {title, author, pages, read, genre} = req.body;

    if (!title || !author)
    {
        return res.status(400).json({error: "Title and author are required to add a new book"});
    }

    //creating the new book
    const newBook = {
        id: nextId++,
        title, 
        author, 
        pages: pages || null,
        read: read || false
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

//update book infos
app.patch("/books/:id", (req, res) => {
    const index = getBookIndexById(req.params.id);
    if (index === -1){
        return res.status(404).json({error:"Book not found"});
    }
    books[index]= {...books[index], ...req.body};
    res.json(books[index]);
});

//delete books by ID, return 204 in case of success, 404 if it doesn't find the book
app.delete("/books/:id", (req, res) =>{
    const index = getBookIndexById(req.params.id);
    if (index === -1) {
    return res.status(404).json({error:"Book not found"});
    }
    books.splice(index, 1);
    res.status(204).send();
});

//stats


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});