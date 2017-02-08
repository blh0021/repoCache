var fs = require('fs');
var cwd = process.cwd();
var fe = require('file-exists');
var mkdirp = require('mkdirp');
var helpers = require('../helpers');
var config = require('../config.json');

mkdirp('./repo/npm', function (err) {
    if (err) console.error(err)
});

module.exports = function (app) {

    function npmJsonPackage(req, res) {
        var fileName = cwd + "/repo/npm/" + req.params.package + ".json"; //path;
        var data = fs.readFileSync(fileName, 'utf8');
        data = data.replace("https://registry.npmjs.org/", config.npm.hostname + "/repo/npm/")
        res.json(JSON.parse(data));
    }

    app.get('/repo/npm/*/-/*', (req, res) => {
        var url = "https://registry.npmjs.org/" + req.params['0'] + "/-/" + req.params['1'];
        var fn = "./repo/npm/" + req.params['1'];
        if (!fe.sync(fn)) {
            helpers.download(url, fn, helpers.sendFile.bind(null, fn, res));
        } else {
            console.log('using cache - send file');
            helpers.sendFile(fn, res);
        }
    });

    app.get('/repo/npm/:package', (req, res) => {
        console.log(req.params);
        var url = "https://registry.npmjs.org/" + req.params.package;
        var fn = "./repo/npm/" + req.params.package + ".json";
        if (!fe.sync(fn)) {
            try {
                helpers.download(url, fn, npmJsonPackage.bind(null, req, res));
            } catch (e) {
                res.send(e);
            }
        } else {
            console.log('using cache');
            npmJsonPackage(req, res);
        }
    });
}
