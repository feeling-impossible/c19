import React from "react";
import Utils from "../Utils";
import Colors from "../config/Colors";

class DisplayData extends React.Component {
  render() {
    let data = this.props.data.slice().reverse();

    let cols = [
      { name: "displayDate", label: "Date", pad: 3 },
      { name: "count", label: "Total Cases", pad: 4 },
      { name: "new", label: "New Cases", pad: 4 },
      { name: "change", label: "% Change", pad: 5 },
    ];
    return (
      <div className="flex pl-5">
        <table className="mx-auto">
          <tr className="border-bottom">
            {cols.map((col, i) => (
              <td className="text-right pr-3" style={{ fontSize: "110%" }}>
                {col.label}
              </td>
            ))}
          </tr>
          {data.map((row) => {
            let color = Utils.dateInRange(this.props.trendRange, row.date)
              ? Colors.primary
              : "black";
            return (
              <tr style={{ color: color }}>
                {cols.map((col, i) => {
                  return (
                    <td className={"text-right pr-" + col.pad}>
                      {i ? Utils.addCommas(row[col.name]) : row[col.name]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

export default DisplayData;
