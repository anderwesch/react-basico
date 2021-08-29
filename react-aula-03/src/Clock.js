import React from 'react';

class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = { date: new Date(), name: this.props.name, stoppedClock: false };
        this.handlerClick = this.handlerClick.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        console.log("mount component");
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.stoppedClock === true) return false;
        return true;
    }

    componentDidUpdate(nextProps, nextState) {
        console.log("update component " + nextState.stoppedClock);
    }

    componentWillUnmount() {
        clearInterval(this.timerID); 
        console.log("unmount component");
    }

    handlerClick() {
        this.setState((state) => {
            return { stoppedClock: !state.stoppedClock }
        });
    }

    render() {
        return (
            <div>
                <h1>Olá, {this.state.name}</h1>
                <h2>{ this.state.date.toLocaleTimeString() }</h2>
                <button onClick={this.handlerClick}>Stop</button>
            </div>
        );
    }
}

export default Clock;