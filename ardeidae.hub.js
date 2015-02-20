/*globals Exception */

// Require the module dependencies.
var http = require('http');

// Load the Ardeidae module components.
var HttpControl = require('./lib/ardeidae').httpControl;
var HubControl = require('./lib/ardeidae').hubControl;
var Utilities = require('./lib/ardeidae').utilities;
var Config = require('./lib/ardeidae').config;



/**
 *  Start up all things Ardeidae.
 */
var HttpControl = new HttpControl();
var HubControl = new HubControl(Config.hubCallsign, Config.hubVersion);



/**
 *  HTTP Server
 */
var httpServer = http.createServer(function (request, response) {
  // HttpControl.setOnlineServers( HubControl.getServerCount() );
  // HttpControl.setHistoricalServes( HubControl.getArrayLength() );

  HttpControl.handleHttpRequest(request, response, HubControl, function ( serverData ) {
      if ( serverData !== 'client' ) {
        var setID = HubControl.isInArray ( serverData );
        if ( setID >= 1 ) {
          HubControl.updateServer ( serverData, setID );
        } else if ( setID === 0 ) {
          HubControl.setNewServer( serverData );
        } else {
          console.log("Error in recieved data: " + serverData);
        }
      }
  });

});

httpServer.listen(Config.port, function() {
  console.log( '\n' + 'Ardeidae HUB Version (v' + Config.hubVersion + ') \n====================================');
  console.log( Utilities.getUtcNow ('full') + ': Listening on ' + Config.domain + ' port ' + Config.port);
});



/**
 *  Check for dead servers and wipe them from array
 */
setInterval( function() {
  HubControl.checkDeadServers(Config.serverTTL);
}, Config.checkServerTTL );


// debugging hubArray.
/*setInterval( function() {
  HubControl.toStringHubActiveArray();
}, 10000);*/


// The "exit" event is sent before Node exits.
process.on("exit", function() { console.log("Goodbye"); });
// Uncaught exceptions generate events, if any handlers are registered.
// Otherwise, the exception just makes Node print an error and exit.
//process.on("uncaughtException", function(e) { console.log(Exception, e); });

// POSIX signals like SIGINT, SIGHUP and SIGTERM generate events
// process.on("SIGINT", function() { console.log("Ignored Ctrl-C"); });

