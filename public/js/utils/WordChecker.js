// Word Checker
// Validates whether a word is really a word.
//

var words = [];

$.get('http://josh-lab.com/word_dojo/words.txt').done(function(text) {
  words = text.split(",");
});

var WordChecker = {
  validateWord: function(word) {
    return words.indexOf(word.toLowerCase()) !== -1;
  }
};




module.exports = WordChecker;

