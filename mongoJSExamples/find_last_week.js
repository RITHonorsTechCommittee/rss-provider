var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err; // Ensures it is connected 
  var dbo = db.db("RSSFeed"); // Opens database
  dbo.collection("RSSData").find({'pubDate': {$gte: new Date((new Date().getTime()-(7*24*60*60*1000)))}}).project({_id: 0}).toArray(function(err, result) { // Finds all items newer than 1 week, excludes id field, and turns to array
    if (err) throw err;
    console.log(result); // Prints results
    db.close();
  });
});