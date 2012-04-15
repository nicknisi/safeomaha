var fs = require("fs"),
    comb = require("comb"),
    path = require("path"),
    process = require("child_process"),
    format = comb.string.format,
    csv = require("csv");

var RAW_DATA_DIR = "./data/raw_data";
var files = fs.readdirSync(RAW_DATA_DIR);



var l = files.length;
(function loop(i) {
    if (i < l) {
        var n = process.fork("./parserWorker");
        n.send(files[i]);
        loop(++i);
    } else {
        console.log("done");
    }
})(0);