import React from 'react';
import { Button, Image, Card } from 'react-bootstrap';
import "./style.css";
import Countdown from "./Countdown";


export default class MessageView extends React.Component {
    render() {
        const image = require(`../assets/images/emojis/${this.props.message.mood}.png`);
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Image className="avatar" src={image} responsive />{this.props.message.message}
                        {this.props.owned &&
                            <Button variant="outline-primary" onClick={() => this.props.deleteCallback(this.props.message._id)}>X</Button>
                        }
                        <Countdown timeLength="60" startTime={this.props.message.created} /> 
                    </Card.Body>
                </Card>
            </div>
        );
    }
}