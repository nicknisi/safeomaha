"use strict";
var fs = require("fs"),
    comb = require("comb"),
    path = require("path"),
    format = comb.string.format,
    csv = require("csv");

var RAW_DATA_DIR = "./data/raw_data";
var FORMATTED_DATA_DIR = "./data/formatted_data";


var run = function (f) {
    var parsedName = path.basename(comb.camelize((f.charAt(0).toLowerCase() + f.substr(1)).toLowerCase()), ".csv") + ".json";
    fs.readFile(path.resolve(RAW_DATA_DIR, f), "utf8", function (err, data) {
        var csvParse = csv().from(data, {columns:true, delimeter:","});
        var ws = fs.createWriteStream(path.resolve(FORMATTED_DATA_DIR, parsedName), {encoding:"utf8"});
        ws.write("[\n\t");
        csvParse.transform(function (data) {
            for (var i in data) {
                var key = i.replace(/\s*/g, "");
                key = comb.camelize((key.charAt(0).toLowerCase() + key.substr(1)).toLowerCase());
                if (key.toLowerCase() == "rbnumber") {
                    key = "rbNumber";
                }
                if (key != i) {
                    data[key] = data[i];
                    delete data[i];
                }
            }
            return data;
        })
            .on('data', function (data, index) {
                ws.write((index == 0 ? "\n\t" : ",\n\t") + JSON.stringify(data, null, 2).replace(/\n/ig, "\n        "), "utf8");
            })
            .on('end', function (count) {
                ws.end("\n]", "utf8");
                ws.on("close", function () {
                    process.exit();
                })
            })
            .on('error', function (error) {
                console.error(error.stack);
                process.exit();
            });
    });
};
process.on("message", run);
//run("School_Census_Scores.csv");
