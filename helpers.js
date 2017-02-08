var fs = require('fs');
var http = require('https');
var cwd = process.cwd();

module.exports = {
    download: (url, dest, cb) => {
        var file = fs.createWriteStream(dest);
        var request = http.get(url, function (response) {
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
