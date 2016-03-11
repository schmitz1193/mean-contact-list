'use strict'
const express = require('express');
const app = express();

// app.get('/', function (req,res) {
//   res.send('help - does anybody care?')
// });

// static means -html,.js, and css files,dont change dynamically as we use our app
// tells server where to look to find them
app.use(express.static(__dirname + '/public'));

app.listen(3000);
console.log('Server running on port 3000');
