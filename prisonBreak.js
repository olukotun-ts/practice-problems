/* Scofield has been in prison for a long day — it's time to escape! The
prison's gate consists of n horizontal and m vertical bars that are spaced
one unit apart, so the area of each hole between the bars is 1 × 1.

Scofield manages to remove certain bars and make some of these holes bigger.

For example, consider the diagram below. The first image depicts the initial
prison gate with n = 6 horizontal and m = 6 vertical bars, where the area of
the biggest hole in the bars is 1 × 1. The second image depicts that same gate
after Scofield removes horizontal bar 4 and vertical bar 2, at which point the
area of the biggest hole in the bars becomes 2 × 2 = 4:

      1  2  3  4  5  6
   x--x--x--x--x--x--x--x
   |  |  |  |  |  |  |  |
1  x--x--x--x--x--x--x--x
   |  |  |  |  |  |  |  |
2  x--x--x--x--x--x--x--x
   |  |  |  |  |  |  |  |
3  x--x--x--x--x--x--x--x
   |  |  |  |  |  |  |  |
4  x--x--x--x--x--x--x--x
   |  |  |  |  |  |  |  |
5  x--x--x--x--x--x--x--x
   |  |  |  |  |  |  |  |
6  x--x--x--x--x--x--x--x
   |  |  |  |  |  |  |  |
   x--x--x--x--x--x--x--x

      1  2  3  4  5  6
   x--x--x--x--x--x--x--x
   |  |     |  |  |  |  |
1  x--x--x--x--x--x--x--x
   |  |     |  |  |  |  |
2  x--x--x--x--x--x--x--x
   |  |     |  |  |  |  |
3  x--x--x--x--x--x--x--x
   |  |     |  |  |  |  |
4  x  x  x  x  x  x  x  x
   |  |     |  |  |  |  |
5  x--x--x--x--x--x--x--x
   |  |     |  |  |  |  |
6  x--x--x--x--x--x--x--x
   |  |     |  |  |  |  |
   x--x--x--x--x--x--x--x

Another example: in the diagram below, the first image depicts the initial
prison gate with n = 3 horizontal and m = 2 vertical bars. The second image
depicts that same gate after Scofield removes horizontal bars 1, 2, and 3 and
vertical bars 1 and 2. The area of the biggest hole in the bars is 4 × 3 = 12:

      1  2
   x--x--x--x
   |  |  |  |
1  x--x--x--x
   |  |  |  |
2  x--x--x--x
   |  |  |  |
3  x--x--x--x
   |  |  |  |
   x--x--x--x

      1  2
   x--x--x--x
   |        |
1  x  x  x  x
   |        |
2  x  x  x  x
   |        |
3  x  x  x  x
   |        |
   x--x--x--x


Complete the prison function below. It has four parameters:
  1. An integer, n, denoting the number of horizontal bars initially in the
  prison gate. Each horizontal bar is indexed with an ID number from 1 to n.
  2. An integer, m, denoting the number of vertical bars initially in the
  prison gate. Each vertical bar is indexed with an ID number from 1 to m.
  3. An array of x integers, h, where each h is the ID number of a horizontal
  bar that Scofield removes.
  4. An array of y integers, v, where each v is the ID number of a vertical bar
  that Scofield removes.

The function must return an integer denoting the area of the biggest hole in
the prison gate's bars.

console.log(prison(6, 6, [4], [2])) // Should return 4.
console.log(prison(3, 2, [1, 2, 3], [1, 2])) // Should return 12.
console.log(prison(3, 3, [2], [2])) // Should return 4.
console.log(prison(2, 2, [], [])) // Should return 1.

*/



function prison(n, m, h, v) {
  // Coefficient of prison existence.
  var h_exists = 1;
  var v_exists = 1;

  // Coefficient of bar removal.
  var h_removedAny = h.length > 0 ? 1 : 0;
  var v_removedAny = v.length > 0 ? 1 : 0;

  // Coefficient of consecutive removals.
  var h_consecutiveRemovals = countConsecutives(h);
  var v_consecutiveRemovals = countConsecutives(v);

  var h_factor = h_exists + h_removedAny + h_consecutiveRemovals;
  var v_factor = v_exists + v_removedAny + v_consecutiveRemovals;

  return h_factor * v_factor;
}

function countConsecutives(arr) {
  // Sort arr in ascending order.
  arr.sort(function(a, b) {
    return a - b;
  });

  var currentCount;
  var longestStreak = 0;
  var prev;
  arr.forEach(function (elem) {
    if ((elem - prev) === 1) {
      currentCount++;
    } else {
      currentCount = 0;
    }

    prev = elem;

    if (currentCount > longestStreak) {
      longestStreak = currentCount;
    }
  });

  return longestStreak;
}

console.log(prison(6, 6, [4], [2])) // Should return 4.
console.log(prison(3, 2, [1, 2, 3], [1, 2])) // Should return 12.
console.log(prison(3, 3, [2], [2])) // Should return 4.
console.log(prison(2, 2, [], [])) // Should return 1.