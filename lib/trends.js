var Twitter = require('ntwitter'),
    config = require('./config'),
    twit = new Twitter({
        consumer_key: config.TWITTER_CONSUMER_KEY,
        consumer_secret: config.TWITTER_CONSUMER_SECRET,
        access_token_key: config.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET
    });

module.exports = {
    getLocalTrends : function (lat, lon, callback) {

        if (!lat || !lon) { return 'Pass lat and long'; }

        twit.getWoeID(lat, lon, function (err, data) {
            if (err) { return err; }
            twit.getTrendsWithId(data[0].woeid, {}, function (err, trendData) {
                if (err) { return err; }
                callback(trendData);
            });
        });
    }
};
