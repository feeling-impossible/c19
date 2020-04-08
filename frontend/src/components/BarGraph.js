import React from "react";
import Utils from "../Utils";
import Colors from "../config/Colors";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  // CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

class BarGraph extends React.Component {
  render() {
    let data = this.props.data.slice();

    // add empty dates to the end of data
    data = Utils.padData(data, this.props.dateRange.end);

    return (
      <div className="flex my-3">
        <div className="mx-auto">
          <div className="pb-2 textLarger textCenter">{this.props.name}</div>
          <BarChart
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
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis
              dataKey="epoch"
              angle={-90}
              textAnchor="end"
              tick={{ dx: -6 }}
              tickFormatter={(epoch) => {
                let date = new Date(epoch);
                return Utils.displayDate(date);
              }}
              scale="time"
              interval="preserveStart"
            />
            <YAxis tickFormatter={(y) => Utils.addCommas(y)} />
            <Tooltip
              labelFormatter={(epoch) => {
                let date = new Date(epoch);
                return Utils.displayDate(date);
              }}
              formatter={(value) => Utils.addCommas(value)}
            />
            {!this.props.hideLegend && <Legend wrapperStyle={{ bottom: 10 }} />}
            <Bar
              name={this.props.name}
              dataKey={this.props.dataKey}
              fill={Colors.primary}
            />
          </BarChart>
        </div>
      </div>
    );
  }
}

export default BarGraph;
