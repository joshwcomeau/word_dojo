// Letter Generator.
// Randomly selects appropriate letters. Also handles special letters (when I get there).

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

function generateDistributionArray() {
  var occurances, letters = [];

  // returns an array with the letter repeated as many times as needed.
  // There are 9 As in the distribution above, so it returns ['A','A','A'...x9]
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
    // Using scrabble letter distributions, I'm gonna assume they've solved this problem.
    var letters = [];

    _.times(num, function() {
      letters.push(_.sample(_letters));
    });

    console.log(_letters)
    console.log(letters)

    return letters;
  }
};




module.exports = letterGenerator;
