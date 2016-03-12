'use strict'
const express = require('express');
const app = express();
const mongojs = require('mongojs');
//tells which db and collect we are using
const db = mongojs('contactlist', ['contactlist']);
const bodyParser = require('body-parser');

// app.get('/', function (req,res) {
//   res.send('help - does anybody care?')
// });

// static means -html,.js, and css files,dont change dynamically as we use our app
// tells server where to look to find them
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// tells the server to listen for the get request and log the message in the command prompt
app.get('/contactlist', function(req,res){
  console.log("I received a GET request")
  db.contactlist.find(function(err,docs) {
    console.log('get request', docs);
    //have server interact with mongo, find data from contactList db and collection
    //docs means it will respond with the documents from db (e.g. the contacts)
    //json is the format the data is in and responds to the res.send we are  requesting the data back in json format
    res.json(docs);
  });

  app.post('/contactlist', function(req,res){
    console.log("post request", req.body);

    //insert into mongodb
    //doc is the item we are posting
    db.contactlist.insert(req.body, function(err,doc){

      //in addition to posting, send data back to ctrlr on callback
      res.json(doc);
    });

  });

  //  const person1 = {
  //     name: 'Tim',
  //     email: 'tim@email.com',
  //     number: '(111) 111-111'
  //   };
  // const person2 = {
  //     name: 'Emily',
  //     email: 'emily@email.com',
  //     number: '(222) 222-2222'
  //   };
  // const person3 = {
  //     name: 'John',
  //     email: 'john@email.com',
  //     number: '(333) 333-3333'
  //   };

  //   const contactlist = [person1, person2, person3];


});

app.listen(3000);
console.log('Server running on port 3000');
