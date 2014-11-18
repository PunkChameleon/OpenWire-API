var express = require('express'),
    Parse = require('parse').Parse,
    wire = express.Router(),
    Article = Parse.Object.extend("Article");

wire.get('/:article', function (req, res) {

    var query = new Parse.Query(Article);

    // Make sure they are in correct vote range
    query.equalTo("title", req.params.article.replace(/_/g, " ")).greaterThanOrEqualTo("votes", 5);

    query.find({
        success: function (articles) {
            // For now, just send back 
            res.contentType('json');
            res.send(articles);
        },
        error: function (error) {
            res.send(error.code);
            console.log("Error: " + error.code + " " + error.message);
        }
    });

    //var stream = mu.compileAndRender(doc.theme, doc);
    //stream.pipe(res);
    //res.redirect('/index.html')

});

module.exports = wire;