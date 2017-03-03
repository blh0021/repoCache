const http = require('http');
const net = require('net');
const url = require('url');


// Create an HTTP tunneling proxy
var proxy = http.createServer((req, res) => {
    //console.log(req.url);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
});

function connectService(cltSocket, srvUrl, head) {
    var srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {
        try {
            cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                'Proxy-agent: Node.js-Proxy\r\n' +
                '\r\n');
            srvSocket.write(head);
            srvSocket.pipe(cltSocket);
            //console.log(srvSocket);
            cltSocket.pipe(srvSocket);
        } catch (e) {
            console.log(e);
        }
    });
}

try {
proxy.on('connect', (req, cltSocket, head) => {
    var srvUrl = url.parse('https://localhost:3001/');
    connectService(cltSocket, srvUrl, head);
});
} catch(e) {
    console.log('Proxy On Error: ' + e);
}

process.on('uncaughtException', function (err) {
  console.error(err.stack);
  console.log("Node NOT Exiting...");
});


// now that proxy is running
proxy.listen(3005);