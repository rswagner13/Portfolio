 /* Initialize global variables for Wordle
-------------------------------------------------- */
let numOfGuesses = 0;
let playerGuessedWords = [[]];
let tilesAvailable = 1;

/* Initializing an array that contains all the choices the game can pick
------------------------------------------------------------------------- */
import {wordleWords} from './words.js';

/* Computer randomly chooses the word the player has to guess
------------------------------------------------------------- */
const randomWord = wordleWords[Math.floor(Math.random() * (wordleWords.length-1))];
const computerWordChoice = makeWordUppercase(randomWord);

console.log(computerWordChoice);

/* Draw wordle board onto screen when the player presses the 
Start Game button
--------------------------------------------------- */
function createGameWindow () {
    const wordleGameBoard = document.getElementById("wordle-game-board");
    
    for (let i = 1; i <= 30; i++) {
        let tileSquare = document.createElement("div");
        tileSquare.classList.add("wordle-char-tiles");
        tileSquare.setAttribute("id", i);

        wordleGameBoard.appendChild(tileSquare);
    }

    const addKeyboard = document.getElementById('keyboard');
    addKeyboard.style.display = 'flex';
}

/* Assign each button under the "keyboard-keys" class a click event that will put it's assigned character into the appropriate game tile on the board
---------------------------------------------------------------------------------------------------------------------------------------------------------*/

function handleClick(buttonClick) {
    if (buttonClick.target.tagName !== 'BUTTON') {
        return;
    } else if (buttonClick.target.id === 'enter') {
        submitPlayerGuess();
        numOfGuesses++;
        return;
    } else if (buttonClick.target.id === 'delete') {
        removeLetter();
        return;
    }
    updateGameTile(buttonClick.target.innerText);
}

/*----------------------------------------------------------------------*/
function submitPlayerGuess() {
    const currentGuessArray = currentWordGuess();

    if (currentGuessArray.length !== 5) {
        window.alert("Word must be 5 letters");
    }

    const currentWordString = currentGuessArray.join("");

    const firstWordLetter = numOfGuesses * 5 + 1;

    currentGuessArray.forEach((charKey, i) => {
        const tileColor = tileGuessColor(charKey, i);

        const tileID = firstWordLetter + i;
        const tileEl = document.getElementById(tileID);
        console.log(tileEl);
        tileEl.style = `background-color: ${tileColor}`;
    });

    if (currentWordString === computerWordChoice) {
        gameCompleted();
    }

    if (playerGuessedWords.length === 6) {
        window.alert("Game Over");
    }

    playerGuessedWords.push([]);
}

/*--------------------------------------------------------------------*/
function removeLetter() {
    const currentGuessArray = currentWordGuess();
    const removedLetter = currentGuessArray.pop();

    playerGuessedWords[playerGuessedWords.length - 1] = currentGuessArray;

    const removedLetterEl = document.getElementById(String(tilesAvailable - 1))

    removedLetterEl.innerText = '';
    tilesAvailable--;
}
/*--------------------------------------------------------------------*/
function tileGuessColor (key, i) {
    const correctLetter = computerWordChoice.includes(key);
    if (correctLetter !== true) {
        const incorrectLetterEl = document.getElementById(key);
        incorrectLetterEl.style.backgroundColor = 'gray';
        return 'red';
    }

    const characterPosition = computerWordChoice.charAt(i);
    const isCorrectPosition = key === characterPosition;

    if (isCorrectPosition === true) {
        return 'green';
    }
    
    return 'orange';
}
/*--------------------------------------------------------------------*/
function currentWordGuess () {
    const numWordsGuessed = playerGuessedWords.length;
    return playerGuessedWords[numWordsGuessed-1];

}

/*--------------------------------------------------------------------*/
function updateGameTile(buttonLetter) {
    let currentWord = currentWordGuess();
    if (currentWord && currentWord.length < 5) {
        currentWord.push(buttonLetter);

        const tilesAvailableEl = document.getElementById(String(tilesAvailable));
        tilesAvailable++;

        tilesAvailableEl.textContent = buttonLetter;
    }
}

/* Makes the word that the computer randomly chose uppercase 
--------------------------------------------------------------------*/
function makeWordUppercase(wordChoice) {
    return wordChoice.toUpperCase();
}

/* Game begins when the user clicks on the start button
----------------------------------------------------------------------------------------------*/
const startGame = document.getElementById('startbtn');

startGame.addEventListener('click', () => {
    startGame.style.display = 'none';
    createGameWindow();
});

/*--------------------------------------------------------------------*/
function gameCompleted () {
    if (i > d) {

    }
    document.getElementById('wordle-game-board').innerHTML = '';
}


let computerKeys = document.getElementById('keyboard-keys');
computerKeys.addEventListener('click', handleClick);


// 1.a The program will make sure that the user is unable to add additional characters after entering five of them, unless they delete a character(s) they entered

// 2.a The game checks to see if the word the user entered matches what the computer chose. If true, set gameOver to true, turn all tiles on that row green, and display a message that you won.

// 2.b Otherwise, subract one from number of guesses
    
// 2.c The game will check to see if any character positions in the user's choice matches the computer's choice. If true, tiles will turn green

// 2.d if not, the game will check to see if any characters in the user's choice appear in the computer's choice. If true, those tiles will turn yellow
