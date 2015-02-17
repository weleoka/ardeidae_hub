var config = {};

// Port to listen for connections.
config.port = 8121;

// The name of your server.
config.hubCallsign = 'Ardeidae Hub';
config.hubVersion = '0.0.1';



// Accept connections from these origins.
config.origins = ['*',
];

// Enable to allow all origins.
config.origins.allowAll = true;


module.exports = config;