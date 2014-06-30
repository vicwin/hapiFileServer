// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Boom = require('boom');


// Declear internals

var internals = {
    defaults: {}
};


exports.register = function (plugin, options, next) {

    var settings = Hoek.applyToDefaults(internals.defaults, options);

    plugin.log(['FileServer', 'config'], options);


    plugin.select('http').route([
        {
            method: ['GET'],
            path: '/heartbeat',
            config: {
                handler: function (request, reply) {
                    reply('OK');
                }
            }
        },
        {
            method: ['GET'],
            path: '/public/{path*}',
            handler: {
                directory: {
                  path: './public',
                  listing: true,
                }
            }
        }
    ]);

    return next();
};

