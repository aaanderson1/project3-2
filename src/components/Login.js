import React from 'react';
import Token from '../Token';
import LoginControl from './LoginControl/LoginControl';

export default class Login extends React.Component {
    componentDidMount() {
        const token = new Token();

        if (token.token !== null)
        {
            this.props.history.push("/");
            return;
        }
    }

    onComplete(err) {
        if (err)
        {
            console.log(err);
            const token = new Token();
            token.saveToken(null);
        }
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <LoginControl
                    onComplete={this.onComplete.bind(this)}
                />
            </div>
        );
    }
}