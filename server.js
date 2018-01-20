const express = require('express');
const sqlite = require('sqlite3');
const bodyParser = require('body-parser');

var db = new sqlite.Database("../KSITweeter/cllrs.db");

const app = express();


const port = 8000;

require('./app/routes')(app, db);


var server = app.listen(port, function() {
	  console.log('We are live on ' + port);
});
