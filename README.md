# hex-view
Javascript HEX viewer for buffers/typed arrays

# Usage:
Library returns function that accepts 2 agruments (buffer, optionalOptions) and returns string. Buffer can be provided directly or as any object that contains property "buffer" (typed arrays, WebAssembly.Memory ... and so on)

```javascript
const hexView = require('hex-view');
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
```

# Example output:
```
00000: -- -- -- -- -- -- -- -- 16 -- -- -- 7e -- 6c -- 69 -- 62 -- 2f -- 61 --
00024: 6c -- 6c -- 6f -- 63 -- 61 -- 74 -- 6f -- 72 -- 2f -- 74 -- 6c -- 73 --
00048: 66 -- 2e -- 74 -- 73 -- -- -1 -- -- -- -- -- -- -- -- -- -- -- -- -- --
00072: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 10
01272: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- a8 -c -- -- -- -- -- --
02904: -- -- -- -- -- -- -- -- f8 ff -- -- -- -- -- -- -- -- -- -- -- -- -- --
02976: -- -1 -- -- -- -- -- -- ce af c6 d8 73 fb -- -- -- -- -1 12 7a -- -- --
03240: 49 f3 -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
```
