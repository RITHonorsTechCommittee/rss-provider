function  insert(item) {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("RSSFeed"); // Opens database
	  var myobj = { title: item.title, link: item.url, description: item.description, author: item.author, pubDate: item.date, expirationDate: item.expirationDate }; // Defines new object
	  dbo.collection("RSSData").insertOne(myobj, function(err, res) { // Inserts the given object
		if (err) throw err;
		console.log("1 document inserted");
		db.close();
	  });
	});
}

function  select_all() {
	var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var final_result;

MongoClient.connect(url, function(err, db) {
  if (err) throw err; // Ensures it is connected 
  var dbo = db.db("RSSFeed"); // Opens database
  dbo.collection("RSSData").find({}).project({_id: 0}).toArray(function(err, result) { // Finds all items in collection, excludes id field, and turns to array
    if (err) throw err;
    console.log(result); // Prints results
	final_result = result;
    db.close();
  });
});

return final_result;
}