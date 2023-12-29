/* Initialize global variables for Wordle
-------------------------------------------------- */
let numOfGuesses = 0;
let playerGuess = [];
let playerGuessedWords = [[]];
let tilesAvailable = 1;
let gameOver = false;

/* Initializing an array that contains all the choices the game can pick
------------------------------------------------------------------------- */
// import {wordleWords} from './words.js';

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

/* Computer randomly chooses the word the player has to guess
------------------------------------------------------------- */
// const wordleWordChoice = wordleWords[Math.floor(Math.random() * (wordleWords.length-1))];

const computerChoice = 'VENUS';
/*--------------------------------------------------------------------*/
function tileGuessColor (key, i) {
    const correctLetter = computerChoice.includes(key);
    console.log(correctLetter);

    if (correctLetter !== true) {
        return 'red';
    }

    const characterPosition = computerChoice.charAt(i);
    const isCorrectPosition = key === characterPosition;

    if (isCorrectPosition === true) {
        return 'green';
    }
    
    return 'orange';
};
/*--------------------------------------------------------------------*/
function currentWordGuess () {
    const numWordsGuessed = playerGuessedWords.length;
    return playerGuessedWords[numWordsGuessed-1];
}

/*--------------------------------------------------------------------*/
function updateGameTiles(buttonLetter) {
    let currentWord = currentWordGuess();
    if (currentWord && currentWord.length < 5) {
        currentWord.push(buttonLetter);

        const tilesAvailableEl = document.getElementById(String(tilesAvailable));
        tilesAvailable++;

        tilesAvailableEl.textContent = buttonLetter;
    }
}

/*----------------------------------------------------------------------*/
function submitPlayerGuess(char) {
    let currentWord = currentWordGuess();

    if (currentWord.length !== 5) {
        window.alert("Word must be 5 letters");
    }
 
    const convertedCurrentWord = currentWord.join("");

    const firstWordLetter = numOfGuesses * 5 + 1;

    currentWord.forEach((char,i) => {

        const tileColor = tileGuessColor(char, i);

        const tileID = firstWordLetter + i;
        const tileEl = document.getElementById(tileID);
        tileEl.style = `background-color: ${tileColor}`;
    });

    if (convertedCurrentWord === computerChoice) {
        window.alert("You guessed correctly. Congratulations!");
    }

    if (playerGuessedWords.length === 6) {
        window.alert("Game Over");
    }

    playerGuessedWords.push([]);
};

/* Assigning the contents to the 'startbtn' id to startGame, and then adding an event listener that will make the button disapear and will add the game tiles and keyboard to the screen
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const startGame = document.getElementById('startbtn');

startGame.addEventListener('click', () => {
    startGame.style.display = 'none';
    createGameWindow();
});

/* Assign each button under the "keyboard-keys" class a click event that will put it's assigned character into the appropriate game tile on the board
---------------------------------------------------------------------------------------------------------------------------------------------------------*/
let computerKeys = document.getElementById('keyboard-keys');
computerKeys.addEventListener('click', handleClick);

function handleClick(e) {
    if (e.target.tagName !== 'BUTTON') {
        return
    } else if (e.target.id === 'enter') {
        submitPlayerGuess();
        numOfGuesses++;
        return;
    } else if (e.target.id === 'delete') {
        removeLetter();
        return;
    }

    updateGameTiles(e.target.innerText);
};





/* Game begins.
--------------------------------------------------------------------------*/

// 1.a The program will make sure that the user is unable to add additional characters after entering five of them, unless they delete a character(s) they entered

// 2.a The game checks to see if the word the user entered matches what the computer chose. If true, set gameOver to true, turn all tiles on that row green, and display a message that you won.

// 2.b Otherwise, subract one from number of guesses
    
// 2.c The game will check to see if any character positions in the user's choice matches the computer's choice. If true, tiles will turn green

// 2.d if not, the game will check to see if any characters in the user's choice appear in the computer's choice. If true, those tiles will turn yellow
