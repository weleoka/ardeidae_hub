/**
 *  HTTP Control handles all Http requests.
 */
function HttpControl (SysLog, name, version) {
  this.SysLog = SysLog;
  this.hubDeploymentTime = Date.now();
  this.hubCallsign = name;
  this.hubVersion = version;
  this.onlineServers = 0;
  this.historicalServers = 0;
}

HttpControl.prototype = {
  getStats: function () {
    var uptime = Math.floor( (Date.now() - this.serverDeploymentTime) / 1000 ); // deployment time in seconds
    var obj = {uptime: uptime,
                    name: this.hubCallsign,
                    onlineUsers: this.onlineUsers,
                    historicalUsers: this.historicalUsers };
    var portable = JSON.stringify(obj);
    return portable;
  },

  setOnlineServers: function (users) {
    this.onlineServers = users;
  },
  setHistoricalServers: function (users) {
    this.historicalServers = users;
  },

  handleHttpRequest: function (request, response, hubController, callback) {
    // this.SysLog.file('HUB got a request: "' + request.url + '" with request method: ' + request.method);
    var SysLog = this.SysLog;
    var origin = (request.headers.origin || '*');

    if (request.method === 'OPTIONS'){
        response.writeHead( '204', 'No Content', {
          'access-control-allow-origin': origin,
          'access-control-allow-methods': 'GET, POST',
          'access-control-allow-headers': 'content-type, accept',
          'access-control-max-age': 10, // Seconds.
          'content-length': 0
        });
        return( response.end() );
    }


      /**
       *  Server SETTING hub stats
       */
    if (request.method === 'POST') {
       var requestBodyBuffer = [];

       request.on( 'data', function( chunk ){
            requestBodyBuffer.push( chunk );
            // console.log (requestBodyBuffer);
        });

        request.on('end', function() {
            var newServerID,
                  confirmation,
                  recievedData,
                  serverID,
                  writeMode;

            var sendReply = function ( dataToSend ) {
              response.writeHead( '200', 'OK', {
                'content-type': 'text/plain',
                'content-length': dataToSend.length
              });
              response.end( dataToSend );
            };

            if ( requestBodyBuffer ) {
              try {
                   recievedData =  JSON.parse( requestBodyBuffer );
              } catch (err) {
                  return 'fault_in_json: ' + err;
              }
            }

            if ( Object.prototype.toString.call( recievedData ) === '[object Array]' ) {

              // Check if request is from server existing in hubArray or not.
              serverID = hubController.isInArray( recievedData[0] );

              if ( serverID > 0 ) {
                confirmation = JSON.stringify( { id: serverID } );
                sendReply ( confirmation );
                writeMode = 'update';
              } else {
                newServerID = hubController.getHubArrayLength();
                confirmation = JSON.stringify( { id: newServerID } );
                sendReply ( confirmation );
                writeMode = 'new';
              }
              callback ( recievedData[0], writeMode );
            } else {
              return 'not_valid_array';
            }
        });

      }



      /**
       *  Client GETTING hub stats
       */
      if (request.method === 'GET') {
        var dataPack = JSON.stringify ( hubController.getActiveArray() );   // Information provided to clients.

        request.on( 'data', function( chunk ){ var wastebin = chunk; return; });

        request.on('end', function() {
            response.writeHead( '200', 'OK', {
              'access-control-allow-origin': origin,
              'content-type': 'text/plain',
              'content-length': dataPack.length
            });
            SysLog.file('Sending hub stats data to client...' );
            response.end( dataPack );
            callback('client');
        });
      }
  },



/**
 *  Common object methods
 */
  toString: function () {
    var str = 'toString HUB HTTPControl: \n';
    str += 'deployment time: ' + this.hubDeploymentTime;
    str += '\n hub name: ' + this.hubCallsign;
    str += '\n hub version: ' + this.hubVersion;
    str += '\n online servers: ' + this.onlineServers;
    str += '\n historically online servers: ' + this.historicalServers;
    return str;
  },
};


module.exports = HttpControl;



/**
 *  HTTPS Server.
 */
/*var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync(Config.SSLkey),
  cert: fs.readFileSync(Config.SSLcert)
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(8000);*/

