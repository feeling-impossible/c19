import React from "react";
import Utils from "../Utils";
import Graphs from "../components/Graphs";
import DisplayData from "../components/DisplayData";

let trendRange = {
  start: new Date("4/1/20"),
  end: null,
};
let dateRange = {
  start: new Date("3/1/20"),
  end: new Date("4/18/20"),
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
          : this.props.data.cases[this.props.data.cases.length - 1].date,
      },
      dateRange: dateRange,
      yRange: 500000,
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
    // console.log(this.props.data);
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

    let graphWidth = window.innerWidth - 20;
    if (graphWidth > 500) graphWidth = 500;
    let graphHeight = Math.floor(graphWidth * 0.6);
    let textSmaller = window.innerWidth < 500 ? true : false;

    return (
      <div className="p-2 grow">
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
