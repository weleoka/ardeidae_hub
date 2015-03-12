var config = {};
// 0: debug (development) verbose and logfile messages to console.
// 1: standard (development) verbose to console, logfile to file.
// 2: logfile only messages (production)
// 3: No message display or logging (silent mode)
config.sysLogMode = 1;
config.sysLogFile = 'hub.log';
config.sysLogFileType = 'text'; // JSON;


// Port to listen for connections.
config.port = 8121;
config.domain = 'localhost';


// The name of your Hub.
config.hubCallsign = 'Ardeidae Hub';
// The version of the Hub (Should not be changed)
config.hubVersion = '1.0.3';
// The domain the hub is on. (Not required for normal operation.)
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

// How frequently should the Cached array object be updated, miliseconds.
config.CachedArrayUpdateInterval = 1000;

module.exports = config;