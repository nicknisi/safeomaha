var comb = require("comb"),
    path = require("path"),
    qs = require("querystring")
format = comb.string.format,
    fs = require("fs"),
    request = require("request");
var ds = ["bicycleAccidents", "buildingCodeViolations", "campaignContributions", "crimeNames", "crimeAdmin", "crimeOffenseWithXy",
    "crimeProperty", "crimeVehicle", "foodInspections", "liquorLicenses", "parkingMetersWithXy", "pedestrianAccidents",
    "schoolCensusScores"];

var datasets = {};
var FORMATTED_DATA = "./data/formatted_data";
var MASSAGED_DATA = "./data/massaged_data";
ds.forEach(function (t) {
    datasets[t] = require(path.resolve(FORMATTED_DATA, t + ".json"));
});


var locationRegex = /([+|-]?(?:\d+\.?\d+)),\s*([+|-]?\d+(?:\.?\d+))\)$/;
var QUERY_OPTS = {f:"pjson", outSR:"", outFields:""};
var GEOCODE_URL = "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Locators/ESRI_Geocode_USA/GeocodeServer/findAddressCandidates?";

var writeData = function (data, fileName, cb) {
    fs.writeFile(path.resolve(MASSAGED_DATA, fileName), JSON.stringify(data, null, 2), cb);
};

var lookupXY = function (options, cb) {
    var url = GEOCODE_URL + qs.stringify(options);
    console.log(url);
    request({url:url, json:true, followRedirect:true}, function (err, response, body) {
        if (err) {
            cb(err);
        } else {
            cb(null, body);
        }
    })
}


var massageAccidents = function () {
    var accidentDs = [];
    datasets.bicycleAccidents.forEach(function (b) {
        var location = b.location1 || "";
        var m = location.match(locationRegex), y = null, x = null;
        if (m && m.length == 3) {
            y = m[1], x = m[2];
        } else {
            console.log("NO LAT/LON")
            console.log(location);
        }
        b.loc = [x, y];
        b.type = "Bicycle Accident";
        accidentDs.push(b);
    });

    datasets.pedestrianAccidents.forEach(function (b) {
        var location = b.location1 || "";
        var m = location.match(locationRegex), y = null, x = null;
        if (m && m.length == 3) {
            y = m[1], x = m[2];
        } else {
            console.log("NO LAT/LON")
            console.log(location);
        }
        b.loc = [x, y];
        b.type = "Pedestrian Accident";
        accidentDs.push(b);
    });
    writeData(accidentDs, "accidents.json", function (err) {
        if (err) {
            console.log(err);
        }
    })

};

var massageContributions = function () {
    var count = 0, l = datasets.campaignContributions.length;
    var ps = datasets.campaignContributions.map(function (d) {
        var lookupOpts = comb.merge({}, QUERY_OPTS, {Address:d.contributoraddress, City:d.contributorcity, Zip:d.contributorzipcode});
        var ret = new comb.Promise();
        lookupXY(lookupOpts, function (err, data) {
            if (err) {
                console.log(err.stack);
            } else if (data.candidates.length) {
                var c0 = data.candidates[0];
                d.loc = [c0.location.x, c0.location.y]
            }
            console.log(++count / l + "%")
            ret.callback();
        })
        return ret;
    });
    new comb.PromiseList(ps).then(function () {
        writeData(datasets.campaignContributions, "campaingContributions.json", function (err) {
            if (err) {
                console.log(err);
            }
        })
    })
};

var massageFoodInspections = function () {
    var accidentDs = [];
    datasets.foodInspections.forEach(function (b) {
        var location = b.location1 || "";
        var m = location.match(locationRegex), y = null, x = null;
        if (m && m.length == 3) {
            y = m[1], x = m[2];
        } else {
            console.log("NO LAT/LON")
            console.log(location);
        }
        b.loc = [x, y];
        accidentDs.push(b);
    });

    writeData(accidentDs, "foodInspections.json", function (err) {
        if (err) {
            console.log(err);
        }
    })
};

var massageBuildingCodeViolations = function () {
    var accidentDs = [];
    datasets.buildingCodeViolations.forEach(function (b) {
        var location = b.location1 || "";
        var m = location.match(locationRegex), y = null, x = null;
        if (m && m.length == 3) {
            y = m[1], x = m[2];
        } else {
            console.log("NO LAT/LON")
            console.log(location);
        }
        b.loc = [x, y];
        accidentDs.push(b);
    });

    writeData(accidentDs, "buildingCodeViolations.json", function (err) {
        if (err) {
            console.log(err);
        }
    })
};

var massageParkingMeters = function () {
    datasets.parkingMetersWithXy.forEach(function (d) {
        d.loc = [d.xcoord, d.ycoord];
        delete d.xcoord;
        delete d.ycoord;
    });
    writeData(datasets.parkingMetersWithXy, "parkingMeters.json", function (err) {
        if (err) {
            console.log(err);
        }
    })
};

var massageLiquorLicenses = function () {
    datasets.liquorLicenses.forEach(function (b) {
        var location = b.location2 || "";
        var m = location.match(locationRegex), y = null, x = null;
        if (m && m.length == 3) {
            y = m[1], x = m[2];
        } else {
            console.log("NO LAT/LON")
            console.log(location);
        }
        b.loc = [x, y];
    });
    writeData(datasets.liquorLicenses, "liquorLicenses.json", function (err) {
        if (err) {
            console.log(err);
        }
    })
};

var massageSchoolCensusScores = function () {
    datasets.schoolCensusScores.forEach(function (b) {
        var location = b.location1 || "";
        var m = location.match(locationRegex), y = null, x = null;
        if (m && m.length == 3) {
            y = m[1], x = m[2];
        } else {
            console.log("NO LAT/LON")
            console.log(location);
        }
        b.loc = [x, y];
    });
    writeData(datasets.schoolCensusScores, "schoolCensusScores.json", function (err) {
        if (err) {
            console.log(err);
        }
    });
};

var massageCrimes = function () {
    var crimesByRptNum = {};
    ["crimeOffenseWithXy", "crimeAdmin"].forEach(function (i) {
        datasets[i].forEach(function (b) {
            var key = b.rbnumber || b.rptNum || b.reportId;
            var item = crimesByRptNum[key];
            if (!item) {
                item = crimesByRptNum[key] = {}
            }
            var element = item[i];
            console.log(i);
            if (!element) {
                item[i] = [b];
            } else {
                element.push(b);
            }
        });
    });
    var data = [];
    Object.keys(crimesByRptNum).forEach(function (i) {
        var item = crimesByRptNum[i];
        var offenses = item.crimeOffenseWithXy;
        if(offenses && offenses.length){
            item.loc = [offenses[0].xcoord, offenses[0].ycoord];
        }else{
            return false;
        }
        item.reportNumber = i;
        data.push(item);
    })
    writeData(data, "crimes.json", function (err) {
        if (err) {
            console.log(err);
        }
    });


};

//massageAccidents();
//massageContributions();
//massageFoodInspections();
//massageParkingMeters();
//massageBuildingCodeViolations();
//massageLiquorLicenses();
//massageSchoolCensusScores();
massageCrimes();




