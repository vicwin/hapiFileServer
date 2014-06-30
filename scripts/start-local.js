var Hapi = require('hapi');
var FS = require('fs');
var port = 8001;
var options = {};

var serverSettingOptions = {
    "labels": ["http"],
    "timeout": {
        "server": 60000
    }
};

var tls = {};


if (process.env.ENABLE_HTTPS === 'true') {
    serverSettingOptions.tls = tls;
};

var server = new Hapi.Server('localhost', port, serverSettingOptions);

server.pack.require('../', options, function (err) {

    // print log event on console
    server.on('log', function (event, tags) {
        console.log(event);
    });

    server.on('request', function (request, event, tags) {
        console.log(event);
    });

    server.on('plugin', function (request, event, tags) {
        console.log(event);
    });

    if (err) {
        server.log(['error'], 'Failed loading plugin');
    }
    server.start(function (err) {
        if (err) {
            server.log(['error'], 'Failed starting server');
        }
        server.log(['info'], "Server started on port " + port);
    });
});
