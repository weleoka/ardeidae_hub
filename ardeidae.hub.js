/*globals Exception */

// Require the module dependencies.
var http = require('http');

// Load the Ardeidae module components.
var HttpControl = require('./lib/ardeidae').httpControl;
var HubControl = require('./lib/ardeidae').hubControl;
var Utilities = require('./lib/ardeidae').utilities;
var Config = require('./lib/ardeidae').config;

var isInArray = function (serverData) {
    var i;
    var serverlist = HubControl.getArray();
    for ( i = 0; i < serverlist.length; i ++ ) {
      if ( serverlist[i].domain == serverData.domain && serverlist[i].name == serverData.name ) {
        return i;
      }
    }
    return null;
};
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
  var hubArray = HubControl.getArray();

  HttpControl.handleHttpRequest(request, response, hubArray, function ( serverData ) {

console.log("DAAAAAAAAAAAAAAAAAAAAAAAAAA");
      console.log (serverData);
      var setID = isInArray (serverData);
      if ( setID === 1) {
        console.log("Update old server!!!!");
        HubControl.updateServer (serverData, setID);
      } else {
        console.log("Set new server!!!!!");
        HubControl.setNewServer( serverData );
      }

      console.log(HubControl.getArray());

  });

});

httpServer.listen(Config.port, function() {
  console.log( Utilities.getUtcNow ('full') +
    ': HUB HTTP server is listening on port ' + Config.port +
    ' (Ardeidae HUB Version v' + Config.hubVersion + ')');
});




// The "exit" event is sent before Node exits.
process.on("exit", function() { console.log("Goodbye"); });
// Uncaught exceptions generate events, if any handlers are registered.
// Otherwise, the exception just makes Node print an error and exit.
//process.on("uncaughtException", function(e) { console.log(Exception, e); });

// POSIX signals like SIGINT, SIGHUP and SIGTERM generate events
// process.on("SIGINT", function() { console.log("Ignored Ctrl-C"); });

