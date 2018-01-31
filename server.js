const express = require('express');
const sqlite = require('sqlite3');
const bodyParser = require('body-parser');
var cors = require('cors')

var db = new sqlite.Database("../KSITweeter/cllrs.db");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 8000;

require('./app/routes')(app, db);


var server = app.listen(port, function() {
	  console.log('We are live on ' + port);
});
