Changelog
=========

Changlog Ardeidae Node.js powered server-hub.


Version 1.0.3
-------------
*Release 2015-03-12*
- Caching the server list at setInterval, respond with this to client requests.

Version 1.0.2
-------------
*Release 2015-03-06*
- Added protection against faulty HTTP requests.
- Added argument for HTTP request callback function to specify serverData writeMode as "new" or "update".


Version 1.0.1
-------------
*Release 2015-03-05*
- Ardeidae logger module. Generates a logfile and prints to terminal window.


Version 1.0.0
-------------
*Release 2015-02-21*
First release!
- Major fixes and revamp. Hopefully not too buggy!



Version 0.0.2
-------------
*Released 2015-02-18*

- Server TTL added.
- Servers assigned unique ID.
- Config-file consolidated for easy modifications.
- Client requests answered with the current server-list.
- Better hubArray handling



Version 0.0.1
-------------
*Released 2015-02-16*

- Launch of the first stable build of the Ardeidae node.js Module with virtually no functionality, only responds to HTTP requests.
