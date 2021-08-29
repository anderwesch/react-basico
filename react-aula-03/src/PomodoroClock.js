import React from "react";

class PomodoroClock extends React.Component {

    constructor(props) {
        super(props);
        this.workSessionTime = 30 * 60;
        this.intervalSessionTime = 5 * 60;
        this.state = { clock: this.workSessionTime, stopped: false }
        this.stopped = false;
        this.handlePause = this.handlePause.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(), 
            1000
        );
    }

    componentDidUpdate() {
        const remainingTime = this.state.clock;
        const intervalTime = this.intervalSessionTime;
        
        if (remainingTime === intervalTime) {
            this.pauseCountDown();
        }
    }

    startCountDown() {
        this.setState({
            stopped: false
        });
        this.timerID = setInterval(
            () => this.tick(), 
            1000
        );
    }

    pauseCountDown() {
        this.setState({
            stopped: true
        });
        clearInterval(this.timerID);
    }

    resetCountDown() {
        this.setState({
            clock: this.workSessionTime
        })
    }

    tick() {
        this.setState((state) => {
            return { clock: state.clock - 1 }
        });
    }

    getClock() {
        const timeLeft = this.state.clock;
        const minTimeLeft = Math.floor(timeLeft / 60);
        const secTimeLeft = timeLeft - minTimeLeft * 60;
        return minTimeLeft + ":" + secTimeLeft.toString().padStart("2", "0");
    }

    handlePause() {
        if (this.stopped !== false) {
            this.startCountDown();
        } else {
            this.pauseCountDown();
        }
    }

    handleReset() {
        this.resetCountDown();
    }

    render() {
        return (
            <div>
                <h2>{ this.getClock() }</h2>
                <button onClick={this.handlePause}>{ this.state.stopped ? "Resume" : "Pause" }</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        );
    }

}

export default PomodoroClock;