// Letter Generator.
// Randomly selects appropriate letters. Also handles special letters (when I get there).


// Using scrabble letter distributions, I'm gonna assume they've solved this problem.
var _letterDistribution = {
  A: 9,  B: 2,  C: 2,
  D: 4,  E: 12, F: 2,
  G: 3,  H: 2,  I: 9,
  J: 1,  K: 1,  L: 4,
  M: 2,  N: 6,  O: 8,
  P: 2,  Q: 1,  R: 6,
  S: 4,  T: 6,  U: 4,
  V: 2,  W: 2,  X: 1,
  Y: 2,  Z: 1
};

var _letterKeys = Object.keys(_letterDistribution);
var _letters    = generateDistributionArray();

// This function generates an array with each letter repeated N times, where
// N is its distribution in _letterDistribution.
// eg. [A,A,A,A,A,A,A,A,A, B,B, C,C ...]
function generateDistributionArray() {
  var occurances, letters = [];


  _letterKeys.forEach(function(letter) {
    occurances = _letterDistribution[letter];

    _.times(occurances, function() {
      letters.push(letter);
    });
  });

  return letters;
}


var letterGenerator = {
  generate: function(num) {
    var letters = [];

    _.times(num, function() {
      letters.push(_.sample(_letters));
    });

    return letters;
  }
};




module.exports = letterGenerator;
