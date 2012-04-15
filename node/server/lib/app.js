var express = require("express"),
    routes = require("./routes.js"),
    config = require("../config.js")


exports.startServer = function (host, port) {
    port = port || config.PORT, host = host || config.HOST;
    var app = express.createServer();
    app.use(express.static(__dirname + '/../../../web'));
    routes.route(app);
    app.listen(port, host);
    console.log("listening on %s:%s", host, port);
};
