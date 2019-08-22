const htmlRoutes = require('./app/routing/htmlRoutes.js');
const apiRoutes = require('./app/routing/apiRoutes.js');
var mongoose = require("mongoose");
const socketio = require('socket.io');
const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const session = require('express-session');

const PORT = process.env.PORT || 8080

const app = express();

const server = http.createServer(app);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('build'));
//connect handlebars to express app
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
apiRoutes.getMessageRoute(app);
apiRoutes.getAnonRoute(app);
htmlRoutes.homeRoute(app);
setInterval(() => apiRoutes.deleteOldStuff((err) => {
    console.log(err);
}), 1000);
//if deployed use the deployed database, otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//connect mongoose to our database
mongoose.connect(db, { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
 }, function(error){
    //log any errors connecting with mongoose
    if (error) {
        console.log(error);
    }
    //or log a success message
    else {
        console.log("mongoose connection is successful");
    }
});


server.listen(process.env.PORT || 8080, () => {
    console.log('listening...')
  })
