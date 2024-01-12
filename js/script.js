// seleziono li elementi HTML
const formPlay = document.querySelector("form");
const selectDifficulty = document.querySelector("select");
const buttonPlay = document.querySelector("button");
const grid = document.getElementById("grid");
const scoreSpan = document.getElementById("your-score");

// * svolgimento
// creo event listener
formPlay.addEventListener("submit", function(event) {
    // ! blocco riavvio pagina
    event.preventDefault();

    // # preparazione
    // cambio la scritta nel bottone
    buttonPlay.innerText = "Play Again!";

    // svuoto la griglia
    grid.innerText = "";

    //rimuovo vecchie classi
    grid.classList.remove("hard", "medium", "easy");

    // dichiaro variabile punteggio e la resetto
    let score = 0;
    scoreSpan.innerText = score;

    // individuare quantità celle per riga, colonna e totali
    let cellsCol;
    let cellsRow;
    let bombNumber;

    switch (selectDifficulty.value) {
        case "easy":
            cellsCol = 3;
            cellsRow = 3;
            bombNumber = 3;
            break
        case "medium":
            cellsCol = 9;
            cellsRow = 9;
            bombNumber = 17;
            break
        case "hard":
            cellsCol = 7;
            cellsRow = 7;
            bombNumber = 20;
    }

    // calcolo le celle totali che compongono la griglia
    const cellsTotal = cellsCol * cellsRow;

    // calcolo il punteggio massimo
    const maxScore = cellsTotal - bombNumber;

    // inserisco classe alla griglia per formattare le celle
    grid.classList.add(selectDifficulty.value);

    // dichiaro variaible per fine partita
    let isGameOver = false;
    let message;

    // # creo bombe e celle
    // creo le bombe
    const bombs = [];

    while (bombs.length < bombNumber){
        const newBomb = Math.floor(Math.random() * cellsTotal) + 1
        if (!bombs.includes(newBomb)) {
            bombs.push(newBomb);
        }
    };
    console.log(bombs);

    // creo le celle
    for (let i = 1; i <= cellsTotal; i++) {
        const newCell = document.createElement("div");
        newCell.innerText = i;
        newCell.classList.add("cell");
        grid.appendChild(newCell);
        
    // far sì che al click si colorino e stampino in console il numero della cella
        newCell.addEventListener("click", function() {
            if (newCell.classList.contains("clicked")) return;
        newCell.classList.add("clicked");
        console.log(newCell.innerText);

    // capire se contiene bombe
        const hasHitBomb = bombs.includes(parseInt(newCell.innerText));

            // rivelo bomba e perdo la partita
            if (hasHitBomb) {
            console.log();
            newCell.classList.add("bomb");
            isGameOver = true;

            // altrimenti aumentare punteggio
            } else {
            scoreSpan.innerText = ++score;

            // controllo se il giocatore ha vinto
                if (scoreSpan.innerText == maxScore) {
                    isGameOver = true;
                }

            }

            // messaggio di fine partita
            if (isGameOver) {
                if (hasHitBomb) {
                    message = "Bomba pestata! Hai perso :( Conferma per giocare ancora!"
                } else if (scoreSpan.innerText == maxScore){
                    message = "Wow, complimenti! Hai vinto :) Conferma per giocare ancora!";
                }

            // resetto la condizione di game over
            isGameOver = false;

            // // chiedere se vuole giocare di nuovo
            // const playAgain = confirm(message);
            // if (playAgain) formPlay.submit();
        }
        })}});