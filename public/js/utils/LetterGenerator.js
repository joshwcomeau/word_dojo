// Letter Generator.
// Randomly selects appropriate letters. Also handles special letters (when I get there).

var _generatedLetters = [];
var _letters          = {
  vowels:     'AEIOUY',                 // Damn straight, Y is a vowel.
  consonants: 'BCDFGHJKLMNPQRSTVWXZ'
};

var letterGenerator = {
  generate: function(num) {
    // For now, let's keep it simple: 50% chance to get a vowel, 50% to get a consonant.
    // Later I will need to figure out a smarter way, so that letters like R show up more
    // than letters like X or Z.
    var letter,
        letters = [];

    _.times(num, function() {
      letter = Math.random() < 0.5 ? _.sample(_letters.vowels) : _.sample(_letters.consonants);
      letters.push(letter);
    });

    return letters;
  }
};




module.exports = letterGenerator;
