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

//test the server
//==========================================
        //check that server is running
          //when index file is requested, send hello world response to page
        // app.get('/', function( req, res){
        //  res.send("hello world, from server.js");
        // });
//==========================================


// tells the server which template to use as the index & to listen for the get request and log the message in the command prompt
app.get('/contactlist', function(req,res){
  console.log("I received a GET request")
  db.contactlist.find(function(err,docs) {
    console.log('get request', docs);
    //have server interact with mongo, find data from contactList db and collection
    //docs means it will respond with the documents from db (e.g. the contacts)
    //json is the format the data is in and responds to the res.send we are  requesting the data back in json format
    res.json(docs);
  });
});

//POST - place the new contact in the db
app.post('/contactlist', function(req,res){
  console.log("post request", req.body);

  //insert into mongodb
  //doc is the item we are posting
  db.contactlist.insert(req.body, function(err,doc){

    //in addition to posting, send data back to ctrlr on callback
    res.json(doc);
  });

});


  // use to test before db was created
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


//DELETE request
app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  // "id" -which contact has been selected to be deleted by getting from req.params.id.  Then the db remove finds the record with the corresponding _id
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});


//GET select something we want to change and get that  record to put in input fields
app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  //using req.params.id from client and matching to _id to find right contact to modify
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

//PUT the change to the contact into the correct place on the db
app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  //using the req.params.id from client match _id in mongo to record you want to update. Pu the changed datat from req.body into the db vaiable names
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {
      name: req.body.name,
      email: req.body.email,
      number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});


app.listen(3000);
console.log('At your service on port 3000');
