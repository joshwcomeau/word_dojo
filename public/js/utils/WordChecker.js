// Word Checker
// Validates whether a word is really a word.
//

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
  return false;
}

buildWordObj('words.txt');

WordChecker = {
  validateWord: function(wordArray, word) {
    if ( hasSpecialTiles(wordArray) ) {

    }
    else {

    }
    return words[word.length].indexOf(word.toLowerCase()) !== -1;
  }
};




module.exports = WordChecker;

