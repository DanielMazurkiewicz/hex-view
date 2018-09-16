function pad(value, width, padChar = '0', specialValues = {}) {
  value += '';
  if (specialValues[value]) return specialValues[value];

  while (value.length < width) {
    value = padChar + value;
  }
  return value;
}


module.exports = (buffer, userOptions = {}) => {
  if (buffer.buffer !== undefined) buffer = buffer.buffer;

  const options = Object.assign({
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
  }, userOptions);

  var view = new DataView(buffer);
  var position = options.start, length = view.byteLength;
  var positionBase = options.positionInHex ? 16 : 10;

  var lengthOfCurrentPositionNumber = length.toString(positionBase).length;
  var width = options.width || process ? process.stdout.columns : null || 80;
  var bytesInRow = Math.floor((width - lengthOfCurrentPositionNumber - 1) / 3);
  bytesInRow = Math.floor(bytesInRow / options.group) * options.group;

  var result = '';

  var byteInRow = 0;
  var currentByte;
  var currentLine = '';
  var currentLineIsEmpty = true;
  var currentPosition = position;

  while (position < length) {
    currentByte = view.getUint8(position++);
    if (currentByte) currentLineIsEmpty = false;

    currentLine += ' ' + pad(currentByte.toString(16), 2, options.pad, options.specialValues);
    byteInRow++;
    if (byteInRow >= bytesInRow) {
      if (!options.skipEmptyLines || (options.skipEmptyLines && !currentLineIsEmpty)) {
        result += pad(currentPosition.toString(positionBase), lengthOfCurrentPositionNumber) + ':' + currentLine + '\n';
      }
      byteInRow = 0;
      currentLine = '';
      currentLineIsEmpty = true;
      currentPosition = position;
    }
  }


  if (byteInRow) {
    if (!options.skipEmptyLines || (options.skipEmptyLines && !currentLineIsEmpty)) {
      result += pad(currentPosition.toString(positionBase), lengthOfCurrentPositionNumber) + ':' + currentLine + '\n';
    }
  }


  if (options.print) {
    console.log(result);
  }
  return result;
}