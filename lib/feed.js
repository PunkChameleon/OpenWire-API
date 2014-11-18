var RSS = require('rss'),
    express = require('express'),
    rss = express.Router();

module.exports = new RSS({
    title : "openwi.re news feed",
    description : "official news feed of openwi.re generated content",
    generator : "http://openwi.re/",
    author : "OpenWire",
    feed_url : "http://openwi.re/feed/",
    site_url : "http://openwi.re/"
});