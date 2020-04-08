import React from "react";
import Utils from "../Utils";
import Colors from "../config/Colors";

class Picker extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    let value = parseInt(e.target.textContent.replace(/,/g, ""));
    this.props.save(value);
  }
  render() {
    let { values, selected } = this.props;
    return (
      <div className="mt-2 mb-4 ml-1">
        <div className="mb-1 textLarger textCenter">Scale</div>
        <div className="flex">
          <div className="flex flexRow mx-auto">
            {values.map((value, i) => {
              let color = "black";
              let bgColor = Colors.lightGrey;
              // console.log(value, "===", selected, value === selected);
              if (value === selected) {
                color = "white";
                bgColor = Colors.primary;
              }
              return (
                <div
                  key={i}
                  className="mr-1 my-2 px-1 border rounded pointer textNormal"
                  style={{ backgroundColor: bgColor, color: color }}
                  onClick={this.onClick}
                >
                  {Utils.addCommas(value)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Picker;
