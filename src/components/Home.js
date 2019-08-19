import React from 'react';
import Token from '../Token';
import "./Home.css";

// Home checks if your token is valid and forwards to messages page or login if your token is no longer valid.
export default class Home extends React.Component {
    componentDidMount() {
        const token = new Token();

        if (token.token === null)
        {
            this.props.history.push("login");
            return;
        }

        fetch(`${window.location.origin.toString()}/api/anon/${token.token}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0 && data[0]._id === token.token) {
                console.log(data);
                this.props.history.push("messages");
            } else {
                this.props.history.push("login");
            }
        });
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}
