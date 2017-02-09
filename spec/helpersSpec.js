var fe = require('file-exists');
var fs = require('fs');
var helpers = require('../helpers.js');

describe('helpers functions', () => {

    it('should download a file.', () => {
        let callb = () => { };
        let url = "https://code.jquery.com/jquery-3.1.1.slim.js";
        let file = "spec/jquery.js";
        helpers.download(url, file, callb);
        expect(fe.sync(file)).toBeTruthy();
        fs.unlink(file, callb);
    });
    
});