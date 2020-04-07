import React from "react";
import Utils from "../Utils";
import Colors from "../config/Colors";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    this.props.save(e.target.textContent);
  }
  render() {
    let data = this.props.data.slice();
    data = data.map((row) => {
      return {
        name: row.country,
        count: row.cases[row.cases.length - 1].count,
      };
    });
    data.sort((a, b) => b.count - a.count);

    return (
      <div
        className="flex"
        style={{
          position: "fixed",
          width: this.props.width + "em",
          height: "100%",
          zIndex: 2,
        }}
      >
        <MenuToggle
          toggle={this.props.toggle}
          toggleWidth={this.props.toggleWidth}
        />
        <div
          className="pl-3 pr-1 grow"
          style={{
            overflowY: "scroll",
            display: this.props.show ? "block" : "none",
            backgroundColor: Colors.offWhite,
          }}
        >
          <table className="my-4">
            <tbody>
              {data.map((row, i) => {
                let styles = {
                  count: {
                    color: "black",
                    backgroundColor: Colors.offWhite,
                    border: "1px solid " + Colors.offWhite,
                  },
                  name: {
                    color: Colors.primary,
                    backgroundColor: Colors.offWhite,
                    border: "1px solid " + Colors.offWhite,
                  },
                };
                if (row.name === this.props.selected) {
                  styles = {
                    count: {
                      color: "white",
                      backgroundColor: Colors.primary,
                      border: "1px solid " + Colors.lightGrey,
                    },
                    name: {
                      color: "white",
                      backgroundColor: Colors.primary,
                      border: "1px solid " + Colors.lightGrey,
                    },
                  };
                }

                return (
                  <tr key={i}>
                    <td>
                      <div
                        className={"px-2 rounded textRight"}
                        style={styles.count}
                      >
                        {Utils.addCommas(row.count)}
                      </div>
                    </td>
                    <td>
                      <div
                        className={"px-2 rounded pointer countryName"}
                        style={styles.name}
                        onClick={this.onClick}
                      >
                        {row.name}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Menu;

let MenuToggle = function (props) {
  return (
    <div
      className="pt-4 px-0 pointer"
      style={{
        width: props.toggleWidth + "em",
        color: "white",
        backgroundColor: Colors.primary,
      }}
      onClick={props.toggle}
    >
      <div
        className="mt-3"
        style={{ transform: "rotate(-90deg)", lineHeight: "1em" }}
      >
        Menu
      </div>
    </div>
  );
};
