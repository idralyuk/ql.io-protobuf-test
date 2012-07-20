var _  = require('underscore'),
    fs = require('fs'),
   url = require('url'),
  util = require('util'),
  http = require('http');

var port = 6000;

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

var server = http.createServer(function(req, res) {
    var file = __dirname + '/data/' + req.url

    var cType;

    if (endsWith(req.url, '.xml')) {
        cType = 'text/xml;charset=UTF-8';
    } else if (endsWith(req.url, '.json')) {
        cType = 'application/json;charset=UTF-8';
    } else if (endsWith(req.url, '.protobuf')) {
        cType = 'application/octet-stream;charset=UTF-8';
    }

    var stat = fs.statSync(file);
    res.writeHead(200, {
        'Content-Type' : cType,
        'Content-Length' : stat.size
    });
    var readStream = fs.createReadStream(file);
    util.pump(readStream, res, function(e) {
        if (e) {
            console.log(e.stack || e);
        }
        res.end();
    });
});

server.listen(port, function() {
    console.log('\nmock server listening on ' + port);
});


