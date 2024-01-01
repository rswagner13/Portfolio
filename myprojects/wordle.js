 /* Initialize global variables for Wordle
-------------------------------------------------- */
let numOfGuesses = 0;
let playerGuessedWords = [[]];
let tilesAvailable = 1;

/* Importing the list of possible words for the computer to choose from
------------------------------------------------------------------------- */
import {wordleWords} from './words.js';


/*---------------------------------------------FUNCTIONS-------------------------------------------------------------*/


/* Generates the word the player must guess
------------------------------------------------------------*/
function generateWordleWord () {
    const randomWord = wordleWords[Math.floor(Math.random() * (wordleWords.length-1))];
    return makeWordUppercase(randomWord);
}

/* Makes the word that the computer randomly chose uppercase 
--------------------------------------------------------------------*/
function makeWordUppercase(wordChoice) {
    return wordChoice.toUpperCase();
}

/* Draws wordle board onto the screen after the player presses the start button
--------------------------------------------------- */
function createGameWindow () {
    gameStartMessage();

    const wordleGameBoard = document.getElementById('wordle-game-board');
    wordleGameBoard.style = 'border: 10px solid black';
    
    for (let i = 1; i <= 30; i++) {
        let tileSquare = document.createElement('div');
        tileSquare.classList.add('wordle-char-tiles');
        tileSquare.setAttribute('id', i);

        wordleGameBoard.appendChild(tileSquare);
    }

    const addKeyboard = document.getElementById('keyboard');
    addKeyboard.style.display = 'flex';
}

/* Displays a modal with a good luck message for the player
--------------------------------------------------- */
function gameStartMessage() {
    const wordleModalStart = document.getElementById('modal');
    wordleModalStart.style.display = 'flex';

    const modalTextBox = document.getElementById('modal-info');
    const startMessage = document.createElement('h1');
    startMessage.classList.add('modal-text');
    modalTextBox.appendChild(startMessage);
    startMessage.innerText = "Good Luck!"

    setTimeout(() => {
        modalTextBox.removeChild(startMessage);
        wordleModalStart.style.display = 'none';
    }, 2000);
        
}

/* Assign each button under the "keyboard-keys" class a click event that will put it's assigned character into the appropriate game tile on the board
------------------------------------------------------------------------------------------------------------------*/
function handleClick(buttonClick) {
    if (buttonClick.target.tagName !== 'BUTTON') {
        return;
    } else if (buttonClick.target.id === 'enter') {
        submitPlayerGuess();
        return;
    } else if (buttonClick.target.id === 'delete') {
        removeLetter();
        return;
    }
    updateGameTile(buttonClick.target.innerText);
}

/* When the player clicks on the enter button
----------------------------------------------------------------------*/
function submitPlayerGuess() {
    const currentGuessArray = currentWordGuess();

    if (currentGuessArray.length !== 5) {
        const modalBox = document.getElementById('modal');
        const modalTextBox = document.getElementById('modal-info');
        const errorMessage = document.createElement('h1');

        errorMessage.classList.add('modal-text');
        modalTextBox.appendChild(errorMessage)
        modalBox.style.display = 'flex';
        errorMessage.innerText = 'Error: Word must be 5 characters long.';

        setTimeout(() => {
            modalTextBox.removeChild(errorMessage);
            modalBox.style.display = 'none';
        }, 2000);

    } else {
        const currentWordString = currentGuessArray.join('');

        const firstWordLetter = numOfGuesses * 5 + 1;
    
        currentGuessArray.forEach((charKey, i) => {
            const tileColor = tileGuessColor(charKey, i);
    
            const tileID = firstWordLetter + i;
            const tileEl = document.getElementById(tileID);
            tileEl.style = `background-color: ${tileColor}`;
        });
    
        if (currentWordString === computerWordChoice) {
            gameCompleted();
        }
    
        if (playerGuessedWords.length === 6) {
            gameOverMessage();
        }
    
        playerGuessedWords.push([]);
        numOfGuesses++;
    }
}

