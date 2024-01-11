// seleziono li elementi HTML
const formPlay = document.querySelector("form");
const selectDifficulty = document.querySelector("select");
const buttonPlay = document.querySelector("button");
const grid = document.getElementById("grid");
const scoreSpan = document.getElementById("your-score");

// dichiaro variabili
let score = 0;

// * funzioni
// funzione per creare celle
const createCells = (cellsTotal, score) => {
for (let i = 1; i <= cellsTotal; i++) {
const newCell = document.createElement("div");
newCell.innerText = i;
newCell.classList.add("cell");
grid.appendChild(newCell);

// far si che al click si colorino e stampino in console il numero della cella
newCell.addEventListener("click", function() {
    if (newCell.classList.contains("clicked")) return;
    newCell.classList.add("clicked");
    console.log(newCell.innerText);
    scoreSpan.innerText = ++score;
    });
}};

// funzione per generare bombe
const generateBombs = (totalCells, bombNumber) => {
const bombs = [];
while (bombs.length < bombNumber){
    const newBomb = Math.floor(Math.random() * totalCells) + 1
    if (!bombs.includes(newBomb)) {
        bombs.push(newBomb);
    }
};
console.log(bombs);
}

// * svolgimento
// creo event listener
formPlay.addEventListener("submit", function(event) {
    // ! blocco riavvio pagina
    event.preventDefault();

    // cambio la scritta nel bottone
    buttonPlay.innerText = "Play Again!";

    // svuoto la griglia
    grid.innerText = "";

    //rimuovo vecchie classi
    grid.classList.remove("hard", "medium", "easy");

    // individuare quantità celle per riga, colonna e totali
    // dichiaro variabili
    let cellsCol;
    let cellsRow;

    switch (selectDifficulty.value) {
        case "easy":
            cellsCol = 10;
            cellsRow = 10;
            break
        case "medium":
            cellsCol = 9;
            cellsRow = 9;
            break
        case "hard":
            cellsCol = 7;
            cellsRow = 7;
    }

    // calcolo le celle totali che compongono la griglia
    const cellsTotal = cellsCol * cellsRow;

    // inserisco classe alla griglia per formattare le celle
    grid.classList.add(selectDifficulty.value);

    createCells(cellsTotal, score);
});