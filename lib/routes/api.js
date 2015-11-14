var express = require('express'),
    trends = require('../trends.js'),
    Parse = require('parse').Parse,
    api = express.Router(),
    Article = Parse.Object.extend("Article"),
    feed = require('../feed.js'),
    config = require('../config');

// Initalize parse
Parse.initialize(config.PARSE_MASTER_KEY, config.PARSE_JS_KEY);

// Login Call
api.post('/login.json', function (req, res) {
    Parse.User.logIn(req.body.username, req.body.password, {
        success: function (user) {
            // Do stuff after successful login.
            res.contentType('json');
            res.send(user);
        },
        error: function (user, error) {
            // The login failed. Check error to see why.
            console.log(user);
            res.send(error.code);
        }
    });
});

// Sign up
api.post('/sign-up.json', function (req, res) {
    var user = new Parse.User();

    user.set("username", req.body.username);
    user.set("password", req.body.password);
    user.set("email", req.body.email);
    user.set("displayName", req.body.displayName);

    user.signUp(null, {
        success: function (user) {
        // Hooray! Let them use the app now.
            res.contentType('json');
            res.send(user);
        },
        error: function (user, error) {
            // Show the error message somewhere and let the user try again.
            res.send(error.code);
            console.log("Error: " + error.code + " " + error.message + " " + user);
        }
    });

});

// Get current user
api.get('/current-user.json', function (req, res) {
    if (req) {
        try {
            res.contentType('json');
            res.send(Parse.User.current());
        } catch (e) {
            res.send(500);
        }
    }
});

// Logout
api.post('/logout.json', function (req, res) {
    if (req) {
        try {
            Parse.User.logOut();
            res.send(200);
        } catch (e) {
            res.send(500);
        }
    }
});

// Get trends call
api.post('/get-trends.json', function (req, res) {
    trends.getLocalTrends(req.body.lat, req.body.lon, function (data) {
        res.contentType('json');
        res.send(data[0]);
    });
});

// Create new post
api.post('/submit-article.json', function (req, res) {

    var article = new Article();

    article.set("title", req.body.title);
    article.set("byline", Parse.User.current().get("displayName"));
    article.set("body", req.body.body);
    article.set("votes", 0);
    article.set("contributors", []);

    article.save(null, {
        success: function (article) {
            // Execute any logic that should take place after the object is saved.
            res.contentType('json');
            res.send(article);
            console.log('New object created with objectId: ' + article.id);
        },
        error: function (article, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and description.
            console.log('Failed to create new object, with error code: ' + error.message + article);
            res.send(error.code);
        }
    });
});

// Get all flux votes
api.get('/flux-articles.json', function (req, res) {

    var query = new Parse.Query(Article);

    // Make sure they are in correct vote range
    query.lessThan("votes", 5).greaterThanOrEqualTo("votes", -3).descending("votes");

    query.find({
        success: function (articles) {
            res.contentType('json');
            res.send(articles);
        },
        error: function (error) {
            res.send(error.code);
            console.log("Error: " + error.code + " " + error.message);
        }
    });
});

// Get all posts to display
api.get('/recent-articles.json', function (req, res) {

    var query = new Parse.Query(Article);

    // Make sure they are in correct vote range
    query.greaterThanOrEqualTo("votes", 5).descending("votes");

    query.find({
        success: function (articles) {
            res.contentType('json');
            res.send(articles);
        },
        error: function (error) {
            res.send(error.code);
            console.log("Error: " + error.code + " " + error.message);
        }
    });
});

// Edit post
api.post('/edit-article.json', function (req, res) {
    var query = new Parse.Query(Article),
        currentUser = Parse.User.current(),
        currentDisplay,
        contributors;

    if (currentUser) {

        query.get(req.body.id, {
            success: function (article) {
                // The object was retrieved successfully.

                article.set("body", req.body.body);

                /*contributors = article.get("contributors");
                currentDisplay = Parse.User.current().get("displayName");

                if (!contributors[currentDisplay] && article.get("byline") !== currentDisplay) {
                    contributors.push(currentDisplay);
                }*/

                article.save();
                res.send(article);
            },
            error: function (error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.   
                res.send(error.code);
            }
        });
    } else {
        res.send(403);
    }    
});

// Vote up
api.post('/vote-up.json', function (req, res) {

    var query = new Parse.Query(Article),
        currentUser = Parse.User.current();

    if (currentUser) {

        query.get(req.body.id, {
            success: function (article) {
                // The object was retrieved successfully.
                article.increment("votes");
                article.save();

                if (article.get("votes") >= 5) {

                    // publish to feed
                    feed.item({
                        title:  article.get("title"),
                        description: article.get("body").split(".")[0], // Take first sentence
                        url: 'http://openwi.re/wire/' + article.get("title").replace(/ /g, "_"), // link to the item
                        guid: article.get("objectId"), // optional - defaults to url
                        author: article.get("byline") + " " + "openwi.re contributors", // optional - defaults to feed author property
                        date: article.get("updatedAt") // any format that js Date can parse.
                    });

                    // Tell client to reload list
                    //article.reload = true;
                }

                res.send(article);
            },
            error: function (error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.
                res.send(error.code);
            }
        });
    } else {
        res.send(403);
    }
});

// Vote up
api.post('/vote-down.json', function (req, res) {

    var query = new Parse.Query(Article),
        currentUser = Parse.User.current();

    if (currentUser) {

        query.get(req.body.id, {
            success: function (article) {
                // The object was retrieved successfully.
                article.set("votes", article.get("votes") - 1);
                article.save();

                res.send(article);
            },
            error: function (error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.
                res.send(error.code);
            }
        });
    } else {
        res.send(403);
    }
});

module.exports = api;