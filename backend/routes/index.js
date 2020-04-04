var express = require("express");
var router = express.Router();
var Cases = require("../controllers/Cases");

// get full api
router.get("/", function(req, res, next) {
  // res.send("<pre>" + JSON.stringify(req.cases, null, 2) + "</pre>");
  res.send(req.cases);
});

// get api by country
router.get("/countries", function(req, res, next) {
  let countries = Cases.byCountry(req.cases);
  // res.send("<pre>" + JSON.stringify(countries, null, 2) + "</pre>");
  res.send(countries);
});

// get api for a single country
router.get("/country/:country", function(req, res, next) {
  country = req.cases.filter(state => state.country === req.params.country);
  // res.send("<pre>" + JSON.stringify(country, null, 2) + "</pre>");
  res.send(country);
});

module.exports = router;
