/* Consider a string consisting of lowercase English alphabetic letters only.
We use the following rules to encode all of its characters into a string:
  - a is encoded as 1, b as 2, c as 3, ...and i as 9.
  - j is encoded as 10#, k as 11#, l as 12#, ...and z as 26#.
  - if there are two or more consecutive occurences of any character, then the
  character count is written within parentheses. For example:
    - 'aabccc' is endoded as '1(2)23(3)'
    - 'bajj' is encoded as '2110#(2)'

Complete countDecodedFreq(s). It has one parameter: a string s that was
encoded using the rules above. The function must return an array of 26
integers where the element at
  - index 0 denotes frequency of 'a' in the original string,
  - index 1 denotes frequency of 'b' in the original string...
  - index 25 denotes frequency of 'z' in the original string.

Example:
========
var code = '1226#24#';
console.log(countDecodedFreq(code)); // [1, 1, ..., 1, 0, 1]

var code1 = '1226#(3)24#';
console.log(countDecodedFreq(code1)); // [1, 1, ..., 3, 0, 1]
*/

function countDecodedFreq(s) {
  var decoder = buildDecoder({});
  var frequencyMap = parse(s, decoder); // {'a': [freq, index]}

  return toArray(frequencyMap);
}

// Use Unicode code point value to calc index for each char.
// Returns {1: 'a', 2: 'b', ... 26: 'z'}
function buildDecoder(decoder) {
  var alphabets = 'abcdefghijklmnopqrstuvwxyz';
  for (var i = 0; i < alphabets.length; i++) {
    var code = 1 + alphabets.codePointAt(i) - alphabets.codePointAt(0);
    decoder[code] = alphabets[i];
  }

  return decoder;
}

// Iterate thru code translating numbers to letters and tracking frequencies.
// @todo: Handle repeats.
function parse(string, decoder) {
  var counter = {};

  // Iterate right-to-left. If current char is #, decode two chars at once.
  for (var i = string.length - 1; i >= 0; i--) {
    var token = string[i];
    if (token === '#') {
      token = string.slice(i - 2, i);
      i = i - 2;
    }

    var decoded = decoder[token];
    // Increment frequency if entry exists.
    if (counter[decoded]) {
      counter[decoded][0]++;
    } else {
      // Initialize entry with frequency and index.
      counter[decoded] = [1, token - 1];
    }
  }

  return counter;
}

// Convert map to array and replace undefineds with zeros.
// Shape of input: {'a': [freq, index]}
function toArray(map) {
  var result = [];

  for (var key in map) {
    var [freq, index] = map[key];
    result[index] = freq;
  }

  for (var i = 0; i < result.length; i++) {
    if (!result[i]) {
      result[i] = 0;
    }
  }

  return result;
}

var code = '1226#24#';
console.log(countDecodedFreq(code)); // [1, 1, ..., 1, 0, 1]