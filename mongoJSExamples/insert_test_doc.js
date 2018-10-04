var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("RSSFeed"); // Opens database
  var myobj = { title: "Inserted Document", link: "test.com", description: "This was inserted", author: "test@honors.com", pubDate: new Date() }; // Defines new object
  dbo.collection("RSSData").insertOne(myobj, function(err, res) { // Inserts the given object
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});