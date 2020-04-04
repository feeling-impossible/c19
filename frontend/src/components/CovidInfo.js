import React from "react";
import Utils from "../Utils";
import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";
import DisplayData from "./DisplayData";
import Picker from "./Picker";
import SliderWrapper from "./SliderWrapper";

let trendRange = {
  start: new Date("3/29/20"),
  end: null
};
let dateRange = {
  start: new Date("3/1/20"),
  end: new Date("4/15/20")
};
let yRanges = [10000, 50000, 100000, 250000, 500000, 1000000];

class CovidInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trendRange: {
        start: trendRange.start,
        end: trendRange.end
          ? trendRange.end
          : this.props.cases[0].cases[this.props.cases[0].cases.length - 1].date
      },
      dateRange: dateRange,
      yRange: 500000
    };
    this.updateTrendRange = this.updateTrendRange.bind(this);
    this.updateYRange = this.updateYRange.bind(this);
  }
  updateTrendRange(range) {
    // console.log("updateTrendRange");
    this.setState({ trendRange: range });
  }
  updateYRange(value) {
    this.setState({ yRange: value });
  }
  render() {
    // console.log("yRange:", this.state.yRange);
    let cases = this.props.cases.slice();

    cases = cases.filter(row => row.country === "US")[0].cases;

    let casesInRange = Utils.dateRangeTrim(
      cases,
      this.state.dateRange.start,
      this.state.dateRange.end
    );

    return (
      <div className="flex py-5">
        <div className="flex mx-auto">
          <div className="px-3">
            <SliderWrapper
              values={casesInRange.map(row => row.date)}
              range={this.state.trendRange}
              save={this.updateTrendRange}
            />
            <Picker
              values={yRanges}
              selected={this.state.yRange}
              save={this.updateYRange}
            />
            <LineGraph
              data={casesInRange}
              trendRange={this.state.trendRange}
              dateRange={this.state.dateRange}
              yMax={this.state.yRange}
              // hideLegend={true}
            />
            <BarGraph
              data={casesInRange}
              dataKey="new"
              name="Daily New Cases"
              dateRange={this.state.dateRange}
              hideLegend={true}
            />
            <BarGraph
              data={casesInRange}
              dataKey="change"
              name="Daily Percent Change"
              dateRange={this.state.dateRange}
              hideLegend={true}
            />
          </div>
          <div className="px-3">
            <DisplayData data={cases} trendRange={this.state.trendRange} />
          </div>
        </div>
      </div>
    );
  }
}

export default CovidInfo;
