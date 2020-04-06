import React from "react";
import Utils from "../Utils";
import LineGraph from "../components/LineGraph";
import BarGraph from "../components/BarGraph";
import DisplayData from "../components/DisplayData";
import Picker from "../components/Picker";
import SliderWrapper from "../components/SliderWrapper";

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
    // let graphWidth = 300;
    if (graphWidth > 500) graphWidth = 500;
    let graphHeight = Math.floor(graphWidth * 0.6);
    let textSmaller = graphWidth === 500 ? false : true;

    return (
      <div className="py-2">
        <div className="my-4 textLargest">
          Covid19 Trendline Sandbox: {location.country}
        </div>
        <div className="flex px-0">
          <div className="flex mx-auto">
            {/* <div className="border border-primary"> */}
            <div>
              <SliderWrapper
                values={casesInRange.map((row) => row.date)}
                range={this.state.trendRange}
                save={this.updateTrendRange}
                width={this.props.width}
              />
              <Picker
                values={yRanges}
                selected={this.state.yRange}
                save={this.updateYRange}
                textSmaller={textSmaller}
              />
              <LineGraph
                data={casesInRange}
                trendRange={this.state.trendRange}
                dateRange={this.state.dateRange}
                yMax={this.state.yRange}
                width={graphWidth}
                height={graphHeight}
              />
              <BarGraph
                data={casesInRange}
                dataKey="new"
                name="Daily New Cases"
                dateRange={this.state.dateRange}
                hideLegend={true}
                width={graphWidth}
                height={graphHeight}
              />
              <BarGraph
                data={casesInRange}
                dataKey="change"
                name="Daily Percent Change"
                dateRange={this.state.dateRange}
                hideLegend={true}
                width={graphWidth}
                height={graphHeight}
              />
              {/* </div>
            <div className="px-2"> */}
              <DisplayData
                data={cases}
                trendRange={this.state.trendRange}
                textSmaller={textSmaller}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CovidInfo;
