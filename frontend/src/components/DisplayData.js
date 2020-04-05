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
          <tbody>
            <tr className="border-bottom">
              {cols.map((col, i) => (
                <td key={i} className="pr-3 nowrap text-right textLarger">
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
