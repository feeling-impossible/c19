import React from "react";
import Utils from "../Utils";
// import Colors from "../config/Colors";

class CountryMenu extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    // console.log(e.target.textContent);
    this.props.save(e.target.textContent);
  }
  render() {
    let data = this.props.data.slice();
    let countries = [...new Set(data.map((row) => row.country))];

    countries = countries.map((name) => {
      return {
        name: name,
        count: data
          .filter((row) => row.country === name)
          .map((row) => row.cases[row.cases.length - 1].count)
          .reduce((t, n) => t + n),
      };
    });
    // console.log(countries);

    countries.sort((a, b) => b.count - a.count);

    return (
      <div className="pl-4">
        <table>
          <tbody>
            {countries.map((row, i) => {
              return (
                <tr key={i}>
                  <td className="px-2 textRight">
                    {Utils.addCommas(row.count)}
                  </td>
                  <td className="px-2">
                    <div className="countryName pointer" onClick={this.onClick}>
                      {row.name}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CountryMenu;
