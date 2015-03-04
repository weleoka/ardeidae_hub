var config = {};

// Port to listen for connections.
config.port = 8121;
config.domain = 'localhost';

// The name of your server.
config.hubCallsign = 'Ardeidae Hub';
config.hubVersion = '1.0.0';
// config.hubDomain = 'localhost';

// Accept connections from these origins.
config.origins = ['www.bth.student.se',
                        'localhost'
];

// Enable to allow all origins.
config.origins.allowAll = true;

// How long before non-updating servers are removed from list....
config.serverTTL = 10000;   // miliseconds allowed without refresh before removing server from hub.
config.checkServerTTL = 5000;  // miliseconds between checking if servers have been refreshed.

config.verbose = true;

config.logmode = 'file'; // database // false
config.logFile = 'log.json';

module.exports = config;