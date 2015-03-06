/*globals Exception */

// Require the module dependencies.
var osFunctions = require('os');
var http = require('http');
var fs = require('fs');

// Load the Ardeidae module components.
var HttpControl = require('./lib/ardeidae').httpControl;
var HubControl = require('./lib/ardeidae').hubControl;
var Utilities = require('./lib/ardeidae').utilities;
var SysLog = require('./lib/ardeidae').sysLog;
var Config = require('./lib/ardeidae').config;



/**
 *  Start up all things Ardeidae.
 */
var SysLog = new SysLog(Config, Utilities, fs);
var HttpControl = new HttpControl(SysLog);
var HubControl = new HubControl(SysLog);




/**
 *  HTTP Server
 */
var httpServer = http.createServer(function (request, response) {
  // HttpControl.setOnlineServers( HubControl.getServerCount() );
  // HttpControl.setHistoricalServes( HubControl.getArrayLength() );

  HttpControl.handleHttpRequest(request, response, HubControl, function ( serverData, writeMode ) {
      // writeMode = writeMode || '';
      if ( typeof serverData === 'string' ) {
        if ( serverData === 'client' ) {
          SysLog.file('Sent hub stats data to client.' );
          return SysLog.console('Request for serverlist with method GET.');
        }

        return SysLog.file("Error in recieved data: " + serverData, 'ERROR');
      }

      if ( writeMode === 'update' ) {
        SysLog.file('Updating server with id: ' + serverData.id + ', origin: ' + serverData.domain);
        return HubControl.updateServer ( serverData, serverData.id );
      }

      if (writeMode === 'new' ) {
        SysLog.file('Creating new server with id: ' + serverData.id + ', origin: ' + serverData.domain);
        return HubControl.setNewServer( serverData );
      }

      return SysLog.file('Failed to write or update HUB with: ' + serverData, 'ERROR');
  });

});

httpServer.listen(Config.port, function() {
  SysLog.console( '\n' + 'Ardeidae HUB Version (v' + Config.hubVersion + ') \n====================================');
  SysLog.console( 'Listening on ' + osFunctions.hostname() + ', port ' + Config.port);
  SysLog.file( 'Ardeidae HUB (v' + Config.hubVersion + ') started on ' + osFunctions.hostname() + ', port ' + Config.port);
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
process.on("exit", function() { SysLog.console("Goodbye"); });
// Uncaught exceptions generate events, if any handlers are registered.
// Otherwise, the exception just makes Node print an error and exit.
//process.on("uncaughtException", function(e) { console.log(Exception, e); });

// POSIX signals like SIGINT, SIGHUP and SIGTERM generate events
// process.on("SIGINT", function() { console.log("Ignored Ctrl-C"); });

