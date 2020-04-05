import React from "react";
import Utils from "../Utils";
import Colors from "../config/Colors";
import ExponentialRegression from "ml-regression-exponential";
import { LineChart, Line, XAxis, YAxis } from "recharts";

let trendRange = {
  start: new Date("3/29/20"),
  end: null,
};
let dateRange = {
  start: new Date("3/1/20"),
  end: new Date("4/15/20"),
};

class Icon extends React.Component {
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
  }
  render() {
    let cases = this.props.data.cases.slice();

    let data = Utils.dateRangeTrim(
      cases,
      this.state.dateRange.start,
      this.state.dateRange.end
    );

    let regressionData = Utils.dateRangeTrim(
      data,
      trendRange.start,
      trendRange.end
    );

    let startIndex = Utils.dateIndex(data, trendRange.start);
    let regression = new ExponentialRegression(
      regressionData.map((row, i) => i + startIndex),
      regressionData.map((row) => row.count)
    );
    // console.log(regression.toString(2));

    // add empty dates to the end of data
    data = Utils.padData(data, dateRange.end);

    // add trend and epoch to data
    data = data.map((row, i) => {
      row.trend = Math.round(regression.predict(i));
      return row;
    });

    return (
      <div className="flex my-3 py-5">
        <div className="mx-auto my-5">
          <LineChart
            width={250}
            height={250 * 0.6}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <Line
              name="Trend"
              type="monotone"
              dataKey="trend"
              stroke={Colors.secondary}
              strokeWidth={16}
              dot={{ r: 0 }}
              isAnimationActive={false}
            />
            <XAxis
              dataKey="epoch"
              angle={-90}
              textAnchor="end"
              domain={["dataMin", "dataMax"]}
              tick={{ dx: -6 }}
              tickFormatter={() => ""}
              type="number"
              scale="time"
              interval="preserveStart"
              strokeWidth={16}
            />
            <YAxis
              domain={[0, (dataMax) => this.state.yRange]}
              tickFormatter={() => ""}
              strokeWidth={16}
            />
          </LineChart>
        </div>
      </div>
    );
  }
}

export default Icon;
