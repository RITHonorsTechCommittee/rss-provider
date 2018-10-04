var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("RSSFeed"); // Opens database
  var deleteQuerry = {'pubDate': {$lt: new Date((new Date().getTime()-(14*24*60*60*1000)))}} // Deletes any articles older than 1 week
  dbo.collection("RSSData").deleteMany(deleteQuerry, function(err, res) { // Executes querry
    if (err) throw err;
    console.log(res.result.n + " document(s) deleted");
    db.close();
  });
});