var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var db_name = "RssFeed";
var collection_name = "RssData";

// Insert the item, return true on success, false otherwise
exports.insert = function (item) {
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db(db_name); // Opens database
		var myobj = { title: item.title, link: item.url, description: item.description, author: item.author, pubDate: item.date, expirationDate: item.expirationDate }; // Defines new object
		dbo.collection(collection_name).insertOne(myobj, function(err, res) { // Inserts the given object
			if (err) throw err;
			console.log("1 document inserted");
			db.close();
		});
	});
};

// Returns all items in an array, including an ID; also make a function to return within a date range
exports.select_all = function () {
	var final_result;

	MongoClient.connect(url, function(err, db) {
		if (err) throw err; // Ensures it is connected 
		var dbo = db.db(db_name); // Opens database
		dbo.collection(collection_name).find({}).toArray(function(err, result) { // Finds all items in collection, excludes id field, and turns to array
			if (err) throw err;
			console.log(result); // Prints results
			final_result = result;
			db.close();
		});
	});

	return final_result;
};

// Delete the item with the specific ID, return true on success, false otherwise
exports.delete_item = function (id) {
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db(db_name); // Opens database
		var deleteQuerry = {'_id': id} // Deletes any articles with the id
		dbo.collection(collection_name).deleteOne(deleteQuerry, function(err, res) { // Executes querry
			if (err) throw err;
			console.log(res.result.n + " document(s) deleted");
			db.close();
		});
	});
};