import React from 'react';
import Token from '../../Token';
import { Button, Image } from 'react-bootstrap';

const avatars = ["grinning", "neutral", "rolling", "slightly", "sunglasses", "thinking"];

export default class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: avatars[Math.floor(Math.random() * avatars.length)]
        };

        this.login = this.login.bind(this);
    }

    componentDidMount() {
        const token = new Token();

        if (token.token !== null)
        {
            this.props.onComplete();
            return;
        }
    }

    login() {
        return fetch(`${window.location.origin.toString()}/api/anon`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const token = new Token();
            token.saveToken(data._id);
            this.props.onComplete();
        }).catch(err => {
            this.props.onComplete(err);
        });
    }

    render() {
        const image = require(`../../assets/images/emojis/${this.state.avatar}.png`);
        return (
            <div>
                <Image src={image} roundedCircle />
                <Button variant="outline-primary" onClick={() => this.login()}>Login</Button>
            </div>
        );
    }
}