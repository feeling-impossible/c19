exports.dateIndex = function(array, date) {
  let index = array
    .map(row => row.date)
    .map(Number) // serialize array of dates so indexOf will work
    .indexOf(+date);
  return index;
};

exports.dateRangeTrim = function(array, from, to) {
  let fromIndex = exports.dateIndex(array, from);
  let toIndex = exports.dateIndex(array, to);
  // console.log(from, fromIndex);
  // console.log(to, toIndex);
  if (toIndex < 0) toIndex = array.length - 1;

  return array.slice().splice(fromIndex, toIndex - fromIndex + 1);
};

exports.padData = function(cases, endDate) {
  let date = new Date(cases[cases.length - 1].date);

  while (date < endDate) {
    date.setDate(date.getDate() + 1);
    cases.push({
      date: new Date(date),
      epoch: +date,
      count: null
    });
  }
  return cases;
};

exports.dateInRange = function(range, date) {
  if (range.start <= date && date <= range.end) return true;
  return false;
};

exports.addCommas = function(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

exports.displayDate = function(date) {
  return date.getMonth() + 1 + "/" + date.getDate();
};
