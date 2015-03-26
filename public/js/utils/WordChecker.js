// Word Checker
// Validates whether a word is really a word.
//

var words = [];

$.get('http://joshwcomeau.github.io/word_dojo/public/words.txt').done(function(text) {
  words = text.split(",");
});

var WordChecker = {
  validateWord: function(word) {
    return words.indexOf(word.toLowerCase()) !== -1;
  }
};




module.exports = WordChecker;

