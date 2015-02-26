'use strict';

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use( bodyParser.json() );

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

app.get('/', function (request, response) {
  response.render('index');
});

var Commands = require('./models/commands');
var Robot    = require('./models/robot');
var robot    = Robot();

app.post('/commands', function(request, response) {
  console.log(request.body);

  Commands(request.body).execute(robot);

  response.json({
    ok: true
  });
});

app.listen(3000);
console.log('ROBOTz-web running on port 3000');
