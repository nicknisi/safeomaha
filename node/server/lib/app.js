var express = require("express"),
    routes = require("./routes.js");


exports.startServer = function (host, port) {
    port = port || 8088, host = host || "localhost";
    var app = express.createServer();
    routes.route(app);
    app.listen(port, host);
    console.log("listening on %s:%s", host, port);
};
