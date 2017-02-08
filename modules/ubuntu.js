var fs = require('fs');
var cwd = process.cwd();
var fe = require('file-exists');
var mkdirp = require('mkdirp');
var helpers = require('../helpers');
var config = require('../config.json');
var path = require('path');

mkdirp('./repo/ubuntu', function (err) {
    if (err) console.error(err)
});


module.exports = function (app) {

    app.get('/repo/ubuntu/*', (req, res) => {
        console.log('ubuntu');
        let pkg = req.params['0'];
        mkdirp.sync("./repo/ubuntu/" + path.dirname(pkg), (err) => {
            if (err) console.log(err);
        })
        var url = config.ubuntu.hostname + pkg;
        var fn = "./repo/ubuntu/" + pkg;
        /*
        console.log(url);
        console.log(fn);
        console.log(pkg);
        */
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
    });

}
