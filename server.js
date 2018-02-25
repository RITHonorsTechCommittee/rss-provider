const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const crypto = require('crypto');
const fs = require('fs');
const RSS = require('rss');

var hashedPassword;
var xml;

fs.readFile(path.join(__dirname, 'password'), 'utf8', (err, data) => {
    if (err) throw err;
    hashedPassword = data;
});

var feed = new RSS({
    title: 'Honors TV News',
    feed_url: 'http://localhost:3000/feed.rss',
    site_url: 'http://localhost:3000',
});

xml = feed.xml();

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.post('/', feedHandler);
app.get('/feed.rss', (req, res) => {
    res.end(xml);
});

app.listen(3000, () => {
    console.log('listening at http://localhost:3000');
});

function feedHandler(req, res) {
    var hash = crypto.createHash('sha256');
    hash.update(req.body.password);
    if (hash.digest('hex') != hashedPassword) {
        res.sendStatus(403);
        return;
    }
    addRSS(req.body.title, req.body.description, req.body.date);
    res.redirect('/');
}

function addRSS(title, description, expirationDate) {
    feed.item({
        title,
        description,
        date: Date.now(),
        url: '',
        guid: uuidv4(),
    });
    xml = feed.xml();
}

function uuidv4() { // https://stackoverflow.com/a/2117523/2846923
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}