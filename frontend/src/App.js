import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

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
      showMenu: window.innerWidth > 880 ? true : false,
      // menuWidth: 18.5,
      menuWidth: 19,
    };
    this.updateCountry = this.updateCountry.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  componentDidMount() {
    this.apiGet();
    setInterval(this.apiGet, cacheTime);
  }
  updateCountry(country) {
    this.setState({ country: country });
  }
  toggleMenu() {
    this.setState({ showMenu: !this.state.showMenu });
  }
  render() {
    // console.log(this.state.cases.length);
    return (
      <div className="App">
        <div className="flex">
          {this.state.cases && (
            <Menu
              width={this.state.menuWidth}
              data={this.state.cases}
              selected={this.state.country}
              save={this.updateCountry}
              toggle={this.toggleMenu}
              show={this.state.showMenu}
            />
          )}
          <Router>
            <Switch>
              {this.state.cases && (
                <Route
                  path="/icon"
                  render={() => (
                    <Icon
                      data={
                        this.state.cases.filter(
                          (row) => row.country === "US"
                        )[0]
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
                      data={
                        this.state.cases.filter(
                          (row) => row.country === this.state.country
                        )[0]
                      }
                    />
                  )}
                />
              )}
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
            row.change = Math.round(row.change * 100);
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
