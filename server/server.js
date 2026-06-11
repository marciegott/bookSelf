import express from "express";
import Database from "better-sqlite3"; //importando o driver? 

// Conectando no arquivo estante.db (ele será criado se não existir)
const db = new Database('bookshelf.db'); 
const app = express();
const PORT = 3000;

app.use(express.json());

//rota principal: localhost
app.get("/", (req, res) => {
    res.send("Servidor da Minha Estante Virtual funcionando! 📚");
});

//select all books
app.get('/books', (req, res) => {
    const books = db.prepare('SELECT * FROM books').all();
    res.json(books);
});

//selecting book by id
app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    const book = db.prepare('SELECT * FROM books WHERE id = ?').get(id);

    if(!book) {
        return res.status(404).json({message: "Hmm, it looks like this book isn't on your shelf yet"});
    }

    res.json(book);
});

//creating new book
app.post('/books', (req, res)=> {
    const {title, author, pages, read, genre} = req.body;

    if (!title || !author)
    {
        return res.status(400).json({error: "Title and author are required to add a new book"});
    }

    const info = db.prepare('INSERT INTO books (title, author, pages, read, genre) VALUES (?, ?, ?, ?, ?)')
        .run(title, author, pages || null, read ? 1 : 0 , genre || null);
        
        res.status(201).json({
            id: info.lastInsertRowid, 
            mensagem: "Book created!"
        }); 
});

//updating a book

app.patch("/books/:id", (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    //turning the boolean read/unread into integer 
    if (updates.read !== undefined) {
        updates.read = updates.read ? 1 : 0;
    }

    //Preparing the data
    const allowedFields = ['title', 'author', 'pages', 'read', 'genre'];
    const fields = Object.keys(updates).filter(field => allowedFields.includes(field));
    const values = fields.map(field => updates[field]);

//Creating the SQL for what needs to change
    const queryFields = fields.map(field => `${field} = ?`).join(", ");
    
    try{
        const info = db.prepare(`UPDATE books SET ${queryFields} WHERE id = ?`).run(...values, id);    
        //o ... separa o array como argumentos separados

        if (info.changes === 0) {
            return res.status(404).json({ 
                error: "Book not found",
                message: "We couldn't find a book with this ID to update." 
            });
        }

        res.status(200).json({ message: "Book updated successfully!" });
    }
    
    catch (error) {
    res.status(500).json({ error: "Failed to update the book"});    }
});

//delete books by ID
app.delete("/books/:id", (req, res) =>{
    const id = req.params.id;
    
    try{
    const info = db.prepare('DELETE FROM books WHERE id = ?').run(id);
    
    if (info.changes === 0) {
            return res.status(404).json({ error: "Book not found" });
        }
    res.status(204).send();
    } catch (error) {
        res.status(500).json({error: "Failed to delete the book"});
    }
});

/*

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
//update book infos
app.patch("/books/:id", (req, res) => {
    const index = getBookIndexById(req.params.id);
    if (index === -1){
        return res.status(404).json({error:"Book not found"});
    }
    books[index]= {...books[index], ...req.body};
    res.json(books[index]);
});

*/

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});