/* Deletes any letters in the previous cell when the delete button is pressed
--------------------------------------------------------------------*/
function removeLetter() {
    const currentGuessArray = currentWordGuess();
    const removedLetter = currentGuessArray.pop();

    playerGuessedWords[playerGuessedWords.length - 1] = currentGuessArray;

    const removedLetterEl = document.getElementById(String(tilesAvailable - 1))

    removedLetterEl.innerText = '';
    tilesAvailable--;
}

/*
--------------------------------------------------------------------*/
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
    
    return 'yellow';
}

/* Checks to see the current guess the player is on
--------------------------------------------------------------------------*/
function currentWordGuess () {
    const numWordsGuessed = playerGuessedWords.length;
    return playerGuessedWords[numWordsGuessed-1];
}

/* Places the letter represented by the button pressed, and puts it into the next available game tile, if there are any spaces remaining
-----------------------------------------------------------------------------------------------------------------*/
function updateGameTile(buttonLetter) {
    const currentWord = currentWordGuess();
    if (currentWord && currentWord.length < 5) {
        currentWord.push(buttonLetter);

        const tilesAvailableEl = document.getElementById(String(tilesAvailable));
        tilesAvailable++;

        tilesAvailableEl.textContent = buttonLetter;
    }
}

/* Prints a message when the player correctly guesses the word the computer randomly picked
----------------------------------------------------------------------------------------------*/
function gameCompleted () {
    const modalBox = document.getElementById('modal');
    const modalTextBox = document.getElementById('modal-info');
    const winnerMessage = document.createElement('h1');

    modalBox.style.display = 'flex';
    winnerMessage.classList.add('modal-text');
    modalTextBox.appendChild(winnerMessage);

    if ((numOfGuesses + 1) === 1) {
        winnerMessage.innerText = `Holy cow! You guessed the correct word in one guess! Nice job!`;
        setTimeout(() => {
            modalTextBox.removeChild(winnerMessage);
            modalBox.style.display = 'none';
            document.getElementById('game-container').innerHTML = '';
            document.getElementById('keyboard').innerHTML = '';
            startGame.style.display = 'block';
        }, 4000);

    } else {
        winnerMessage.innerText = `Congratulations, you guessed the correct word in ${numOfGuesses + 1} guesses!`;
    
        setTimeout(() => {
            modalTextBox.removeChild(winnerMessage);
            modalBox.style.display = 'none';
            document.getElementById('game-container').innerHTML = '';
            document.getElementById('keyboard').innerHTML = '';
            startGame.style.display = 'block';
        }, 4000);
    }
}

/* Prints out a message when the player is unable to correctly guess the word the computer randomly picked
--------------------------------------------------------------------------------------------------------------*/
function gameOverMessage() {
    const modalBox = document.getElementById('modal');
    const modalTextBox = document.getElementById('modal-info');
    const loserMessage = document.createElement('h1');

    modalBox.style.display = 'flex';
    loserMessage.classList.add('modal-text');
    modalTextBox.appendChild(loserMessage);

    loserMessage.innerText = `Awe too bad, you didn't guess the word. The word was ${computerWordChoice}. Thanks for playing!`;

    setTimeout(() => {
        modalTextBox.removeChild(loserMessage);
        modalBox.style.display = 'none';
        document.getElementById('game-container').innerHTML = '';
        document.getElementById('keyboard').innerHTML = '';
        startGame.style.display = 'block';
    }, 4000);
}


/*-----------------------------------------------------GAMEPLAY-----------------------------------------------------*/


/* Computer will get a random word from the words.js file
--------------------------------------------------------------------*/
const computerWordChoice = generateWordleWord();
console.log(computerWordChoice);

/* Game begins when the user clicks on the start button
-----------------------------------------------------------------------*/
const startGame = document.getElementById('startbtn');

startGame.addEventListener('click', () => {
    startGame.style.display = 'none';
    createGameWindow();
});

/* Adds event listeners to each keyboard button drawn onto the screen
--------------------------------------------------------------------------*/
let computerKeys = document.getElementById('keyboard-keys');
computerKeys.addEventListener('click', handleClick);