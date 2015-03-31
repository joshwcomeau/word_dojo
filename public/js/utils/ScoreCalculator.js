// Score Calculator
// Given a valid word, calculates score based on word length and letters used.
//

var letterValues = {
  A: 1,  B: 3,  C: 3,
  D: 2,  E: 1,  F: 4,
  G: 2,  H: 4,  I: 1,
  J: 8,  K: 5,  L: 1,
  M: 3,  N: 1,  O: 1,
  P: 3,  Q: 10, R: 1,
  S: 1,  T: 1,  U: 1,
  V: 4,  W: 4,  X: 8,
  Y: 4,  Z: 10
};

function calculateMultiplier(wordLength) {
  //// CURRENT VALUES ////
  // length   |   value //
  // ---------+-------- //
  // 3        |      25 //
  // 4        |      40 //
  // 5        |      60 //
  // 6        |      85 //
  // 7        |     115 //
  // 8        |     150 //
  ////////////////////////

  return 1 + (wordLength-1) * wordLength * 2.5;
}

function compare(a, b) {
  if ( a[1] > b[1] ) return -1;
  if ( a[1] < b[1] ) return 1;
  return 0;
}

var ScoreCalculator = {
  calculate: function(word) {
    // First we need to sum up the point value for every letter in the word.
    // Then we need to apply a multiplier depending on the length of the word.
    var score = 0;

    word.split("").map(function(letter) {
      return score += letterValues[letter];
    });

    return score * calculateMultiplier(word.length);
  },

  // Utility method to get an array sorted from highest point value to lowest point value.
  // Used in WordChecker, when trying to find the best combination in wildcard words.
  // Returns: [Z, Q, X, J, K, H ... A, N]
  getWordsSortedByPoints: function(data) {
    data = data || letterValues;

    // Create a 2D array
    var dataArray = _.pairs(data);

    return dataArray.sort(compare).map(function(letter) {
      return letter[0];
    });
  }
};




module.exports = ScoreCalculator;

