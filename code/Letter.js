let Letter = function (value) {

  this.value = value;
  this.guessed = false;
  //display the letter if its guessed, a underscore if not guessed and avoid spaces as underscored :) 
  this.showChar = function () {
    if (this.value === " ") {
      return " ";
    } else if (!this.guessed) {
      return "_";
    } else {
      return this.value;
    }
  };
  //this will change the guessed to true so it will display the letter
  this.check = function (newGuess) {
    if (this.value.toUpperCase() === newGuess.toUpperCase()) {
      this.guessed = true;
    }
  };
};


module.exports = Letter;
