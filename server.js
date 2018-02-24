const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const crypto = require('crypto');
const fs = require('fs');
const hash = crypto.createHash('sha256');

fs.readFile(path.join(__dirname, 'password'), 'utf8', (err, data) => {
    if (err) throw err;
    const hashedPassword = data;
});

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/', feedHandler);

app.listen(3000, () => {
    console.log('listening at http://localhost:3000');
});

function feedHandler(req, res) {
    hash.update(req.body.password);
    if(hash.digest('hex') != hashedPassword) {
        res.sendStatus(403);
        return;
    }
    addRSS(req.body.title, req.body.description, req.body.date);
    res.redirect('/');
}

function addRSS(title, description, date) {
        
}