import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Utils from "./Utils";
import Api from "./config/Api";
import Menu from "./components/Menu";
import CovidInfo from "./pages/CovidInfo";
import Icon from "./pages/Icon";

const cacheTime = 1000 * 60 * 15; // 15 mins

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: false,
      country: "US",
    };
    this.updateCountry = this.updateCountry.bind(this);
  }
  componentDidMount() {
    this.apiGet();
    setInterval(this.apiGet, cacheTime);
  }
  updateCountry(country) {
    this.setState({ country: country });
  }
  render() {
    if (!this.state.cases) return <div>loading...</div>;
    return (
      <div className="App">
        <div className="flex">
          <Menu
            data={this.state.cases}
            selected={this.state.country}
            save={this.updateCountry}
          />
          <Router>
            <Switch>
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
              <Route
                path="/"
                render={() => (
                  <CovidInfo
                    data={
                      this.state.cases.filter(
                        (row) => row.country === this.state.country
                      )[0]
                    }
                  />
                )}
              />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }

  apiGet = () => {
    fetch(Api.url)
      .then((res) => res.json())
      .then((cases) => {
        // convert dates to date objects
        // console.log(cases[cases.map((row) => row.country).indexOf("China")]);
        // return;
        cases = cases.map((country) => {
          country.cases = country.cases.map((row) => {
            // row.count = parseInt(row.count);
            row.date = new Date(row.date);
            row.displayDate =
              row.date.getMonth() + 1 + "/" + row.date.getDate();
            row.epoch = +row.date;
            row.change = Utils.round2(row.change * 100);
            return row;
          });
          return country;
        });

        this.setState({ cases: cases });
      })
      .catch("apiGet():", console.log);
  };
}

export default App;
