/* Initialize global variables for Wordle
-------------------------------------------------- */
let numOfGuesses = 6;
let playerGuess = [];
let playerGuessNumber = 1;
const rows = 6;
const columns = 5;
let gameOver = false;

/* Initializing an array that contains all the choices the game can pick
------------------------------------------------------------------------- */
let wordleWords = ['index', 'fight', 'ditch', 'pitch', 'pinto', 'tower', 'match', 'range'];

/* Draw wordle board onto screen when the player presses the 
Start Game button
--------------------------------------------------- */
function createGameTiles () {
    const wordleGameBoard = document.getElementById("wordle-game-board");
    
    for (let i = 1; i <= 30; i++) {
        let tileSquare = document.createElement("div");
        tileSquare.classList.add("wordle-char-tiles");
        tileSquare.setAttribute("id", i);

        wordleGameBoard.appendChild(tileSquare);
    }
}

const startGame = document.getElementById('startbtn');

startGame.addEventListener('click', () => {
    startGame.style.display = 'none';
    createGameTiles();
});

/* Computer randomly chooses the word the player has to guess
------------------------------------------------------------- */
let wordleWordChoice = wordleWords[Math.floor(Math.random() * (wordleWords.length-1))];


/* Game begins. A while loop runs until the player picks the word th computer picked, or when the number of guesses remaining are zero
--------------------------------------------------------------------------*/
    // 1. Game ask the user to type in their word choice as long as it contains 5 letter characters. These characters should appear in the tiles on the row associated with the current guess number

    // 2.a The game checks to see if the word the user entered matches what the computer chose. If true, set gameOver to true, turn all tiles on that row green, and display a message that you won.

    // 2.b Otherwise, subract one from number of guesses
    
    // 2.c The game will check to see if any character positions in the user's choice matches the computer's choice. If true, tiles will turn green

    // 2.d if not, the game will check to see if any characters in the user's
