import React from 'react';
import { Button, Image, Card } from 'react-bootstrap';


export default class MessageView extends React.Component {
    render() {
        const image = require(`../assets/images/emojis/${this.props.message.mood}.png`);
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Image src={image} roundedCircle />{this.props.message.message}
                        {this.props.owned &&
                            <Button variant="outline-primary" onClick={() => this.props.deleteCallback(this.props.message._id)}>X</Button>
                        }
                    </Card.Body>
                </Card>
            </div>
        );
    }
}