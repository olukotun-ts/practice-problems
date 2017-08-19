/* Consider a string, s, composed of lowercase letters. There are two kinds of operations you can perform on s:
  1. Roll Forward (right): i j R .
    Every character in the substring s[i], s[i+1], ..., s[j-1], s[j] will roll
    forward and be replaced with its sequential alphabetical character
    (the next character after z is a). For example: a → b , i → j , z → a.
  2. Roll Backward (left): i j L .
    Every character in the substring s[i], s[i+1], ..., s[j-1], s[j] will roll backward and be replaced with its preceding alphabetical character
    (the character preceding a is z). For example: y ← z , i ← j , z ← a.

Complete the rollingString function. It has 2 parameters:
  1. A string, s, denoting the initial string.
  2. An array, operations, of k strings where the value of each element x is in
    the form of three space-separated values corresponding to i, j, and ch, respectively.

This function must perform all k sequential operations defined in operations,
and then return a string denoting the value of s after k operations.

Example:
rollingString('abc', [[0, 0, 'L'], [2, 2, 'L'], [0, 2, 'R']]) returns 'acc'.
  - After performing operation 0 0 L on "abc", s = zbc
  - After performing operation 2 2 L on "zbc", s = zbb
  - After performing operation 0 2 R on "zbb", s = acc
  - We then return the final value of s, which is "acc".
*/

function rollingString(s, operations) {
  var stringArr = s.split('');
  operations.forEach(function (operation) {
    stringArr = rollString(stringArr, operation);
  });

  return stringArr.join('');
}

function rollString(arr, [start, stop, operation]) {
  var rolled = arr.slice('');

  for (var i = start; i <= stop; i++) {
    var char = arr[i];

    if (operation === 'R') {
      if (char === 'z') {
        rolled[i] = 'a';
      } else {
        rolled[i] = String.fromCodePoint(char.codePointAt(0) + 1);
      }
    } else if (operation === 'L') {
      if (char === 'a') {
        rolled[i] = 'z';
      } else {
        rolled[i] = String.fromCodePoint(char.codePointAt(0) - 1);
      }
    }
  }

  return rolled;
}

var operations = [[0, 0, 'L'], [2, 2, 'L'], [0, 2, 'R']];
console.log('accz' === rollingString('abcz', operations));