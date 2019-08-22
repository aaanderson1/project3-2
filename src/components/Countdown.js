import React from 'react';
import { Button, Image, Card } from 'react-bootstrap';
import "./style.css";


export default class Countdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            seconds: 0
        };
    }

    componentDidMount() {
        this.update();
        if (!!this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.interval = setInterval(this.update.bind(this), 500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.interval = null;
        this.setState({seconds: this.props.timeLength});
    }


    update() {
        let startTime = new Date(this.props.startTime).getTime();
        const beforeSeconds = this.state.seconds;
        const now = Date.now();
        const seconds = Math.floor((now-startTime) / 1000.0);
        let value = this.props.timeLength-seconds;
        if (value < 0) {
            value = 0;
        }
        this.setState({seconds: value});
        if (beforeSeconds !== value && value === 0) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    render() {
        return (
            <div>
                {this.state.seconds}
            </div>
        );
    }
}