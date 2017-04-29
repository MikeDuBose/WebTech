/**
 * Created by Michael DuBose on 4/24/2017.
 */

var PORT = 3000; //Declares which port we open on
var express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    MongoClient = require('mongodb').MongoClient,
    app = express();
var router = express.Router();
var connect = require("connect");
var url = 'mongodb://localhost:27017/users';








app.get('/', function(req, res){ //Sets our home page
    res.sendFile(path.join(__dirname + '/LoginMain.html'));
});

app.get('/myinfo.html', function(req, res){ //Allows user to visit /myinfo.html
    res.sendFile(path.join(__dirname + '/myinfo.html'));
});

app.get('/server.js', function(req, res){ //Allows user to visit /myinfo.html
    res.sendFile(path.join(__dirname + '/server.js'));
});

MongoClient.connect(url, function(err, db){ //Connects us to the mongo client

    var cursor = db.collection('users').find(); // Sets a cursor in collection "users"
    console.log("You have connected to your MongoDB database."); //Lets us know that we have connected to the server
    cursor.each(function(err, doc){ //Sends the cursor down the line
        console.log(doc); //Logs the information in the database
    });

    insertDocument(db, function() {
        db.close();
    });


    //db.close();
});

var insertDocument = function(db, callback){
    db.collection('users').insertOne({
        "homeAddress" : "123 West Street", "workAddress" : "456 East Street",

        }
        )
    };






app.listen(PORT); //Opens the server on the static variable PORT
console.log('Server listening on port ' + PORT); //Outputs to the console if we connected and to which port