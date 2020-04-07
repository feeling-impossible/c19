import React from "react";
// import Utils from "../Utils";
// import Colors from "../config/Colors";

import SliderWrapper from "../components/SliderWrapper";
import Picker from "../components/Picker";
import LineGraph from "../components/LineGraph";
import BarGraph from "../components/BarGraph";

class Graphs extends React.Component {
  render() {
    const {
      data,
      yRanges,
      yRange,
      dateRange,
      trendRange,
      updateTrendRange,
      textSmaller,
      width,
      height,
    } = this.props;
    return (
      <div>
        <SliderWrapper
          values={data.map((row) => row.date)}
          range={trendRange}
          save={updateTrendRange}
          width={width}
        />
        <Picker
          values={yRanges}
          selected={yRange}
          save={this.props.updateYRange}
          textSmaller={textSmaller}
        />
        <LineGraph
          data={data}
          trendRange={trendRange}
          dateRange={dateRange}
          yMax={yRange}
          width={width}
          height={height}
        />
        <BarGraph
          data={data}
          dataKey="new"
          name="Daily New Cases"
          dateRange={dateRange}
          hideLegend={true}
          width={width}
          height={height}
        />
        <BarGraph
          data={data}
          dataKey="change"
          name="Daily Percent Change"
          dateRange={dateRange}
          hideLegend={true}
          width={width}
          height={height}
        />
      </div>
    );
  }
}

export default Graphs;
