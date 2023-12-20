/* Initialize global variables for Wordle
-------------------------------------------------- */
const numOfGuesses = 6;
let playerGuess = [];
let playerGuessNumber = 1;
const rows = 6;
const columns = 5;
let gameOver = false;


/* Initializing an array that contains all the choices the game can pick
--------------------------------------------------------------------------- */
let wordleWords = ['index', 'fight', 'ditch', 'pitch', 'pinto', 'tower', 'match', 'range'];

/* Randomly generating the word the player has to guess
------------------------------------------------------------- */
let wordleGuess = wordleWords[Math.floor(Math.random() * (wordleWords.length))];


/* Draw word board onto screen
---------------------------------------- */


/* Ask the user to input their guess. Make sure that the word they pick is not longer or shorter than five characters
--------------------------------------------------------------------------------------------------------------------------*/


/* While loop that will run until the number of guesses remain are zero, or the player guesses the word correctly
-----------------------------------------------------------------------------------------------------------------------*/
