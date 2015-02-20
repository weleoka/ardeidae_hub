
# Messaging Server HUB powered by Node.js.
The Ardeidae Hub is a centeral server designed to act as a gathering point and simulating DNS for all ardeidae chat-servers. Every Ardeidae server launched will report back to the hub and the hub will assign each server a hub ID/callsign.

Any Ardeidae clients will attempt to make contact with the hub, and thus recieve up to date meta data about all Ardeidae servers online.



### Ardeidae Server versions
v0.0.1
v0.0.2
v1.0.0 (current)


(Note to author:
version specified in package.json, readme.md, changelog.md, lib/ardedae_hub.js and git.)



### Requirements
Requires node.js.



### Overview
This is a server which logs all the Ardeidae Messaging servers currently online so that Ardeidae Clients know where to find them!

The Ardeidae Hub.



## Documentation
For more complete documentation, see the [Documentation Wiki](http://www.student.bth.se/~kawe14/javascript/kmom10/documentation_hub.php).



### Installation
Simply NPM install and execute with node.js! Make sure it has access to send and recieve HTTP on relevant port!
'''
npm install ardeidae_hub
node ardeidae.hub.js



### Usage
There is a hub config file where deployment defaults can be specified.



### Config-file
* port: specify the port which the http server is listening on.
* hubCallsign: here you are free to call your server whatever you wish.
* serverVersion: Do not change this value; it will have unforseen concequences for the clients.
* hubDomain: The domain where the hub is running (useful for future HUB of HUBs)
* serverTTL: (miliseconds) how long will a server that does not refresh be called "alive".
* checkServerTTL: (miliseconds) how frequently does the hub scan serverlist for dead servers. ( should be less than the serverTTL )


For more complete documentation, see the [Documentation Wiki](http://www.student.bth.se/~kawe14/javascript/kmom10/documentation_hub.php).



### Current Features:
General functinality:
* Hub config file.
* Independent server-side name logging to prevent in session client name-changing.
* Responds to HTTP request from Ardeidae Clients with JSON containing current server list meta data.
	Meta data supplied by server is:
	- What mode the server is running in.
	- Number of online peers.
	- Server uptime.
	- Total logins since deployment.
	- Callsign, domain, port etc.

General server specs and options:
* Displays output on host machine terminal about operations.



### Known Issues/Missing Features:
Functionality:
* Client shoud be able to request serverList ordered by userCount, Location, Status or other.
* Hub should also supply the "quote-of-the-day/joke/special-info/blog/ads" to all clients using it.

Specs and options:
* Needs a mode switching capability in Config for verbose/debug mode vs. production.

Security:
* Needs database to allow "trusted/registered" cleints to make request.
* Needs database to allow "trusted/registered" servers to login.
* The assigned server ID should be a secure hash to stop rougue servers emulating koshers in HTTP requests.
* SSL/TLS ( using Node module called "Request"? ) for all connections.

Code and style:
* new Server object should implement array format for properties rather than setting individual properties, this is so that native Array methods as defined in ECMAScript 5 can be used on the nested arrays.
* The hub recieves POST from server and then has to check if is in hubArray 2 times, not so good. First time is to see what ID to return to server, second to update timestamp of server in hubArray.
* Filter out server object properties not interesting for clients.



## Credits
Ardeidae is an open source project. However, many thanks to the developers of Node, Websocket and MySQL for node and the password-hash-and-salt module for node.



## Licence
Creative Commons Share-Alike v4.0




