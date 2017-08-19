/* Jessica has an array, numbers, consisting of n integers. She plays a game
with this array where, in each move, she selects (n − 1) elements and
increments their values by one. For example, if n = 4, she chooses 3 of the 4
elements during each move and increments each of their values by one.

Jessica wants to know the minimum number of moves required to make all of the
array's elements equal.

Complete the countMoves function. It has 1 parameter: an array of integers,
numbers. It must return an integer denoting the minimum number of moves
required for all elements to be equal.

Example:
countMoves([5,6,8,8,5]) should return 7. Initially, numbers = [5,6,8,8,5].

Jessica makes the following moves:
  1. Increments the values corresponding to all indices except numbers[3], so
  the array becomes [6, 7, 9, 8, 6].
  2. Increments the values corresponding to all indices except numbers[2], so
  the array becomes [7, 8, 9, 9, 7].
  3. Increments the values corresponding to all indices except numbers[3], so
  the array becomes [8, 9, 10, 9, 8].
  4. Increments the values corresponding to all indices except numbers[2], so
  the array becomes [9, 10, 10, 10, 9].
  5. Increments the values corresponding to all indices except numbers[3], so
  the array becomes [10, 11, 11, 10, 10].
  6. Increments the values corresponding to all indices except numbers[1], so
  the array becomes [11, 11, 12, 11, 11].
  7. Increments the values corresponding to all indices except numbers[2], so
  the array becomes [12, 12, 12, 12, 12].

Recall that the set of indices updated during each move must be of size n − 1.

It took a minimal 7 moves to make all elements in the array equal.
*/

function countMoves(numbers) {
  var moveCount = 0;
  var numbersCopy = numbers.slice('');

  while (!allEqual(numbersCopy)) {
    var largestElemIndex = findLargest(numbersCopy);
    numbersCopy = incrementAllExcept(numbersCopy, largestElemIndex);
    moveCount++;
  }

  return moveCount;
}

function allEqual(arr) {
  var prev = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      return false;
    }

    prev = arr[i];
  }

  return true;
}

function findLargest(arr) {
  var indexOfLargest = 0;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > arr[0]) {
      indexOfLargest = i;
    }
  }

  return indexOfLargest;
}

function incrementAllExcept(arr, index) {
  var arrCopy = arr.slice('');

  for (var i = 0; i < arrCopy.length; i++ ) {
    if (i !== index) {
      arrCopy[i]++;
    }
  }

  return arrCopy;
}

console.log(countMoves([5,6,8,8,5]) === 7);