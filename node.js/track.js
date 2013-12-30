"use strict";
/* load modules */
var http = require('http');
var fs = require('fs');
var os = require('os');
var querystring = require('querystring');

var trackIP = trackIP || {};
trackIP.options = (function (){
    var configPath = __dirname + "/config.js";
    if(!fs.existsSync(configPath)) {
        trackIP.toConsole("Error: Config doesn't exist; Please copy config.example.js -> config.js.");
        process.exit();
    }
    return require(configPath);
})();
trackIP.interfaces = os.networkInterfaces();
trackIP.addresses = [];



for (var k in trackIP.interfaces) {
    for (var k2 in trackIP.interfaces[k]) {
        var address = trackIP.interfaces[k][k2];
        if (address.family == 'IPv4' && !address.internal) {
            trackIP.addresses.push(address.address);
        }
    }
}


var data = querystring.stringify({
    deviceName: trackIP.options.deviceName,
    password: trackIP.options.password,
    addresses: JSON.stringify(trackIP.addresses)
});

var httpOptions = {
    host: trackIP.options.trackServer.host,
    port: trackIP.options.trackServer.port,
    path: trackIP.options.trackServer.path,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
    }
};

var req = http.request(httpOptions, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log("body: " + chunk);
    });
});

req.write(data);
req.end();