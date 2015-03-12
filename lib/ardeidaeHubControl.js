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
function HubControl (SysLog) {
  this.SysLog = SysLog;
  this.hubArray = [];
  this.cachedHubArray =[];
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
  this.hubArray[1].updated = 9999999999999;
  this.activeServers = 2;
}
HubControl.prototype = {
  toStringHubArray: function () {
    var serversArray = this.getActiveArray();
    var i;
    this.SysLog.console('No. of Online servers: ' + this.activeServers + ', Length of hubArray array: ' + serversArray.length);
    for ( i = 0; i < serversArray.length; i++ ) {
      if ( serversArray[i] ) {
        this.SysLog.console('ID: ' + serversArray[i].id + ', at index: ' + i  + ', from: ' + serversArray[i].origin + ', uptime: ' + serversArray[i].uptime + ', name: ' + serversArray[i].name);
      }
    }
  },
  toStringHubActiveArray: function () {
    var activeServersArray = this.getActiveArray();
    var i;
    this.SysLog.console('No. of Online servers: ' + this.activeServers);
    if ( activeServersArray.length ) {
      for ( i = 0; i < activeServersArray.length; i++ ) {
        if ( activeServersArray[i] ) {
          this.SysLog.console(activeServersArray[i]);
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
  setCachedArrayAsJSON: function (arr) {
    this.cachedHubArray = JSON.stringify ( arr );
  },
  getCachedArray: function () {
    return this.cachedHubArray;
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
    // this.SysLog.file('Creating new server with id: ' + newServerId + ', origin: ' + data.domain);
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
          this.SysLog.file("Removing old server with id: " + i + ", origin: " + this.hubArray[i].domain);
          this.hubArray[i] = { status: 'removed' };
          this.activeServerCountDown();
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
