import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Api from "./config/Api";
import CovidInfo from "./pages/CovidInfo";
import Icon from "./pages/Icon";

const cacheTime = 1000 * 60 * 15; // 15 mins

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cases: false };
  }
  componentDidMount() {
    this.apiGet();
    setInterval(this.apiGet, cacheTime);
  }
  render() {
    // console.log(this.state.cases.length);
    return (
      <div className="App">
        <Router>
          <Switch>
            {this.state.cases && (
              <Route
                path="/icon"
                render={() => (
                  <Icon
                    data={
                      this.state.cases.filter((row) => row.country === "US")[0]
                    }
                  />
                )}
              />
            )}
            {this.state.cases && (
              <Route
                path="/"
                render={() => (
                  <CovidInfo
                    name="US"
                    data={
                      this.state.cases.filter((row) => row.country === "US")[0]
                    }
                  />
                )}
              />
            )}
          </Switch>
        </Router>
      </div>
    );
  }

  apiGet = () => {
    // console.log("App.apiGet()");
    fetch(Api.url)
      .then((res) => res.json())
      .then((cases) => {
        // convert dates to date objects
        cases = cases.map((country) => {
          country.cases = country.cases.map((row) => {
            row.date = new Date(row.date);
            row.displayDate =
              row.date.getMonth() + 1 + "/" + row.date.getDate();
            row.epoch = +row.date;
            row.change = Math.round(row.change * 100);
            return row;
          });
          // console.log(country);
          return country;
        });
        // console.log(cases);
        this.setState({ cases: cases });
      })
      .catch("apiGet():", console.log);
  };
}

export default App;
