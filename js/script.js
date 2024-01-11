// recupero gli elementi HTML
const grid = document.getElementById("grid");
const playButton = document.querySelector("button");
const form = document.querySelector("form");

// dichiaro le variabili relative alla quantità di celle da inserire
let cellsRow;
let cellsColumn;
let cellsTotal;

// event listener al click del pulsante play
form.addEventListener("submit", function(event) {
    // ! impedisco che si ricarichi la pagina
    event.preventDefault();
    
    // cambio il testo del bottone
    playButton.innerText = "Re-Start!";

    // cestino vecchia griglia in caso ci sia
    grid.innerText = "";

    // prendo il valore della select
    const selectValue = document.querySelector("select").value;
    console.log(selectValue);

    // determino il valore della select
    switch (selectValue) {
        case "big":
            cellsRow = 10;
            cellsColumn = cellsRow;
            break;
        case "medium":
            cellsRow = 9;
            cellsColumn = cellsRow;
            break;
        case "small":
            cellsRow = 7;
            cellsColumn = cellsRow;
    }

    // calcolo quantità di celle da inserire
    cellsTotal = cellsRow * cellsColumn;

// Genero le celle
for (let i = 1; i <= cellsTotal; i++) {
    const newCell = document.createElement("div");
    // aggiungo classe a seconda delle dimensioni
    switch (selectValue) {
        case "big":
            newCell.classList.add("cell-big");
            break;
        case "medium":
            newCell.classList.add("cell-medium");
            break;
        case "small":
            newCell.classList.add("cell-small");
    }
    // inserisco il numero
    newCell.innerText = i;
    // stampo in pagina
    grid.appendChild(newCell);

    // aggiungo event listener per il click colorando di azzurro con stampa in console
    newCell.addEventListener("click", function(){        
        newCell.classList.toggle("clicked");
        console.log(i);
    });
}
});