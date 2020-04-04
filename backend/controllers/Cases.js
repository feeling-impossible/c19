exports.byCountry = function(cases) {
  // get the list of date labels from the first row
  let dateLabels = cases[0].cases.map(row => row.date);

  // get a list of countries, remove duplicates and sort
  let countries = [...new Set(cases.map(state => state.country))]
    .filter(country => country !== undefined)
    .sort();

  // for every country
  countries = countries.map(country => {
    // create an array of cases, one index for each day
    let countryCases = dateLabels.map((label, i) => {
      return {
        date: label,
        count: cases
          .filter(state => state.country === country) // for every state in country
          .map(state => parseInt(state.cases[i].count || 0)) // get the number of cases on day i
          .reduce((total, num) => total + num) // add them all up
      };
    });

    // return an object for each country
    return {
      name: country,
      cases: countryCases
    };
  });

  return countries;
};
