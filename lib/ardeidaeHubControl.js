/**
 *  Server object
 */
function Server (id, data) {
    this.updated = Date.now();
    this.id = id;
    this.uptime = data.uptime;
    this.name = data.name;
    this.version = data.version;
    this.privateMode = data.serverMode;
    this.onlineUsers = data.onlineUsers;
    this.historicalUsers = data.historicalUsers;
    this.domain = data.domain;
    this.port = data.port;
}


/**
 * User Controller object
 */
function HubControl () {
  this.hubArray = [];
  var sampleData1 = {
                                id: 0,
                                uptime: 9999,
                                name: 'SampleServer',
                                version: '1.2.2',
                                privateMode: true,
                                onlineUsers: 0,
                                historicalUsers: 0,
                                domain: 'www.sampleserver.com',
                                port: 6256
  };
  var sampleData2 = {
                                id: 1,
                                uptime: 9999,
                                name: 'SampleServer2',
                                version: '1.2.2',
                                privateMode: false,
                                onlineUsers: 0,
                                historicalUsers: 0,
                                domain: 'www.sampleserver2.com',
                                port: 6256
  };
  this.hubArray.push (new Server (0, sampleData1));
  this.hubArray.push (new Server (0, sampleData2));
  // Set the first server to nearly infinite TTL.
  this.hubArray[0].updated = 9999999999999;
  this.activeServers = 0;
}
HubControl.prototype = {
  toStringHubArray: function () {
    var serversArray = this.getActiveArray();
    var i;
    console.log('No. of Online servers: ' + this.activeServers + ', Length of hubArray array: ' + serversArray.length);
    for ( i = 0; i < serversArray.length; i++ ) {
      if ( serversArray[i] ) {
        console.log('ID: ' + serversArray[i].id + ', at index: ' + i  + ', from: ' + serversArray[i].origin + ', uptime: ' + serversArray[i].uptime + ', name: ' + serversArray[i].name);
      }
    }
  },
  toStringHubActiveArray: function () {
    var activeServersArray = this.getActiveArray();
    var i;
    // Define the callback function.
   var printResults = function (value, index, ar) {
        console.log("value: " + value);
        console.log(" index: " + index);
        console.log("<br />");
    };
    console.log('No. of Online servers: ' + this.activeServers);
    if ( activeServersArray.length ) {
      for ( i = 0; i < activeServersArray.length; i++ ) {
        if ( activeServersArray[i] ) {
          // activeServersArray[i].forEach(printResults);
/*          console.log('ID: ' + activeServersArray[i].id
            + ', at index: ' + i
            + ', name: ' + activeServersArray[i].name
            + ', updated: ' + activeServersArray[i].updated
            + ', version: ' + activeServersArray[i].version
            + ', uptime: ' + activeServersArray[i].uptime
            + ', mode: ' + activeServersArray[i].privateMode
            + ', online users: ' + activeServersArray[i].onlineUsers
            + ', historical users: ' + activeServersArray[i].historicalUsers
            + ', at domain: ' + activeServersArray[i].domain
            + ', port: ' + activeServersArray[i].port
          );*/
          console.log(activeServersArray[i]);
        }
      }
    }
  },


  getArray: function () {
    return this.hubArray;
  },
  getActiveArray: function () {
    var i; var activeArray = [];
    for ( i = 0; i < this.hubArray.length; i++ ) {
      if ( this.hubArray[i].hasOwnProperty('name') ) {
        activeArray.push( this.hubArray[i]  );
      }
    }
    return activeArray;
  },


  getHubArrayLength: function () {
    return this.hubArray.length;
  },
  getActiveServerCount: function () {
    return this.activeServers;
  },


  hubArrayLengthUp: function () {
    this.hubArray.length++;
  },
  hubArrayLengthDown: function () {
    return; // disabled... cant ever count list down. this.hubArray.length--;
  },


  activeServerCountUp: function () {
    this.activeServers++;
  },
  activeServerCountDown: function () {
    this.activeServers--;
  },



  setNewServer: function (data) {
    this.activeServerCountUp();
    var newServerId = this.getHubArrayLength();
    this.hubArrayLengthUp(); // +1 To match the length property of array.

    var nowTime = new Date().toTimeString();
    console.log(nowTime + ': Creating new server with id: ' + newServerId + ' From origin: ' + data.domain);
    this.hubArray[newServerId] = ( new Server(newServerId, data) );
  },

  updateServer: function (data, id) {
    var timestamp = Date.now();
    this.hubArray[id] = {       updated: timestamp,
                                            id: id,
                                            uptime: data.uptime,
                                            name: data.name,
                                            version: data.version,
                                            privateMode: data.privateMode,
                                            onlineUsers: data.onlineUsers,
                                            historicalUsers: data.historicalUsers,
                                            domain: data.domain,
                                            port: data.port};
  },


  checkDeadServers: function (serverTTL) {
    var i, timeSinceRefresh;
    var now = Date.now();
    for ( i = 0; i < this.hubArray.length; i++ ) {
      if ( this.hubArray[i].hasOwnProperty('updated') ) {
        timeSinceRefresh = now - this.hubArray[i].updated;
        if ( timeSinceRefresh > serverTTL ) {
          this.hubArray[i] = { status: 'removed' };
          this.activeServerCountDown();
          console.log ("Found dead server with id: " + i + " removing it now.");
        }
      }
    }
  },

  isInArray: function (serverData) {
    var i;
    for ( i = 0; i < this.hubArray.length; i ++ ) {
      if ( this.hubArray[i].hasOwnProperty('domain') ) {
        if ( this.hubArray[i].domain === serverData.domain ) {
          return i;
        }
      }
    }
    return 0;
  }

};

module.exports = HubControl;


/*    var i, serverEntity, arr= [];
    for( i = 0; i < this.hubArray.length; i++ ) {
      if ( this.hubArray[i] ) {
        if ( this.hubArray[i] !== null ) {
          serverEntity = {  id:       this.hubArray[i].id,
                                 name:  this.hubArray[i].name,
                                 domain: this.hubArray[i].domain};
          arr.push(serverEntity);
        }
      }
    }*/