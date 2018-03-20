const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const crypto = require('crypto');
const fs = require('fs');
const RSS = require('rss');
const cors = require('cors');
const db = require('./db.js');
const Mustache = require('mustache');

var rssxml;
//var rssjson = [];

var feed = new RSS({
    title: 'Honors TV News',
    feed_url: 'http://localhost:3000/feed.rss',
    site_url: 'http://localhost:3000',
});

try {
    addAllItems(db.select_all());
} catch (err) {
    console.log(err);
    //writeJSON();
    rssxml = feed.xml();
}

app.use(cors());
app.get('/', pageServer);
app.use('/', express.static(path.join(__dirname, '..', 'client')));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.post('/', feedHandler);
app.post('/delete', deleter);
app.get('/feed.rss', (req, res) => {
    res.end(rssxml);
});
/*app.get('/feed.json', (req, res) => {
    res.json(rssjson);
});*/

app.listen(3000, () => {
    console.log('listening at http://localhost:3000');
});

function pageServer(req, res) {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.end(Mustache.render(data, { items: rssjson }));
    });
}

function feedHandler(req, res) {
    addRSS(req.body.title, req.body.description, req.body.date);
    res.redirect('/');
}

function deleter(req, res) {
    db.delete_item(req.body.item_id);
    res.redirect('/');
}

function addRSS(title, description, expirationDate) {
    var item = {
        title,
        description,
        date: Date.now(),
        expirationDate,
        url: '',
        guid: uuidv4(),
		author: "test author",
    }
    addRSSItem(item);
}

function addRSSItem(item) {
    addAllItems([item]);
}

function addAllItems(items) {
    console.log('addall ' + items);
    for(item of items) {
        console.log('pushing ' + JSON.stringify(item));
        db.insert(item);
        feed.item(item);
    }
    rssxml = feed.xml();
    //writeJSON();
}

function uuidv4() { // https://stackoverflow.com/a/2117523/2846923
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function writeJSON() {
    console.log(`writing '${rssjson}' as '${JSON.stringify(rssjson)}'`);
    fs.writeFile(path.join(__dirname, 'rss.json'), JSON.stringify(rssjson), (err) => {
        if (err) console.log(err);
    });
}