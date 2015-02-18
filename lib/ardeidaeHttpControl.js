
/**
 * Return current Local time or UTC time-date in readable format..
 */
var getUtcNow = function ( format ) {
  var now = new Date(),  //.getTime(),
        date_time_utc,
        time_local;
  if ( format === 'full' ) {
    date_time_utc = now.toUTCString();
    return date_time_utc;
  }
  if ( format === 'time' ) {
    time_local = now.toTimeString();
    return time_local;
  }
};


/**
 *  HTTP Control handles all Http requests.
 */
function HttpControl (name, version) {
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

    var debug = '\n' + getUtcNow ('time') + ': HUB got a request: "' + request.url + '" with request method: ' + request.method;
    var origin = (request.headers.origin || '*');
    var requestBodyBuffer = [];


    if (request.method === 'OPTIONS'){
        response.writeHead( '204', 'No Content', {
          'access-control-allow-origin': origin,
          'access-control-allow-methods': 'GET, POST',
          'access-control-allow-headers': 'content-type, accept',
          'access-control-max-age': 10, // Seconds.
          'content-length': 0
        });
        console.log( debug + ' ...sending Hub CORS rules to client/server.' );
        return( response.end() );
    }


      /**
       *  Server SETTING hub stats
       */
    if (request.method === 'POST') {
       request.on( 'data', function( chunk ){
            requestBodyBuffer.push( chunk );
            // console.log (requestBodyBuffer);
        });

        request.on('end', function() {
            var recievedData = JSON.parse( requestBodyBuffer );
            // Check if request is from server existing in hubArray or not.
            var serverID = hubController.isInArray( recievedData );
            var newServerID, confirmation;
            var sendReply = function ( dataToSend ) {
              // console.log ( debug );
              response.writeHead( '200', 'OK', {
                'content-type': 'text/plain',
                'content-length': dataToSend.length
              });

              response.end( dataToSend );
              callback ( recievedData );
            };

            // If server exists on Hub return ID, if not return the ID assigned to the new server.
            if ( serverID > 0 ) {
              confirmation = JSON.stringify( { id: serverID } );
              sendReply ( confirmation );
            } else {
              newServerID = hubController.getHubArrayLength();
              confirmation = JSON.stringify( { id: newServerID } );
              sendReply ( confirmation );
            }
        });

      }

      /**
       *  Client GETTING hub stats
       */
      if (request.method === 'GET') {
        request.on( 'data', function( chunk ){
            var clientRequestBodyBuffer = [];
            clientRequestBodyBuffer.push( chunk );
            console.log("YAAAAAAAAAAAAAAAAAA");
            console.log (clientRequestBodyBuffer);
        });

        request.on('end', function() {
            var serverList = hubController.getArray();
            response.writeHead( '200', 'OK', {
              'access-control-allow-origin': origin,
              'content-type': 'text/plain',
              'content-length': serverList.length
            });

            console.log( debug + 'Sending hub stats data to client...' );
            response.end( JSON.stringify ( serverList ) );
            callback( JSON.parse( requestBodyBuffer ) );
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
