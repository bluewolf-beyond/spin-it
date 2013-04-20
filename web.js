var connect = require('connect'),
    port    = process.env.PORT || 8001;

connect.createServer(
    connect.static(__dirname + '/public')
).listen( port );

console.log("Listening on " + port);
