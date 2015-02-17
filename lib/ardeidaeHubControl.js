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
  this.ServerList = [];
  this.activeServers = null;
}
HubControl.prototype = {
  printServerArray: function () {
    console.log('No. of Online users: ' + this.activeServers + ', Length of ServerList array: ' + this.ServerList.length);
    var i;
    for ( i = 0; i < this.ServerList.length; i++ ) {
      if ( this.ServerList[i] ) {
        console.log('ID: ' + this.ServerList[i].id + ', at index: ' + i  + ', from: ' + this.ServerList[i].origin + ', created: ' + this.ServerList[i].time + ', name: ' + this.ServerList[i].name);
      }
    }
  },

  getArray: function () {
/*    var i, serverEntity, arr= [];
    for( i = 0; i < this.ServerList.length; i++ ) {
      if ( this.ServerList[i] ) {
        if ( this.ServerList[i] !== null ) {
          serverEntity = {  id:       this.ServerList[i].id,
                                 name:  this.ServerList[i].name,
                                 domain: this.ServerList[i].domain};
          arr.push(serverEntity);
        }
      }
    }*/
    return this.ServerList;
  },

  getArrayLength: function () {
    return this.ServerList.length;
  },

  getServerCount: function () {
    return this.activeServers;
  },

  serverCountUp: function () {
    this.activeServers++;
  },

  serverCountDown: function () {
    this.activeServers--;
  },



  setNewServer: function (data) {
    this.serverCountUp();
    var newServerId = this.getServerCount();
    var nowTime = new Date().toTimeString();
    console.log(nowTime + ': Creating new server with id: ' + newServerId + ' From origin: ' + data.domain);
    this.ServerList.push( new Server(newServerId, data) );
  },

  updateServer: function (data, id) {
    var timestamp = Date.now();
    this.ServerList[id] = {       updated: timestamp,
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

  getArray: function () {
    return this.ServerList;
  },

  checkDeadServers: function () {
    var i;
    var now = Date.now();
    for ( i = 0; i < this.ServerList.length; i++ ) {
      if ( now - this.ServerList[i].updated > 10000 ) {
        this.ServerList[i] = null;
      }
    }
  },








  removeByIndex: function (index) {
      this.ServerList[index] = null;
      this.userCountDown();
  },

  findIndexByName: function (name) {
    var i;
    for( i = 0; i < this.ServerList.length; i++ ) {
        if ( this.ServerList[i].name === name ) {
          return i;
        }
    }
  },

  findNameByIndex: function (index) {
    if (this.ServerList[index]) {
        return this.ServerList[index].name;
    }
    return null;
  },

  findOriginByIndex: function (index) {
        if (this.ServerList[index]) {
        return this.ServerList[index].origin;
    }
    return null;
  },

  findIndexByRemoteAddress: function (address) {
    var i;
    for( i = 0; i < this.ServerList.length; i++ ) {
      console.log('Searching db for remote addresses, found: ' + this.ServerList[i].origin + ' at index: ' + i);
        if ( this.ServerList[i].origin === address ) {
          return i;
        }
    }
  },

  setNameAtIndex: function (name, index) {
    if (this.ServerList[index]) {
      console.log('writing new name: "' + name + '" to user on online list at index: ' + index);
      this.ServerList[index].name = name;
    }
  }
};

module.exports = HubControl;


