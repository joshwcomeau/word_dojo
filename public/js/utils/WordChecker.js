// Word Checker
// Validates whether a word is really a word.
//

var ScoreCalculator  = require('./ScoreCalculator');
var wordChecker, words = {};

// Returns an object with the key being the number of letters, the value being an array of
// words with that many letters.
// eg. {
//   3: ['egg', 'aye', 'hey'...],
//   4: ['hero', 'boom', 'fuck'...] 
// }
function buildWordObj(path) {
  var word, wordLength, wordArray;

  // Start by fetching the data and splitting it into an array
  $.get(path).done(function(text) {
    wordArray = text.split(",");

    wordArray.forEach(function(word) {
      wordLength = word.length;

      // If there already is a key of that length
      if ( words[wordLength] ) {
        words[wordLength].push(word);
      }
      // This is the first word of this length
      else {
        words[wordLength] = [word];
      }
    });
  });
}

function hasSpecialTiles(wordArray) {
  return _.some(wordArray, function(word) {
    return word.special;
  });
}

buildWordObj('words.txt');

WordChecker = {
  validateWord: function(wordArray, word) {
    var wordLength;

    if ( hasSpecialTiles(wordArray) ) {
      wordLength = wordArray.length;

      // Iterate through each letter in the word. If the letter is a wildcard, recursively 
      // call this method with each letter that fits the spot. This way, it'll get directed 
      // to the lower branch below, where it gets treated as a regular word.
      var sortedLetterValues = ScoreCalculator.getWordsSortedByPoints();

      console.log(sortedLetterValues);
    }
    else {
      return words[wordArray.length].indexOf(word.toLowerCase()) !== -1;
    }
    
  }
};




module.exports = WordChecker;

