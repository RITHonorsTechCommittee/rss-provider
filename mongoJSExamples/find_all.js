var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err; // Ensures it is connected 
  var dbo = db.db("RSSFeed"); // Opens database
  dbo.collection("RSSData").find({}).project({_id: 0}).toArray(function(err, result) { // Finds all items in collection, excludes id field, and turns to array
    if (err) throw err;
    console.log(result); // Prints results
    db.close();
  });
});