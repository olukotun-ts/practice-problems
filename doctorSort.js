/* Given a csv string of the following schema, primary sort the doctors in
ascending order by scripts_per_week_avg and secondary sort the doctors in
descending order by script_value_avg.

Schema: id, name, zip, scripts_per_week_avg, script_value_avg.

Return the doctors in the same csv format as the input string.

Example:
  Given
    var csv = `1,alex,80405,13,5
    3,bob,94123,320,1.5
    2,jane,94032,35,2.8
    4,will,94110,31.6,6.1
    5,jess,94117,48,4
    6,sam,94032,31.4,9
    7,jim,94036,35,19`;

  doctorSort(csv) should return
    1,alex,80405,13,5
    6,sam,94032,31.4,9
    4,will,94110,31.6,6.1
    7,jim,94036,35,19
    2,jane,94032,35,2.8
    5,jess,94117,48,4
    3,bob,94123,320,1.5
*/

function doctorSort(csvString) {
  // Transform csv to array of arrays. Each array represents a doctor's record.
  var docData = parseCSV(csvString);

  docData.sort(function (docArray1, docArray2) {
    var [SCRIPTS_AVG, VALUE_AVG] = [3, 4];
    var primary = docArray1[SCRIPTS_AVG] - docArray2[SCRIPTS_AVG];

    if (primary === 0) {
      return docArray2[VALUE_AVG] - docArray1[VALUE_AVG];
    }

    return primary;
  });

  var docString = toCSV(docData);

  return docString;
}

function parseCSV(str) {
  var docArrs = str.split('\n');
  var docData = docArrs.map(function (docArr) {
    return docArr.split(',');
  });

  return docData;
}

function toCSV(arr) {
  var docArr = arr.map(function (doc) {
    return doc.join(',');
  });

  return docArr.join('\n');
}

function test_doctorSort() {
  var input = `1,alex,80405,13,5
3,bob,94123,320,1.5
2,jane,94032,35,2.8
4,will,94110,31.6,6.1
5,jess,94117,48,4
6,sam,94032,31.4,9
7,jim,94036,35,19`;

  var expected = `1,alex,80405,13,5
6,sam,94032,31.4,9
4,will,94110,31.6,6.1
7,jim,94036,35,19
2,jane,94032,35,2.8
5,jess,94117,48,4
3,bob,94123,320,1.5`;

  var assertion = JSON.stringify(doctorSort(input)) === JSON.stringify(expected);
  console.log(assertion ? 'test passed' : 'test failed');
}

test_doctorSort();