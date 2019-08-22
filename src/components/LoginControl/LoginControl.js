import React from 'react';
import Token from '../../Token';
import { Button, Image } from 'react-bootstrap';
import "../style.css";

const avatars = ["grinning",
"neutral",
"rolling", 
"slightly", 
"sunglasses", 
"thinking",
"avocado",
"blushing",
"butterfly",
"caterpillar",
"clapping",
"cookie",
"eyebrow-raised",
"fire",
"firework-sparkler",
"flag",
"floppy-disk",
"ghost",
"graduation-cap",
"grinning-face-with-smiling-eyes",
"grinning-face-with-star-eyes",
"grinning",
"guitar",
"hourglass",
"key",
"light-bulb",
"man-mage",
"maple-leaf",
"mobile-phone",
"monocle",
"music",
"nerd",
"neutral",
"newspaper",
"notebook",
"pineapple",
"poo",
"pretzel",
"prideflag",
"pushpin",
"relieved",
"rocket",
"rolling",
"ship",
"shocked",
"skateboard",
"slightly",
"snowflake",
"speaking",
"star",
"stopwatch",
"sunglasses",
"tears-of-joy",
"thinking",
"tropical-fish",
"turtle",
"umbrella",
"unicorn-fae",
"upside-down",
"victory-hand",
"waving-hand",
"zanyface",
"zipper-mouth",
"ship",
"videocassette",
"wave",
"waving-hand",
];

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
                <Image className="avatar" src={image} responsive />
                <Button variant="outline-primary" onClick={() => this.login()}>Login</Button>
            </div>
        );
    }
}