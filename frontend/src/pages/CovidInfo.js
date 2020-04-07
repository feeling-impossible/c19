import React from "react";
import Utils from "../Utils";
import Graphs from "../components/Graphs";
import DisplayData from "../components/DisplayData";

let dateRange = {
  start: new Date("3/1/20"),
  end: new Date("4/21/20"),
};
let yRanges = [10000, 50000, 100000, 250000, 500000, 1000000];

class CovidInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trendRange: {
        start: this.props.data.cases[this.props.data.cases.length - 4].date,
        end: this.props.data.cases[this.props.data.cases.length - 1].date,
      },
      dateRange: dateRange,
      yRange: 500000,
    };
    this.updateTrendRange = this.updateTrendRange.bind(this);
    this.updateYRange = this.updateYRange.bind(this);
  }
  updateTrendRange(range) {
    this.setState({ trendRange: range });
  }
  updateYRange(value) {
    this.setState({ yRange: value });
  }
  render() {
    let location = {
      state: this.props.data.state,
      country: this.props.data.country,
      lat: this.props.data.lat,
      lon: this.props.data.lon,
    };
    let cases = this.props.data.cases.slice();

    let casesInRange = Utils.dateRangeTrim(
      cases,
      this.state.dateRange.start,
      this.state.dateRange.end
    );

    let graphWidth = window.innerWidth - 70;
    if (graphWidth > 500) graphWidth = 500;
    let graphHeight = Math.floor(graphWidth * 0.6);
    let textSmaller = window.innerWidth < 500 ? true : false;

    return (
      <div
        className="p-2 grow"
        style={{
          marginLeft: "1.5em",
        }}
      >
        <div className="my-4 textLargest textCenter">
          Covid19 Trendline Sandbox: {location.country}
        </div>
        <Graphs
          data={casesInRange}
          yRanges={yRanges}
          yRange={this.state.yRange}
          updateYRange={this.updateYRange}
          dateRange={this.state.dateRange}
          trendRange={this.state.trendRange}
          updateTrendRange={this.updateTrendRange}
          textSmaller={textSmaller}
          width={graphWidth}
          height={graphHeight}
        />
        <DisplayData
          data={cases}
          trendRange={this.state.trendRange}
          textSmaller={textSmaller}
        />
      </div>
    );
  }
}

export default CovidInfo;
