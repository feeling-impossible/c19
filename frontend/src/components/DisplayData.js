import React from "react";
import Utils from "../Utils";
import Colors from "../config/Colors";

class DisplayData extends React.Component {
  render() {
    let data = this.props.data.slice().reverse();

    let cols = [
      { name: "displayDate", label: "Date", pad: 1 },
      { name: "count", label: "Total Cases", pad: 3 },
      { name: "new", label: "New Cases", pad: 3 },
      { name: "change", label: "% Change", pad: 4 },
    ];
    return (
      <div className="flex">
        <table className="mx-auto">
          <tbody>
            <tr
              className={`border-bottom${
                !this.props.textSmaller ? " textLarger" : ""
              }`}
            >
              {cols.map((col, i) => (
                <td key={i} className="px-1 nowrap">
                  {col.label}
                </td>
              ))}
            </tr>
            {data.map((row, i) => {
              let color = Utils.dateInRange(this.props.trendRange, row.date)
                ? Colors.primary
                : "black";
              return (
                <tr key={i} style={{ color: color }}>
                  {cols.map((col, i) => {
                    return (
                      <td key={i} className={"text-right pr-" + col.pad}>
                        {i ? Utils.addCommas(row[col.name]) : row[col.name]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DisplayData;
