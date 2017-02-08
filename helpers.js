var fs = require('fs');
var http = require('http');
var https = require('https');

var cwd = process.cwd();

module.exports = {
    download: (url, dest, cb) => {
        var file = fs.createWriteStream(dest);
        var httpProt;
        if (url.includes("https")) {
            httpProt = https;
        } else {
            httpProt = http;
        }
        var request = httpProt.get(url, function (response) {
            response.pipe(file);
            file.on('finish', function () {
                file.close(cb);
            });
        });
    },

    sendFile: (fileName, res) => {
        res.sendFile(cwd + "/" + fileName, {}, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Sent:', fileName);
            }
        });
    }
}
