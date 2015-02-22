
Server hub for Ardeidae messaging server.

This is a server which logs all the Ardeidae Messaging servers currently online so that Ardeidae Clients know where to find them!

[Ardeidae homepage](http://www.student.bth.se/~kawe14/javascript/kmom10/webroot/index.php).



### Ardeidae Hub versions
v1.0.0 (current)

(Note to author: version specified in package.json, readme.md, changelog.md, lib/ardedae_hub.js and git.)



### Requirements
Requires node.js.



### Overview
The Ardeidae Hub is a centeral server designed to act as a gathering point and acting like a DNS for all ardeidae chat-servers. Every Ardeidae server launched will report back to the hub and the hub will assign each server a hub ID/callsign.

Any Ardeidae clients will attempt to make contact with the hub, and thus recieve up to date meta data about all Ardeidae servers online.



### Installation
Simply NPM install or clone and execute with node.js! Make sure it has access to send and recieve HTTP on relevant port!

	$ npm install ardeidae_hub
	$ node ardeidae.hub.js




### Usage
There is a hub config file where deployment defaults can be specified.



### Config-file
* port: specify the port which the http server is listening on.
* hubCallsign: here you are free to call your server whatever you wish.
* serverVersion: Do not change this value; it will have unforseen concequences for the clients.
* hubDomain: The domain where the hub is running (useful for future HUB of HUBs)
* serverTTL: (miliseconds) how long will a server that does not refresh be called "alive".
* checkServerTTL: (miliseconds) how frequently does the hub scan serverlist for dead servers. ( should be less than the serverTTL )



### Current Features:
General functinality:

* Hub config file.
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

* Needs database to allow only "trusted/registered" servers to login.
* The assigned server ID should be a secure hash to stop rougue servers emulating koshers in HTTP requests.
* SSL/TLS ( using Node module called "Request"? ) for all connections.


Code, style and performance:

* The hub recieves data from server and then has to check if is in hubArray two times. First time is to see what ID to return to server, second is to update timestamp of server if it is already in hubArray.



## Contributing
If you'd like to contribute to Ardeidae's development, start by forking the GitHub repo:

https://github.com/weleoka/ardeidae_hub.git

The best way to get your changes merged is as follows:

1. Clone your fork
2. Hack away
3. If you are adding significant new functionality, document it in the README
4. Do not change the version number, I will do that on my end
5. Push the repo up to GitHub
6. Send a pull request to [weleoka/ardeidae](https://github.com/weleoka/ardeidae_hub)



## Credits
Ardeidae_hub is an open source project. Many thanks to the developers of Node, and the great help of the folks at stackoverflow plus the blogs and infosites of the internet!



## Licence
Creative Commons Share-Alike v4.0




