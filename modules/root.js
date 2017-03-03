var fs = require('fs');
var cwd = process.cwd();
var fe = require('file-exists');
var mkdirp = require('mkdirp');
var helpers = require('../helpers');
var config = require('../config.json');
var path = require('path');

mkdirp('./repo/rubygems', function (err) {
    if (err) console.error(err)
});


module.exports = function (app) {

    app.all('/*', (req, res, next) => {
        let hostname = req.hostname;
        let path = req.path;
        if (hostname == 'registry.npmjs.org') {
            req.url='/repo/npm' + path;
            console.log(req.url);
            mkdirp.sync('repo/npm', (err) => {
                if (err) console.log(err);
            })
            next();
        } else {
            let url = req.originalUrl;

            let dr = "./repo/" + hostname + "/" + path.substring(0, path.lastIndexOf('/') + 1);
            let fn = "./repo/" + hostname + req.path;
            console.log(fn);
            if (fn.slice(-1) == "/") {
                fn = fn + "idx";
            }
            mkdirp.sync(dr, (err) => {
                if (err) console.log(err);
            })
            try {
                if (!fe.sync(fn)) {
                    try {
                        helpers.download(url, fn, helpers.sendFile.bind(null, fn, res));
                    } catch (e) {
                        res.send(e);
                    }
                } else {
                    console.log('using cache');
                    helpers.sendFile(fn, res);
                }
            } catch (e) { }


            //res.send('');

        }
    });

}
