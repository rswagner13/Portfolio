/* Initialize global variables for Wordle
------------------------------------------------- */
const numOfGuesses = 6;
let playerGuess = [];
let playerGuessNumber = 1;
let gameOver = false;

/* Initializing an array that contains all the choices the game can pick
--------------------------------------------------------------------------- */
let wordleWords = ['index', 'fight', 'ditch', 'pitch', 'pinto', 'tower', 'match', 'range'];


/* Draw word board onto screen
------------------------------------ */
/* Randomly generating the word the player has to guess
------------------------------------------------------------- */
let wordleGuess = wordleWords[Math.floor(Math.random() * (wordleWords.length))];

/* While loop that will run until the number of guesses remain are zero, or the player guesses the word correctly
-------------------------------------------------------------------------*/
