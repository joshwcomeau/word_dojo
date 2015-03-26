// Letter Generator.
// Randomly selects appropriate letters. Also handles special letters (when I get there).

var _generatedLetters = [];
var _letters          = {
  vowels:     'AEIOUY',                 // Damn straight, Y is a vowel.
  consonants: 'BCDFGHJKLMNPQRSTVWXZ'
};

var _letters = [
  'A','A','A','A','A','A','A','A','A','B','B','C','C','D','D','D','D','E','E','E','E','E','E','E','E','E','E','E','E',
  'F','F','G','G','G','H','H','H','H','I','I','I','I','I','I','I','I','I','J','K','L','L','L','L','M','M','O','O','O',
  'O','O','O','O','O','P','P','Q','R','R','R','R','R','R','S','S','S','S','T','T','T','T','T','T','U','U','U','U','V',
  'V','W','W','X','Y','Y','Z'
];
var letterGenerator = {
  generate: function(num) {
    // Using scrabble letter distributions, I'm gonna assume they've solved this problem.
    var letters = [];

    _.times(num, function() {
      letters.push(_.sample(_letters));
    });

    return letters;
  }
};




module.exports = letterGenerator;
