import React from "react";
import "./App.css";

import Api from "./config/Api";
import CovidInfo from "./components/CovidInfo";

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
        {this.state.cases && <CovidInfo cases={this.state.cases} />}
      </div>
    );
  }

  apiGet = () => {
    console.log("App.apiGet()");
    fetch(Api.url)
      .then(res => res.json())
      .then(cases => {
        // convert dates to date objects
        cases = cases.map(country => {
          country.cases = country.cases.map(row => {
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
