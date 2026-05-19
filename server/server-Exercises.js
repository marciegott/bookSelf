import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor da Minha Estante Virtual funcionando! 📚");
});

app.get("/status", (req, res) => {
res.json({
    status: "online",
    projeto: "Minha Estante Virtual",
    versao: "1.0.0",
});
});

// criar estante e id
let livros = [];
let proximoId = 1;

// cadastrar novo livro
app.post("/livros", (req, res)=> {
    const {titulo, autora, paginas, lido} = req.body;

    if (!titulo || !autora) {
        return res.status(400).json({error: "Título e autora são obrigatórios"});
    }

    const novoLivro = {
        id: proximoId++,
        titulo, 
        autora,
        paginas: paginas || null,
        lido: lido || false
    };

    livros.push(novoLivro);

    res.status(201).json(novoLivro);
})

//buscar livros
app.get("/livros", (req, res) => {
res.json(livros); 
});

//buscar o livro pelo ID
app.get("/livros/:id", (req, res) => {
    const id = Number(req.params.id);
    const livro = livros.find((l) => l.id === id);

    if(!livro){
        return res.status(400).json({error:"livro não encontrado"});
    }

    res.json(livro);
})

//update pelo id
app.patch("/livros/:id", (req, res) =>{
    const id = Number(req.params.id);
    const indice = livros.findIndex((l)=> l.id===id);

    if (indice === -1) {
        return res.status(404).json({error: "livrinho não encontrado"});
    }

    livros[indice] = {...livros[indice], ...req.body};
    res.json(livros[indice]);
});

//delete pelo id
app.delete("/livros/:id", (req, res) => {
    const id = Number(req.params.id);
    const indice = livros.findIndex((l)=> l.id === id);

    if (indice === -1) {
        return res.status(404).json({error: "livrinho não encontrado"});
    }

    livros.splice(indice, 1);
    res.status(204).send();
})

// 404 - deve ser sempre a última rota
app.use((req, res) => {
    res.status(404).json({ error: "Rota não encontrada" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
