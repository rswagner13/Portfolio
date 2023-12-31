 /* Initialize global variables for Wordle
-------------------------------------------------- */
let numOfGuesses = 0;
let playerGuessedWords = [[]];
let tilesAvailable = 1;

/* Importing the list of possible words for the computer to choose from
------------------------------------------------------------------------- */
import {wordleWords} from './words.js';


/*---------------------------------------------FUNCTIONS-------------------------------------------------------------*/


/* Makes the word that the computer randomly chose uppercase 
--------------------------------------------------------------------*/
function makeWordUppercase(wordChoice) {
    return wordChoice.toUpperCase();
}

/* Draw wordle board onto screen when the player presses the start button
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

/*----------------------------------------------------------------------*/
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
    
    return 'yellow';
}

/*--------------------------------------------------------------------*/
function currentWordGuess () {
    const numWordsGuessed = playerGuessedWords.length;
    return playerGuessedWords[numWordsGuessed-1];
}

/*--------------------------------------------------------------------*/
function updateGameTile(buttonLetter) {
    const currentWord = currentWordGuess();
    if (currentWord && currentWord.length < 5) {
        currentWord.push(buttonLetter);

        const tilesAvailableEl = document.getElementById(String(tilesAvailable));
        tilesAvailable++;

        tilesAvailableEl.textContent = buttonLetter;
    }
}

/*--------------------------------------------------------------------*/
function gameCompleted () {
    const modalBox = document.getElementById('modal');
    const modalTextBox = document.getElementById('modal-info');
    const winnerMessage = document.createElement('h1');
    const gameChoices = document.createElement('div');
    const replay = document.createElement('div');
    const gameOver = document.createElement('div');

    modalBox.style.display = 'flex';
    winnerMessage.classList.add('modal-text');
    modalTextBox.appendChild(winnerMessage);

    if ((numOfGuesses + 1) === 1) {
        winnerMessage.innerText = `Holy cow! You guessed the correct word in one guess! Would you like to play again?`;

        gameChoices.setAttribute('id','choice-container');
        modalTextBox.append(gameChoices)
        gameChoices.appendChild(replay);
        gameChoices.appendChild(gameOver);

    replay.innerText = 'Play Again';
    gameOver.innerText = 'End Game';
    }

    winnerMessage.innerText = `Congratulations, you guessed the correct word in ${numOfGuesses + 1} guesses! Would you like to play again?`;

    gameChoices.setAttribute('id','choice-container');
    modalTextBox.append(gameChoices)
    gameChoices.appendChild(replay);
    gameChoices.appendChild(gameOver);

    replay.innerText = 'Play Again';
    gameOver.innerText = 'End Game';

    document.getElementById('game-container').innerHTML = '';
    document.getElementById('keyboard').innerHTML = '';
}


/*-----------------------------------------------------GAMEPLAY-----------------------------------------------------*/


/* Computer randomly chooses the word the player has to guess
------------------------------------------------------------------------------------- */
const randomWord = wordleWords[Math.floor(Math.random() * (wordleWords.length-1))];
const computerWordChoice = makeWordUppercase(randomWord);

console.log(computerWordChoice);

/* Game begins when the user clicks on the start button
-----------------------------------------------------------------------*/
const startGame = document.getElementById('startbtn');

startGame.addEventListener('click', () => {
    startGame.style.display = 'none';
    createGameWindow();
});

let computerKeys = document.getElementById('keyboard-keys');
computerKeys.addEventListener('click', handleClick);