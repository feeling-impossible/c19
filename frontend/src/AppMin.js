import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("App constructor");
  }
  render() {
    console.log("App");
    return <div>App</div>;
  }
}

let AppMin = function () {
  console.log("AppMin");
  return <App />;
};

export default AppMin;
