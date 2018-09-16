const hexView = require('../index');
const buffer = new Uint8Array([
  0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,255,
  0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,255,
  0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,255,
  0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,255
]);

// simple usage with default options
const hexViewString = hexView(buffer); // will print to console and return as string



// you can change any of default options:
hexView(buffer,{
  start: 0,               // start viewing from given byte number
  positionInHex: false,   // view byte positions as hex numbers
  specialValues: {        // can be used to quickly point/filter interesting values
    '0': '--'
  },
  pad: '-',               // padding sign
  print: true,            // print result to console
  width: 0,               // 0 means that entire console width will be used to view data
  group: 1,               // amount of presented bytes in a row will be a multiplication of this value
  skipEmptyLines: true    // skips presenting lines with all bytes equal to zero
});
