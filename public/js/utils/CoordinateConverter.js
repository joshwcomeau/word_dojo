// Coordinate Converter.
// The presentation logic uses "odd-q offset coordinates" - very similar to a square grid.
// We need to be able to convert to 3-dimensional "cube coordinates" for algorithms.
// This utility handles all such conversions.
//
// See: http://www.redblobgames.com/grids/hexagons/


var CoordinateConverter = {
  to_cube: function(q, r) {
    var x, y, z;

    x = q;
    z = r - (q - (q&1)) / 2;
    y = -x-z;

    return {
      x: x,
      y: y,
      z: z
    };
  },

  to_offset: function(x, y, z) {
    var q, r;

    q = x;
    r = z + (x - (x&1)) / 2;

    return {
      q: q, 
      r: r
    };
  }
};




module.exports = CoordinateConverter;
