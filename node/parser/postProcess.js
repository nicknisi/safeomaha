var comb = require("comb"),
    path = require("path"),
    qs = require("querystring")
format = comb.string.format,
    fs = require("fs"),
    request = require("request");
var ds = ["accidents", "buildingCodeViolations", "campaingContributions", "crimes", "foodInspections", "liquorLicenses", "parkingMeters", "schoolCensusScores"];

var datasets = {};
var MASSAGED_DATA = "./data/massaged_data";
var POST_PROCESSED_DATA = "./data/post_processed";
ds.forEach(function (t) {
    datasets[t] = require(path.resolve(MASSAGED_DATA, t + ".json"));
});


var writeData = function (data, fileName, cb) {
    console.log(data.length);
    var ws = fs.createWriteStream(path.resolve(POST_PROCESSED_DATA, fileName), {encoding:"utf8"});
    ws.write("[\n\t");
    data.forEach(function(data, index){
        ws.write((index == 0 ? "\n\t" : ",\n\t") + JSON.stringify(data, null, 2).replace(/\n/ig, "\n        "), "utf8");
    });
    ws.end("\n]", "utf8");
    ws.on("close", function () {
        process.exit();
    })
};

var data = [];

var postProcess = function () {
    datasets.accidents.forEach(function (b) {
        var item = {meta:b};
        item.loc = b.loc;
        item.date = b.accidentD;
        item.type = "ACCIDENT";
        item.category = b.type;
        data.push(item);
    });
    datasets.campaingContributions.forEach(function (b) {
        var item = {meta:b};
        item.loc = b.loc;
        item.date = b.datereceived;
        item.type = "CAMPAIGN CONTRIBUTION";
        item.category = b.typeofcontributor;
        data.push(item);
    });

    datasets.buildingCodeViolations.forEach(function (b) {
        var item = {meta:b};
        item.loc = b.loc;
        item.date = null;
        item.type = "BUILDING CODE VIOLATION";
        item.category = b.inspectionstatus;
        data.push(item);
    });

    datasets.crimes.forEach(function (b) {
        var item = {meta:b};
        item.loc = b.loc;
        b.crimeOffenseWithXy.forEach(function (i) {
            var newItem = comb.merge({}, item);
            newItem.date = i.occurdate;
            newItem.type = "CRIME";
            newItem.category = i.offensedes;
            data.push(newItem);
        });
    });

    datasets.foodInspections.forEach(function (b) {
        var item = {meta:b};
        item.loc = b.loc;
        item.date = b.inspectiondate;
        item.type = "FOOD INSPECTION STATUS";
        item.category = b.rating;
        data.push(item);

    });

    datasets.liquorLicenses.forEach(function (b) {
        var item = {meta:b};
        item.loc = b.loc;
        item.date = null;
        item.type = "LIQUOR LICENSE";
        item.category = b.descriptionofclass;
        data.push(item);
    });

    datasets.parkingMeters.forEach(function (b) {
        var item = {meta:b};
        item.loc = b.loc;
        item.date = null;
        item.type = "PARKING METER";
        item.category = b.ratePerH;
        data.push(item);
    });
    datasets.schoolCensusScores.forEach(function (b) {
        var item = {meta:b};
        item.loc = b.loc;
        item.date = null;
        item.type = "SCHOOL";
        item.category = null;
        data.push(item);
    });

    writeData(data, "dataset.json", function (err) {
        if (err) {
            console.log(err);
        }
    })
};


postProcess();




