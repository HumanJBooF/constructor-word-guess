
const Word = require("./word.js"); //use this page
const inquirer = require("inquirer"); //NPM inquirer to ask a question
const chalk = require("chalk"); //Color it up ;)
const figlet = require("figlet"); //used to create a welcome screen

//list of words to choose from
const wordBank = [
    'taxi driver',
    'jaws',
    'deadpool',
    'goodfellas',
    'the evil dead',
    'clerks',
    'pulp fiction',
    'fargo',
    'district 9',
    'die hard',
    'a clockwork orange'
];

let select = 0; //make this an int so we can randomize
let wordChosen = ''; //this is used to check is word is solved later on
let wordUsed = '';
let counter = 0; //guess counter

figlet('Welcome!', function (err, data) {
    if (err) {
        console.log(chalk`{bgWhite.red ERROR: ${err}}`);
        return;
    }
    console.log(chalk`{red ${data}}`);
    startGame();
});

//grabs a word from the word bank
const startGame = () => {
    if (wordBank.length < 2) { //if the bank is almost empty re-fill it
        wordBank = [
            'taxi driver',
            'jaws',
            'deadpool',
            'goodfellas',
            'the evil dead',
            'clerks',
            'pulp fiction',
            'fargo',
            'district 9',
            'die hard',
            'a clockwork orange'
        ];
    }
    select = Math.floor(Math.random() * wordBank.length); //random
    wordChosen = wordBank[select]; //use select as a way to get a random word
    wordUsed = new Word(wordChosen); //send to Word constructor
    wordUsed.makeWord();    //use the function on word.js
    if (select > -1) {
        wordBank.slice(select, 1);
    }
    console.log(chalk`\n {bgRed.bold You get 10 guesses to find the movie name} \n`);
    startPrompt();
}

//function to start inquirer
const startPrompt = () => {
    if (counter < 10) {
        console.log(chalk`\n {bgRed.bold ${wordUsed.showWord()}} \n`);
        inquirer.prompt([
            {
                type: 'input',
                name: 'letter',
                message: chalk`{bold.bgBlack.red Pick a letter and press enter:}`
            }
        ]).then(data => {
            checkAnswer(data); //check the letter pressed
        })
    } else { //start a new game if out of guesses
        console.log(chalk`{bgRed.bold Sorry, no more guesses for you!}`);
        console.log(chalk`{bgRed.bold The name of the movie is }`)
        console.log(chalk`{bgWhite.red.bold "${wordChosen}"} \n`);
        wordChosen = '';
        wordUsed = '';
        select = 0;
        counter = 0;
        continuePrompt();
    }
}
//check if user input is correct
const checkAnswer = (data) => {
    //compare the letter to see if correct and check the format
    if ((data.letter.length === 1) && /^[a-zA-Z]+$/.test(data.letter)) {
        let dataCheck = data.letter.toUpperCase();
        let tempCheck = wordUsed.showWord();
        wordUsed.checkGuess(dataCheck);
        if (tempCheck === wordUsed.showWord()) {
            console.log(chalk`\n {red.bold WRONG LETTER!} \n`);
            counter++;
            console.log(chalk`{bgRed.white.bold ${10 - counter} Guesses Remaining}`);
            startPrompt();
        } else { //if right go to check right function
            checkRight();
        }
    } else {
        console.log(chalk`{bgWhite.red.bold One letter at a time, slow it down now}`);
        startPrompt();
    }
}

//if the guessed letter is in the word, display it
const checkRight = () => {
    console.log(chalk`\n {bold.green Correct!!} \n`);
    if (wordChosen.replace(/ /g, "") == (wordUsed.showWord()).replace(/ /g, "")) { //if the word is filled in the game restarts
        console.log(chalk`{bgRed.bold.white Your movie is...}`)
        console.log(chalk`{bgWhite.red.bold "${wordUsed.showWord()}"}`);
        console.log(chalk`{bgRed.white.bold YOU WIN!} \n`);
        wordUsed = '';
        wordChosen = '';
        select = 0;
        counter = 0;
        continuePrompt();
    } else {
        startPrompt();
    }
}
//on win or lose ask if you would like to play again
const continuePrompt = () => {
    inquirer.prompt([
        {
            name: 'continue',
            type: 'list',
            message: chalk`{bgRed.bold Would you like to play again}`,
            choices: ['Yes', 'No']
        }
    ]).then(data => {
        if (data.continue === 'Yes') {
            startGame();
        } else {
            console.log(chalk`{bgRed.bold GOODBYE!}`);
        }
    });
}
