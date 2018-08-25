let Letter = function(value) {
  (this.value = value),
    (this.guessed = false),
    (this.toString = function() {
      return this.guessed ? this.value : '_';
    });

  this.tryGuess = function(newGuess) {
    if (this.value.toLowercase() === newGuess.toLowercase()) {
      this.guessed = true;
    }
  };
};

module.exports = Letter;
