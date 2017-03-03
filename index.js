//http://kb.kerio.com/product/kerio-connect/server-configuration/ssl-certificates/adding-trusted-root-certificates-to-the-server-1605.html
//http://www.thewindowsclub.com/manage-trusted-root-certificates-windows
//https://engineering.circle.com/https-authorized-certs-with-node-js-315e548354a2#.pxqxy37sd

var express = require('express')
var http = require('http');
var https = require('https');
var tls = require('tls');
var fs = require('fs');

var secureContext = {
    'localhost': tls.createSecureContext({
        key: fs.readFileSync('tmp/keys/device.key', 'utf8'),
        cert: fs.readFileSync('tmp/keys/device.crt', 'utf8'),
    }),
    '192.168.1.10': tls.createSecureContext({
        key: fs.readFileSync('tmp/keys/ip.key', 'utf8'),
        cert: fs.readFileSync('tmp/keys/ip.crt', 'utf8'),
    }),
    'prorepo': tls.createSecureContext({
        key: fs.readFileSync('tmp/keys/prorepo.key', 'utf8'),
        cert: fs.readFileSync('tmp/keys/prorepo.crt', 'utf8'),
    }),
    'registry.npmjs.org': tls.createSecureContext({
        key: fs.readFileSync('tmp/keys/npm.key', 'utf8'),
        cert: fs.readFileSync('tmp/keys/npm.crt', 'utf8'),
    }),
}

var options = {
    SNICallback: function (domain, cb) {
        console.log(domain);
        if (secureContext[domain]) {
            if (cb) {
                cb(null, secureContext[domain]);
            } else {
                // compatibility for older versions of node
                return secureContext[domain];
            }
        } else {
            throw new Error('No keys/certificates for domain requested');
        }
    },
    key: fs.readFileSync('tmp/keys/ip.key'),
    cert: fs.readFileSync('tmp/keys/ip.crt'),
};

var app = express();
var cwd = process.cwd();

var pem = require('pem');

/*pem.createCertificate({ days: 1, selfSigned: true}, (err, keys) => {
    if (err) {
        console.log(err);
        return;
    }*/
app.all('/*', (req, res, next) => {
    console.log('DEBUG -----------------------');
    console.log(req.originalUrl);
    console.log(req.params);
    console.log('END-DEBUG ===================');
    next();
});

app.all('/proxy', (req, res, next) => {
    console.log('proxy');
    console.log(req.params);
    res.send("proxy");
});

require('./modules/root')(app);
require('./modules/npm')(app);


/*app.get('/', (req, res) => {
    let url = req.originalUrl;
    res.send(url)
});
*/
//console.log(keys);
//https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(3001);
https.createServer(options, app).listen(3001);
http.createServer(app).listen(3000);
//});
