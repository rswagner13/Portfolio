 /* Initialize global variables for Wordle
-------------------------------------------------- */
let numOfGuesses = 0;
let playerGuessedWords = [[]];
let tilesAvailable = 1;
let computerWordChoice = '';

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
---------------------------------------------------------------------- */
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

/* When the player clicks on the enter button, multiple checks occur to see what the game should do
------------------------------------------------------------------------------------------------------*/
function submitPlayerGuess() {
    const currentGuessArray = currentWordGuess();

    // Conditional check to see if the player entered enough characters to make a word
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
        let wordFromList = false;
        // Compares the player's word to the list of words from the words.js file. 
        for(let i = 0; i < wordleWords.length; i++) {
            if (currentWordString.toLowerCase() === wordleWords[i]) {
                wordFromList = true;
            }
        }
        if (wordFromList !== true) {
            const modalBox = document.getElementById('modal');
            const modalTextBox = document.getElementById('modal-info');
            const incorrectWordMessage = document.createElement('h1');

            incorrectWordMessage.classList.add('modal-text');
            modalTextBox.appendChild(incorrectWordMessage);
            modalBox.style.display = 'flex';
            incorrectWordMessage.innerText = 'Error: Your word cannot be found on the list of acceptabe words. Please choose a different word';

            setTimeout(() => {
                modalTextBox.removeChild(incorrectWordMessage);
                modalBox.style.display = 'none';
            }, 2000);
        } else {
            // Checking each character of the current guessed word to see if any match or are within the computer's gussed word
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
}

/* Deletes any letters in the previous cell when the delete button is pressed
--------------------------------------------------------------------*/
function removeLetter() {
    const currentGuessArray = currentWordGuess();
    currentGuessArray.pop();

    playerGuessedWords[playerGuessedWords.length - 1] = currentGuessArray;

    const removedLetterEl = document.getElementById(String(tilesAvailable - 1))

    removedLetterEl.innerText = '';
    tilesAvailable--;
}

/* Changes the tile color depending on how close the player is to guessing the computer's word choice
------------------------------------------------------------------------------------------------------*/
function tileGuessColor (key, i) {
    const correctLetter = computerWordChoice.includes(key);
    if (correctLetter !== true) {
        const incorrectLetterEl = document.getElementById(key);
        incorrectLetterEl.style.backgroundColor = 'gray';
        return 'rgb(235, 14, 124)';
    }

    const characterPosition = computerWordChoice.charAt(i);
    const isCorrectPosition = key === characterPosition;

    if (isCorrectPosition === true) {
        return 'rgb(52, 250, 69)';
    }
    
    return 'rgb(250, 229, 75)';
}

/* Checks to see the player's current guess (based on the current array within the playerGuessedWords array)
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
            resetGame();
        }, 4000);

    } else {
        winnerMessage.innerText = `Congratulations, you guessed the correct word in ${numOfGuesses + 1} guesses!`;
    
        setTimeout(() => {
            modalTextBox.removeChild(winnerMessage);
            modalBox.style.display = 'none';
            resetGame();
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
        resetGame();
    }, 4000);
}

/* Resets variables and elements to set the game board to how it was when the player first opened the "Portfolio" tab
--------------------------------------------------------------------------------------------*/
function resetGame() {
    const wordleBoard = document.getElementById('wordle-game-board');
    const keyboardKeys = document.getElementById('keyboard');

    wordleBoard.innerHTML = '';
    wordleBoard.style.border = 'none';
    keyboardKeys.style.display = 'none';
    startGame.style.display = 'block';

    numOfGuesses = 0;
    playerGuessedWords = [[]];
    tilesAvailable = 1;
}

/*-----------------------------------------------------GAMEPLAY-----------------------------------------------------*/


/* Game begins when the user clicks on the start button
-----------------------------------------------------------------------*/
const startGame = document.getElementById('startbtn');

startGame.addEventListener('click', () => {
    computerWordChoice = generateWordleWord();
    console.log(computerWordChoice);
    startGame.style.display = 'none';
    createGameWindow();
});

/* Adds event listeners to each keyboard button drawn onto the screen
--------------------------------------------------------------------------*/
let computerKeys = document.getElementById('keyboard-keys');
computerKeys.addEventListener('click', handleClick);