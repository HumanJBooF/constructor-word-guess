const chalk = require('chalk');
let input = process.argv[2]

let Letter = function (value) {

  this.value = value,
    this.guessed = false,

    this.showChar = function () {
      console.log(chalk`{red.bgWhite ${this.guessed}}`);
      return this.guessed ? this.value : '_';
    };

  this.check = function (newGuess) {
    if (this.value.toLowercase() === newGuess.toLowercase()) {
      this.guessed = true;
    }
  };
};

let newLetter = new Letter(input)

console.log(newLetter.toString())





module.exports = Letter;
