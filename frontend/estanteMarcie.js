/*

Criar um programa em linha de comando usando JavaScript que:

- percorre toda a estante (array 4×4)
- soma o total de livros
- soma o total de lidos
- calcula quantos não foram lidos
- retorna uma única string formatada com essas informações 

## **Entrada de dados**

A estante é uma estrutura numérica que representa o contêiner organizado em 16 nichos (4 linhas × 4 colunas).

Cada nicho tem um array [x, y], onde:

- x → total de livros naquele nicho
- y → desses, quantos já foram lidos

*/


const container = [
    [
        [17, 0], [8, 6], [24, 12], [10, 3]
    ],
    [
        [20, 7], [15, 11], [22, 8], [17, 9]
    ],
    [
        [16, 12], [15, 8], [12, 4], [4, 1]
    ]
];

function minhaEstante(arr) {
    let totalLivros = 0;
    let lidos = 0;

    for (let i = 0; i < (arr.length); i++) {
        for (let j = 0; j < arr[i].length; j++) {
            totalLivros = totalLivros + arr[i][j][0];
            lidos = lidos + arr[i][j][1];
        }
    }

    const naoLidos = totalLivros - lidos;
    return `Total de livros: ${totalLivros}
    Livros lidos: ${lidos}
    Livros não lidos: ${naoLidos}`;
}

console.log(minhaEstante(container));