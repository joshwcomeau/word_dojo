var keyMirror = require('keymirror');

module.exports = keyMirror({
  // You submitted a word and it was a valid dictionary word
  WORD_ACCEPTED: null,

  // You submitted a word and it was nonsense
  WORD_REJECTED: null,

  // You clicked on a fresh tile - either the first click of the game, or 
  // an extension of the current word.
  TILE_ACTIVATED: null,

  // You undid your last move, by clicking the most recently activated tile
  TILE_DEACTIVATED: null,  

  // You clicked a tile in your word that was NOT the most recent one, and
  // deactivated all the tiles in that word.
  WORD_DEACTIVATED: null,  

  // you clicked a non-neighboring cell and started a new word.
  NEW_WORD_STARTED: null   
});