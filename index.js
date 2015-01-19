'use strict';

var express = require('express'),
    trends = require('./lib/trends'),
    config = require('./lib/config'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser());

// Set up to allow CORS. Still in progress.

app.use(function(req, res, next) {
	// Allow cross origin
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/api', require('./lib/routes/api.js'));
app.use('/rss', require('./lib/routes/rss.js'));
app.use('/wire', require('./lib/routes/wire.js'));

app.listen(Number(process.env.PORT || config.port), function () {
    console.log('Openwire running on port ' + config.port);
});
