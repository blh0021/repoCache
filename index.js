var express = require('express')
var fs = require('fs');
var path = require('path');
var http = require('https');

var app = express();
var cwd = process.cwd();

app.all('/*', (req, res, next) => {
    console.log('DEBUG -----------------------');
    console.log(req.originalUrl);
    console.log(req.params);
    console.log('END-DEBUG ===================');
    next();
});

require('./modules/npm')(app);
require('./modules/ubuntu')(app);
require('./modules/rubygems')(app);

app.get('/', function (req, res) {
    res.send('Simple OSS proxy repo!')
});

app.listen(3000, function () {
    console.log('RepoOSS listening on port 3000!')
});
