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

function hasSpecialTiles(letterArray) {
  return _.some(letterArray, function(letter) {
    return letter.special;
  });
}

buildWordObj('words.txt');

var finalWord = null;

WordChecker = {
  validateWord: function(letterArray, word) {
    var wordLength, newLetterObj, newLetterArray, newWord, result;

    if ( hasSpecialTiles(letterArray) ) {
      wordLength = letterArray.length;

      // Iterate through each letter in the word. If the letter is a wildcard, recursively 
      // call this method with each letter that fits the spot. This way, it'll get directed 
      // to the lower branch below, where it gets treated as a regular word.
      var sortedLetterValues = ScoreCalculator.getWordsSortedByPoints();

      _.some(letterArray, function(letter, index) {
        console.log(letter, "at position", index);

        if ( letter.special && letter.letter === 'wildcard' ) {
          result = _.find(sortedLetterValues, function(sortedLetter) {
            newLetterObj   = { letter: sortedLetter, special: false, active: true };
            newLetterArray = letterArray.slice();
            newLetterArray.splice(index, 1, newLetterObj);
            newWord        = newLetterArray.map(function(letter) { return letter.letter }).join("");

            console.log(word, "became", newWord, "with array", newLetterArray);

            return this.validateWord(newLetterArray, newWord);

          }, this);
        }
        console.log("returning", result);
        return result;
      }, this);

      console.log(result, "with variables:", newLetterArray, newWord, "and final word", finalWord)
      return result ? finalWord : false;
    }

    // This is just a plain ol' word. No special tiles
    else {
      if ( words[letterArray.length].indexOf(word.toLowerCase()) !== -1 ) {
        finalWord = word;
        console.log(word, "IS a word");
      } else {
        // reset our finalWord
        if ( finalWord )
          finalWord = null;
        console.log(word, "is NOT a word");
      }
      return words[letterArray.length].indexOf(word.toLowerCase()) !== -1;
    }
    
  }
};




module.exports = WordChecker;

