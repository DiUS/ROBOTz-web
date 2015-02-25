'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

app.get('/', function (request, response) {
  response.render('index');
});

app.listen(3000);