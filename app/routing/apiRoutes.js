// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");
// Require all models
var db = require("../models");
const moment = require('moment');

//list of bad words
const badWords = [
    "shit",
    "fuck",
    "suck",
    "sucks",
    "twat",
    "damn",
    "asshole",
    "fart",
    "queef",
    "sh*t",
    "bitch",
    "fucker",
    "hate",
    "stupid",
    "ass",
    "retarded",
    "shart",
    "blart",
    "69",
    "cyber",
    "420",
    "homo",
    "pussy",
    "dick",
    "shlong",
    "wang",
    "wong",
    "retard",
    "fucking",
    "cunt",
    "blunt",
    "poop"
];
const replacementEmojis = [
    "🤬",
    "❌",
    "🙈",
    "🙉",
    "🙊"];

const replaceBadWord = (word) => {
    for (const badWord of badWords){
        if (word.includes(badWord)){
            const emojis = [];
            for (let i = 0; i<word.length; ++i){
                emojis.push(replacementEmojis[Math.floor(Math.random() * replacementEmojis.length)])
            }
            return emojis.join("");
        }
    }
    return word;
};

const sanitize = (inputString) => {
    const words = inputString.split(" ");
    for(const [index, word] of words.entries()){
        words[index] = replaceBadWord(word);
    }
    return words.join(" ");
};

module.exports = {};

module.exports.deleteOldStuff = (callback) => {
    let current = moment().subtract(60, 'seconds');
    current = moment.utc(current).format();

    db.Message.deleteMany({
        'created': {'$lt' : current}
    })
    .then(function () {
        callback("deleted old messages");
    })
    .catch(function (err) {
        callback(err);
    });
    
    current = moment().subtract(60, 'minutes');
    current = moment.utc(current).format();
    db.Anon.deleteMany({
        'created': {'$lt' : current}
    })
    .then(function () {
        callback("deleted old anons");
    })
    .catch(function (err) {
        callback(err);
    });
};

module.exports.getMessageRoute = (app) => {
    app.get('/api/messages', (req, res) => {
        const data = req.query;
        console.log(data);
        res.setHeader('Content-Type', 'application/json');
        db.Message.find({})
            .then(function (dbMessages) {
                // If we were able to successfully find Messages, send them back to the client
                res.json(dbMessages);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });
    app.post('/api/message', (req, res) => {
        console.log(req);
        const data = req.body;
        data.created = moment().format();
        data.message = sanitize(data.message);
        db.Message.create(data)
            .then(function (dbGift) {
                res.json(dbGift);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });
    app.delete('/api/message/:id/:anonId', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        db.Message.deleteOne({
                _id: req.params.id,
                anon: req.params.anonId
            })
            .then(function () {
                res.json("{}");
            })
            .catch(function (err) {
                res.json(err);
            });
    });
};

module.exports.getAnonRoute = (app) => {
    app.get('/api/anon/:id', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        db.Anon.find({
                _id: req.params.id
            })
            .then(function (dbAnon) {
                res.json(dbAnon);
            })
            .catch(function (err) {
                res.json({});
            });
    });

    app.post('/api/anon/', (req, res) => {
        const data = req.body;
        data.created = moment().format();
        db.Anon.create(data)
            .then(function (dbAnon) {
                res.json(dbAnon);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
};