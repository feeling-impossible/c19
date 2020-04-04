const cacheTime = 1000 * 60 * 15; // 15 mins
const cacheFile = "./cache.csv";
const casesCol = 4;
const csvApi =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
//const csvApi = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv";

const fs = require("fs");
const request = require("request");

let cases, updated;
exports.cases = async function (req, res, next) {
  req.cases = await getCases();
  return next();
};

async function getCases() {
  let now = new Date().getTime();
  if (cases && updated && now - updated < cacheTime) return cases;

  let age = await cacheAge();
  if (!age || age > cacheTime) return await apiGet();

  return await cacheGet();
}

function cacheAge() {
  console.log("cacheAge():");
  return new Promise(function (resolve, reject) {
    fs.stat(cacheFile, (err, file) => {
      if (err || !file) return resolve(false);
      resolve(Date.now() - file.mtime.getTime());
    });
  });
}

function apiGet() {
  console.log("apiGet():");
  return new Promise(function (resolve, reject) {
    request.get(csvApi, async (err, res, data) => {
      if (err) resolve([]);

      cacheSave(data);
      saveCases(data);
      resolve(parseCsv(data));
    });
  });
}

function saveCases(data) {
  cases = parseCsv(data);
  updated = new Date().getTime();
}

function cacheGet() {
  console.log("cacheGet():");
  return new Promise(function (resolve, reject) {
    fs.readFile(cacheFile, "utf8", (err, data) => {
      if (err) resolve(false);

      saveCases(data);
      resolve(parseCsv(data));
    });
  });
}

function cacheSave(data) {
  console.log("cacheSave():");
  return new Promise(function (resolve, reject) {
    fs.writeFile(cacheFile, data, (err, data) => {
      if (err) resolve(false);
      resolve(true);
    });
  });
}

function parseCsv(data) {
  data = data
    .split(/[\r\n]+/g) // split by end of line
    .filter((line) => !line.match(/^\s*$/)) // filter out empty lines
    .map((row) => row.split(/,(?=(?:[^"]|"[^"]*")*$)/)); // split lines by unquoted commas (shout out to stackoverflow)

  // get the list of dates from the header line
  let dates = data.shift().splice(casesCol, data[0].length - casesCol);

  // convert an array of arrays into an array of objects
  data = data.map((row) => {
    let cases = row.splice(casesCol, row.length - casesCol);
    return {
      state: row[0],
      country: row[1],
      lat: row[2],
      lon: row[3],
      cases: cases.map((count, i) => {
        return {
          date: dates[i],
          count: count,
        };
      }),
    };
  });

  data = data.map((country) => {
    country.cases = country.cases.map((row, i) => {
      let prev = country.cases[i - 1];
      row.new = prev ? row.count - prev.count : 0;
      row.change = prev ? round2(row.count / prev.count - 1) : 0;
      return row;
    });
    return country;
  });

  return data;
}

function round2(value) {
  value = Math.round(value * 100) / 100;
  return value;
}
