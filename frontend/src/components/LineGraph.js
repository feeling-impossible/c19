import React from "react";
import Utils from "../Utils";
import Colors from "../config/Colors";
import ExponentialRegression from "ml-regression-exponential";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

class LineGraph extends React.Component {
  render() {
    let data = this.props.data.slice();

    let regressionData = Utils.dateRangeTrim(
      data,
      this.props.trendRange.start,
      this.props.trendRange.end
    );

    let startIndex = Utils.dateIndex(data, this.props.trendRange.start);
    let regression = new ExponentialRegression(
      regressionData.map((row, i) => i + startIndex),
      regressionData.map((row) => row.count)
    );
    // console.log(regression.toString(2));

    // add empty dates to the end of data
    data = Utils.padData(data, this.props.dateRange.end);

    // add trend and epoch to data
    data = data.map((row, i) => {
      row.trend = Math.round(regression.predict(i));
      return row;
    });

    // estimate when data will cross yMax
    let prediction = xSolve(data, this.props.yMax);
    if (prediction) data.push(prediction);

    return (
      <div className="flex my-3">
        <div className="mx-auto">
          <div className="pb-2 textLarger">
            {Utils.addCommas(this.props.yMax)} Cases
          </div>
          <LineChart
            width={this.props.width}
            height={this.props.height}
            data={data}
            margin={{
              top: 10,
              right: 0,
              left: 20,
              bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="epoch"
              angle={-90}
              textAnchor="end"
              domain={["dataMin", "dataMax"]}
              tick={{ dx: -6 }}
              tickFormatter={(epoch) => {
                let date = new Date(epoch);
                return Utils.displayDate(date);
              }}
              type="number"
              scale="time"
              interval="preserveStart"
            />
            <YAxis
              domain={[0, (dataMax) => this.props.yMax]}
              tickFormatter={(y) => Utils.addCommas(y)}
            />
            <Tooltip
              labelFormatter={(epoch) => {
                let date = new Date(epoch);
                return Utils.displayDate(date);
              }}
              formatter={(value) => Utils.addCommas(value)}
            />
            {!this.props.hideLegend && <Legend wrapperStyle={{ bottom: 10 }} />}
            <Line
              name="Trend"
              type="monotone"
              dataKey="trend"
              stroke={Colors.secondary}
              activeDot={{ r: 2 }}
              dot={{ r: 0 }}
              isAnimationActive={false}
            />
            <Line
              name="Cases"
              type="monotone"
              dataKey="count"
              stroke={Colors.primary}
              activeDot={{ r: 4 }}
              dot={<CustomDot dateRange={this.props.trendRange} />}
              isAnimationActive={false}
            />
            <Line
              name="Prediction"
              type="monotone"
              dataKey="prediction"
              stroke={Colors.secondary}
              activeDot={{ r: 6 }}
              dot={{ r: 3 }}
              isAnimationActive={false}
            />
          </LineChart>
        </div>
      </div>
    );
  }
}

export default LineGraph;

// solve regregression data for y
function xSolve(data, y) {
  let points = data.filter((row, i) => {
    return (
      (row.trend < y && data[i + 1] && data[i + 1].trend >= y) ||
      (row.trend > y && data[i - 1] && data[i - 1].trend <= y)
    );
  });
  if (!points.length) return false;

  points = points.map((row, i) => {
    return { x: row.epoch, y: row.trend };
  });

  // line formula: y = mx + b
  // solved for x: x = (y - b) / m
  let m = (points[1].y - points[0].y) / (points[1].x - points[0].x);
  let b = points[0].y - m * points[0].x;
  let x = Math.floor((y - b) / m);
  // console.log(`${x} = (${y} - ${b} / ${m})`);

  return {
    date: new Date(x),
    epoch: x,
    count: null,
    trend: null,
    prediction: y,
  };
}

function CustomDot(props) {
  const { cx, cy, stroke, strokeWidth, payload, value } = props;
  if (!value) return <svg />;

  let fill = "white";
  let r = 2.5;
  if (Utils.dateInRange(props.dateRange, payload.date)) {
    fill = stroke;
    r = 3;
  }

  return (
    <circle
      r={r}
      cx={cx}
      cy={cy}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
    />
  );
}
