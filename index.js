'use strict';

var express = require('express'),
    trends = require('./lib/trends'),
    config = require('./lib/config'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser());
app.use('/api', require('./lib/routes/api.js'));
app.use('/rss', require('./lib/routes/rss.js'));
app.use('/wire', require('./lib/routes/wire.js'));

app.listen(Number(process.env.PORT || config.port), function () {
    console.log('Openwire running on port ' + config.port);
});
