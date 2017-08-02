/* Given a matrix, find its submatrix obtained by deleting the specified rows
and columns.

Example:
  matrix = [[1, 0, 0, 2], [0, 5, 0, 1], [0, 0, 3, 5]];
  rows = [1];
  cols = [0, 2];

  console.log(constructSubmatrix(matrix, rows, cols)); // [[0, 2], [0, 5]]
*/

function constructSubmatrix(matrix, rows, cols) {
  // Copy matrix to avoid mutation.
  // @todo: Verify deep copy.
  var result = matrix.slice('');

  // Sort rows and cols in desc order; else, splicing a lower index offsets
  // higher indices.
  rows.sort(sortDesc);
  cols.sort(sortDesc);

  // For row in rows,
  rows.forEach(function (row) {
    // Splice row from matrix.
    result.splice(row, 1);
  });

  // For col in cols,
  cols.forEach(function (col) {
    // For row in matrix,
    result.forEach(function (row) {
      // Splice col from row.
      row.splice(col, 1);
    });

  });

  return result;
}

function sortDesc(first, second) {
  return second - first;
}

var matrix = [[1, 0, 0, 2], [0, 5, 0, 1], [0, 0, 3, 5]];
var rows = [1];
var cols = [0, 2];

console.log(constructSubmatrix(matrix, rows, cols)); // [[0, 2], [0, 5]]

var matrix1 = [[1, 0, 0, 2], [0, 5, 0, 1], [1, 2, 3, 4], [0, 0, 3, 5]];
var rows1 = [1, 3];
var cols1 = [0, 2];

console.log(constructSubmatrix(matrix1, rows1, cols1)); // [[0, 2], [2, 4]]