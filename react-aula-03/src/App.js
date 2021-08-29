import React from 'react';
import PomodoroClock from "./PomodoroClock";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { visible: true };
    this.handlerClick = this.handlerClick.bind(this);
  }

  handlerClick() {
    this.setState((state) => {
        return { visible: !state.visible }
    });
  }

  render() {
    return (
      <div>
        <PomodoroClock />
      </div>
    );
  }
}

export default App;
