var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("RSSFeed");
  dbo.collection("RSSData").find({}, { _id: 0, title: 1 }).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});