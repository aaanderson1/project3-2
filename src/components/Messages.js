import React from 'react';
import Token from '../Token';
import MessageView from './MessageView';
import { Image, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import "materialize-css/dist/css/materialize.min.css";
import { Card, Row, Col, CardTitle, Parallax, Section} from "react-materialize";
import "./Messages.scss";
import Emoji from './emoji';


export default class Message extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            anon: {
                _id: "???????",
                avatar: "haha"
            },
            loading: true
        };
    }

    componentDidMount() {
        const token = new Token();

        if (token.token === null)
        {
            this.props.history.push("/");
            return;
        }
        this.login(token.token).then(() => this.getMessages());
        //set interval
    }

    login(token) {
        return fetch(`${window.location.origin.toString()}/api/anon/${token}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0 && data[0]._id === token) {
                console.log(data);
                this.setState({
                    anon: data[0]
                });
                setInterval(function(){ this.getMessages(); }.bind(this), 1000);
            } else {
                const token = new Token();
                token.saveToken(null);
                this.props.history.push("/");
            }
        }).catch(err => {
            const token = new Token();
            token.saveToken(null);
            this.props.history.push("/");
        });
    }

    getMessages() {
        return fetch(`${window.location.origin.toString()}/api/messages`)
        .then(response => response.json())
        .then(data => {
            data = data.reverse();
            console.log(data);
            this.setState({
                anon: this.state.anon,
                messages: data,
                loading: false
            });
        });
    }

    handleKeyPress(e) {
        if (e.charCode !== 13) {
            return;
        }
        const message = e.target.value;
        e.target.value = "";
        console.log(message);
        return fetch(`${window.location.origin.toString()}/api/message`, {
            method: 'POST',
            body: JSON.stringify({
                message: message,
                anon: this.state.anon._id,
                mood: this.state.anon.avatar
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            this.getMessages();
        }).catch(err => {
            console.log(err);
        });
    }

    deleteMessage(id) {
        return fetch(`${window.location.origin.toString()}/api/message/${id}/${this.state.anon._id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            this.getMessages();
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="dark" />
                </div>
            );
        }

          
        

        const image = require(`../assets/images/emojis/${this.state.anon.avatar}.png`);
        return (
<div>
            <Row>
                <Col m={12} s={12} l={12}>
                <Card header={<CardTitle />} actions={[<a />]}>
                        <Image className="avatar" src={image} responsive />

                                    
                        <InputGroup onKeyPress={this.handleKeyPress.bind(this)} className="mb-3">
                            
                            <InputGroup.Text>
                            What's on your mind?
                            </InputGroup.Text>
                            
                            <Emoji />
                            
                        </InputGroup>
                    
                </Card>
                </Col>
                </Row>
                
            <Row>
                <Col m={12} s={12} l={12}>
                {this.state.messages.map(message =>
                    <MessageView message={message} deleteCallback={this.deleteMessage.bind(this)} owned={this.state.anon._id === message.anon} />
                )}
                </Col>
                </Row>
                </div>
            
        );
    }
}