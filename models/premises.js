var mongoose = require('mongoose');
var db = require('../db');

// Connect to DB
//mongoose.connect(dbConfig.url);


// Create new premises
exports.create = function(body,callback){
        // Set our internal DB variable
    // Get our form values. These rely on the "name" attributes
    var userid = body.userid;
    console.log("Adding a premise for user " + userid);
    var postcode = body.postcode;
    var line1 = body.line1;
    var line2 = body.line2;
    var line3 = body.line3;
    var town = body.town;
    var county = body.county;
    console.log("post code is " + postcode)
    // Set our collection
    var collection = db.get('Premises');

    // Submit to the DB
    collection.insert({
        "userid" : userid,
        "postcode" : postcode,
        "line1" : line1,
        "line2" : line2,
        "line3" : line3,
        "town" : town,
        "county" : county
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("/premises");
        }
    });
}