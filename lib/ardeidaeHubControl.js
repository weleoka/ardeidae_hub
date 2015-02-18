/**
 * Server object
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
  this.hubArray[0] = 'baseValueNull';
  this.ServerListLength = 0;
  this.activeServers = 0;
}
HubControl.prototype = {
  printServerArray: function () {
    console.log('No. of Online users: ' + this.activeServers + ', Length of hubArray array: ' + this.hubArray.length);
    var i;
    for ( i = 0; i < this.hubArray.length; i++ ) {
      if ( this.hubArray[i] ) {
        console.log('ID: ' + this.hubArray[i].id + ', at index: ' + i  + ', from: ' + this.hubArray[i].origin + ', created: ' + this.hubArray[i].time + ', name: ' + this.hubArray[i].name);
      }
    }
  },

  getArray: function () {
    return this.hubArray;
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
  serverCountDown: function () {
    return; // disabled... cant ever cont list down. this.ServerListLength--;
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
    console.log("Update old server!!!! with id: " + id);
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
  },

  removeByIndex: function (index) {
      this.hubArray[index] = null;
      this.userCountDown();
  },

  findIndexByName: function (name) {
    var i;
    for( i = 0; i < this.hubArray.length; i++ ) {
        if ( this.hubArray[i].name === name ) {
          return i;
        }
    }
  },

  findNameByIndex: function (index) {
    if (this.hubArray[index]) {
        return this.hubArray[index].name;
    }
    return null;
  },

  findOriginByIndex: function (index) {
        if (this.hubArray[index]) {
        return this.hubArray[index].origin;
    }
    return null;
  },

  findIndexByRemoteAddress: function (address) {
    var i;
    for( i = 0; i < this.hubArray.length; i++ ) {
      console.log('Searching db for remote addresses, found: ' + this.hubArray[i].origin + ' at index: ' + i);
        if ( this.hubArray[i].origin === address ) {
          return i;
        }
    }
  },

  setNameAtIndex: function (name, index) {
    if (this.hubArray[index]) {
      console.log('writing new name: "' + name + '" to user on online list at index: ' + index);
      this.hubArray[index].name = name;
    }
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