import React from "react";
import Utils from "../Utils";
import Graphs from "../components/Graphs";
import DisplayData from "../components/DisplayData";
import SliderWrapper from "../components/SliderWrapper";

let end = new Date();
end.setDate(end.getDate() + 31);

let dateRange = {
  start: new Date("3/1/20"),
  end: end,
};
let yRanges = [10000, 100000, 1000000, 10000000, 30000000];

class CovidInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trendRange: {
        start: this.props.data.cases[this.props.data.cases.length - 4].date,
        end: this.props.data.cases[this.props.data.cases.length - 1].date,
      },
      dateRange: dateRange,
      yRange: yRanges[yRanges.length - 1],
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

    let graphWidth = window.innerWidth - 100;
    if (graphWidth > 500) graphWidth = 500;
    let graphHeight = Math.floor(graphWidth * 0.6);

    let splitCols = window.innerWidth > 1230;
    let graphs = (
      <Graphs
        data={casesInRange}
        yRanges={yRanges}
        yRange={this.state.yRange}
        updateYRange={this.updateYRange}
        dateRange={this.state.dateRange}
        trendRange={this.state.trendRange}
        updateTrendRange={this.updateTrendRange}
        width={graphWidth}
        height={graphHeight}
      />
    );
    let displayData = (
      <DisplayData data={cases} trendRange={this.state.trendRange} />
    );

    return (
      <div className="p-2 grow">
        <div className="my-4 textLargest textCenter">
          Covid19 Trendline Sandbox: {location.country}
        </div>
        {!splitCols && (
          <div>
            {graphs}
            {displayData}
          </div>
        )}
        {splitCols && (
          <div className="flex flexCol">
            {/* <SliderWrapper
              values={casesInRange.map((row) => row.date)}
              range={this.state.trendRange}
              save={this.updateTrendRange}
              width={900}
            /> */}
            <div className="flex mx-auto">
              <div className="mr-5">{graphs}</div>
              <div>{displayData}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CovidInfo;
