var express = require('express'),
    rss = express.Router(),
    feed = require('../feed.js');

rss.get('/index.xml', function (req, res) {
    res.send(feed.xml());
});

module.exports = rss;