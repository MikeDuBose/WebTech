/**
 * Created by Michael DuBose on 4/24/2017.
 */

var PORT = 3000; //Declares which port we open on
var express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    MongoClient = require('mongodb').MongoClient,
    app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var connect = require("connect");
var url = 'mongodb://localhost:27017/users';
var http = require('http').Server(app);
var io = require('socket.io')(http);
var userdb;


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){ //Sets our home page
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/myinfo.html', function(req, res){ //Allows user to visit /myinfo.html
    res.sendFile(path.join(__dirname + '/myinfo.html'));
});

app.get('/server.js', function(req, res){ //Allows user to visit /server.js
    res.sendFile(path.join(__dirname + '/server.js'));
});

app.get('/WeatherScript.js', function(req, res){ //Allows user to visit /WeatherScript.js
    res.sendFile(path.join(__dirname + '/WeatherScript.js'));
});

app.get('/stylesheet.css', function(req, res){ //Allows user to visit /stylesheet.css
    res.sendFile(path.join(__dirname + '/stylesheet.css'));
});

app.get('/LCD.ttf', function(req, res){ //Allows user to visit /LCD.ttf
    res.sendFile(path.join(__dirname + '/LCD.ttf'));
});

app.post('/user-profile', function(req,res){
    var id = Object.keys(req.body).toString();
    var userProfile = "";
    console.log(id);
    userdb.findOne({"gID": id}, function(err, doc) {
        userProfile = JSON.stringify(doc);
        console.log(userProfile);
        userdb.close();
    });
    //console.log(response);
    res.send("PROFILE_PLACEHOLDER");
    res.end();
});
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
app.get('/Img/outline2.png', function(req, res){
    res.sendFile(path.join(__dirname + '/Img/outline2.png'));
});
app.get('/Img/Clouds.png', function(req, res){
    res.sendFile(path.join(__dirname + '/Img/Clouds.png'));
});
app.get('/Img/of.png', function(req, res){
    res.sendFile(path.join(__dirname + '/Img/of.png'));
});
app.get('/Img/lightning.png', function(req, res){
    res.sendFile(path.join(__dirname + '/Img/lightning.png'));
});
app.get('/Img/raining.png', function(req, res){
    res.sendFile(path.join(__dirname + '/Img/raining.png'));
});
app.get('/Img/Sun.png', function(req, res){
    res.sendFile(path.join(__dirname + '/Img/Sun.png'));
});
app.get('/Img/close.png', function(req, res){
    res.sendFile(path.join(__dirname + '/Img/close.png'));
});
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////


MongoClient.connect(url, function(err, db){ //Connects us to the mongo client
    userdb = db.collection('users');
    userdb.close = function(){db.close()};
    var cursor = db.collection('users').find(); // Sets a cursor in collection "users"
    console.log("You have connected to your MongoDB database."); //Lets us know that we have connected to the server
    cursor.each(function(err, doc){ //Sends the cursor down the line
        console.log(doc); //Logs the information in the database
    });
    //db.close();
});
app.post('/', function(req, res) {
    console.log('idField:' + req.body.idField);
    console.log('workAddress: ' + req.body.workAddress);
    console.log('homeAddress: '+ req.body.homeAddress);
    //userdb
    userdb.findOneAndReplace({"gID": req.body.idField}, {
        "gID": req.body.idField, "homeAddress": req.body.workAddress, "workAddress": req.body.homeAddress
    }).then(function (val) {
        if (val["lastErrorObject"]["updatedExisting"] === false){
            userdb.insertOne({"gID": req.body.idField}, {
                "gID": req.body.idField, "homeAddress": req.body.workAddress, "workAddress": req.body.homeAddress
            });
            userdb.close();
        } else userdb.close();
    }, function () {
        console.log('handled');
    });
    res.redirect('back');
    //  userdb.insertOne(
    //);
});

app.listen(PORT); //Opens the server on the static variable PORT
console.log('Server listening on port ' + PORT); //Outputs to the console if we connected and to which port