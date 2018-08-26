const Letter = require("./Letter.js");

let Word = function (letters) {

    this.letters = letters;
    this.letterArr = [];
    this.makeWord = function () {
        for (i = 0; i < this.letters.length; i++) {
            let newLetter = new Letter(letters[i]);
            this.letterArr.push(newLetter);
        }
    };

    this.showWord = function () {
        let wordDisplay = [];
        for (i = 0; i < this.letterArr.length; i++) {
            wordDisplay.push(this.letterArr[i].showChar());
        }
        return wordDisplay.join(' ');
    };

    this.checkGuess = function (userGuess) {
        for (i = 0; i < this.letterArr.length; i++) {
            this.letterArr[i].check(userGuess)
        }
    };

}

module.exports = Word;
