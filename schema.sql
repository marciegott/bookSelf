-- Cria a tabela livros se ela não existir
CREATE TABLE livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    autor TEXT,
    paginas INTEGER,
    lido INTEGER DEFAULT 0
);

INSERT INTO livros (titulo, autor, paginas, lido)
VALUES ('Funny Story', "Emily Henry", 330, 1);