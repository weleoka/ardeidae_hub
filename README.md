
# Messaging Server powered by Node.js and [websockets](https://github.com/theturtle32/WebSocket-Node)
Test line to make a commit.



### Ardeidae Server versions
v1.0.0


(Note to author:
version specified in package.json, readme.md, changelog.md, lib/ardedae_hub.js and git.)



### Requirements
Requires node.js.



### Overview
This is a server which logs all the Ardeidae Messaging servers currently online so that Ardeidae Clients know where to find them!

The Ardeidae Hub.



## Documentation
For more complete documentation, see the [Documentation Wiki](http://www.student.bth.se/~kawe14/javascript/kmom10/docs/index.php).



### Installation
Simply NPM install and execute with node.js! Make sure it has access to send and recieve HTTP on relevant port!



### Usage
There is a server config file where deployment defaults can be specified. 



### Config-file
* port: specify the port which the http server is listening on.
* serverCallsign: here you are free to call your server whatever you wish.
* serverVersion: Do not change this value; it will have unforseen concequences for the clients.
* SSL certificates, make sure the directory is correct.
* Set the protected mode of the server.
	Please note that the server is by default not using HTTPS/SSL, and protected mode simply means that users require a registered user and password before they can use the server.
* dbDetails: This is important in order for the server to have registered users. Future versions of Ardeidae will use the same credentials for creating effective history logs of messages and storing in DB.
* dbDetailsTable: the table name which the server will create in the SQL database.
* The protocols are the default protocols that the server listens for. If in protected mode the server will generate random protocols which the client needs to have before being allowed to connect.
* Origins is very important. The server will only accept incoming websocket connections if the client is at the specified origins.
* AllowAll (not recommended) this will allow users to connect from any origin.


For more complete documentation, see the [Documentation Wiki](http://www.student.bth.se/~kawe14/javascript/kmom10/docs/index.php).



### Current Features:
General functinality:
* Server config file.
* Message logging.
* Private messaging to single or multiple peers but remaining in public room.
* Filter messages with htmlEntities.
* Independent server-side name logging to prevent in session client name-changing.
* Sending a welcome message to all users joining to the room.
	- includes recent messages.
* Notifies when each user joins or leaves.
* Keeps track of total users online, and total since server deployment.
* If running in open mode notifies peers trying to connect with password that they don't need it.
* Responds to HTTP request (Ajax-CORS) with JSON containing current server meta data.
	Meta data supplied by server is:
	- What mode the server is running in.
	- Number of online peers.
	- Server uptime.
	- Total logins since deployment.

General server specs and options:
* Displays output on host machine terminal about operations.

Also about the protected server mode:
* The server has the option of being open or password protected.
* MySQL Database integration to maintain a list of registered users.
* Password encryption support.
* Random protocols generation to prevent unauthorised access.



### Known Issues/Missing Features:
General functionality:
* Needs a function to notify peers when user is typing a message.
* Consider the format for saving message log. JSON or Object?
* Needs multiple chattrooms... curently, one instance of the server equals one chattroom.
* Backup message log to database table (currently stored in array), but at intervals - to free up system memory and provide backup during service down time.
* Stop users sending blank messages.

General server specs and options:
* Needs a mode switching capability for verbose mode & debug mode.

Also about the protected server mode:
* The servers protocols are not generated as they should be. They are simply made using a Math.random() function... and random is not random when it comes to computers.



## Credits
Ardeidae is a one man project. However, many thanks to the developers of Node, Websocket and MySQL for node and the password-hash-and-salt module for node.



## Licence
Creative Commons Share-Alike v4.0




