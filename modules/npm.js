var fs = require('fs');
var cwd = process.cwd();
var fe = require('file-exists');
var mkdirp = require('mkdirp');
var helpers = require('../helpers');
var config = require('../config.json');
var _ = require('underscore');

mkdirp('./repo/npm/@types', function (err) {
    if (err) console.error(err)
});

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

module.exports = function (app) {

    function npmJsonPackage(fn, res) {
        var fileName = cwd + fn.replace(".", ""); //path;
        console.log(fileName);
        var data = fs.readFileSync(fileName, 'utf8');
        //data = data.replaceAll("https://registry.npmjs.org/", config.npm.hostname + "/repo/npm/")
        var jsn = JSON.parse(data);
        /*
        _.each(jsn.versions, (ver) => {
            delete ver._npmOperationalInternal;
        });
        */
        res.json(jsn);
    }

    app.get('/repo/npm/*/-/*', (req, res) => {
        var url = "https://registry.npmjs.org/" + req.params['0'] + "/-/" + req.params['1'];
        var fn = "./repo/npm/" + req.params['1'];
        if (!fe.sync(fn)) {
            console.log("no file");
            helpers.download(url, fn, helpers.sendFile.bind(null, fn, res));
        } else {
            console.log('using cache - send file');
            helpers.sendFile(fn, res);
        }
    });

    app.get('/repo/npm/*', (req, res) => {
        let pkgFn = req.params['0'].replace("/", "_").replace("@", "AT");
        let pkgUrl = req.params['0'].replace("/", "%2f");

        var url = "https://registry.npmjs.org/" + pkgUrl;
        var fn = "./repo/npm/" + pkgFn + ".json";
;
        if (!fe.sync(fn)) {
            try {
                helpers.download(url, fn, npmJsonPackage.bind(null, fn, res));
            } catch (e) {
                res.send(e);
            }
        } else {
            console.log('using cache');
            npmJsonPackage(fn, res);
        }
    });

}
