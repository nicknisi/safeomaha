var geocoder;
var map;
var baseurl = '';
$.ajaxSetup ({  
    cache: false  
});  


function initialize() {
	var myOptions = {
	center: new google.maps.LatLng(41.25917,-95.93386),
	zoom: 12,
	mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	geocoder = new google.maps.Geocoder();
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	
	google.maps.event.addListener(map, 'click', function(event) {
		// call web service here to get data about this point
		nearbyEvents = fetchEvents(event.latLng.lat(),event.latLng.lng())
		
		// add a marker here, and load data about this location
		infowindow.close();
		infowindow.setContent("Will detail about<br>" + event.latLng.lat() + "<br>" + event.latLng.lng() + "<br> here once the web service has been created.");
		infowindow.setPosition(event.latLng);
		infowindow.open(map);
		
	    console.log(event.latLng.lat(),event.latLng.lng());
	  });
	
	var infowindow = new google.maps.InfoWindow({"maxWidth":50});
	
	// load data
	var dataSet = fetchData();
	console.log(dataSet);
	var markers = new Array();
		for (var i = 0; i < dataSet.length; i++) {
			console.log('Will place marker at ' + dataSet[i].loc[0] + ' ' + dataSet[i].loc[1])
			markers[i] = new google.maps.Marker({
				position: new google.maps.LatLng(dataSet[i].loc[1], dataSet[i].loc[0]),
				title: dataSet[i].type,
				map: map
			});
			
			if (markerImages[dataSet[i].type])
				markers[i].setIcon(markerImages[dataSet[i].type]);
			
			console.log('test ' + markers[i].getTitle());

			google.maps.event.addListener(markers[i], 'click', (function(marker,dataSetRow) { 
				return function () {
					infowindow.setContent(makeInfoWindowContent(dataSetRow));
					infowindow.open(map, marker);
				};
			})(markers[i],dataSet[i]));
			
		}

	}

function makeInfoWindowContent(dataSetRow) {
	var html = '<div class="infowindow">';
	html += dataSetRow.category + '<br>' + dataSetRow.date + '<br>';
	html += 'Offense: ' + dataSetRow.meta.crimeOffenseWithXy[0].offensedes;
	html += '</div>';
	return html.toLowerCase();
}

function fetchData() {
	// place holder function. This will fetch data later
	var dataSet =
		[	{
	          "meta": {
	              "crimeNames": [
	                {
	                  "rptNum": "C43682",
	                  "role": "VICTIM",
	                  "seqNum": "1",
	                  "type": "PERSON",
	                  "lastname": "WRIGHT",
	                  "firstname": "KASSANDRA",
	                  "middlename": "L",
	                  "address": "14618 SHIRLEY ST",
	                  "halfaddress": null,
	                  "roomApt": null,
	                  "city": "OMAHA",
	                  "state": "NE",
	                  "zip": "68144",
	                  "birthdate": "03/14/1988 08:00 AM +0000",
	                  "gender": "FEMALE",
	                  "race": "WHITE"
	                }
	              ],
	              "crimeOffenseWithXy": [
	                {
	                  "reportId": "C43682",
	                  "vicseq": "1",
	                  "offseq": "1",
	                  "prosecuteFlag": "Y",
	                  "rptdate": "10/12/2003 12:00 AM",
	                  "rpttime": null,
	                  "victype": "INDIVIDUAL",
	                  "occurdate": "09/18/2003 12:00 AM",
	                  "occurtime": null,
	                  "occuradd": "14700 SHIRLEY ST",
	                  "occurhalf": null,
	                  "occurapt": null,
	                  "occurcity": "OMAHA",
	                  "occurstate": "NE",
	                  "occurzip": "68144.0",
	                  "occurdistr": "87.0",
	                  "reportadd": "14700 SHIRLEY ST",
	                  "reportcity": "OMAHA",
	                  "reportstat": "NE",
	                  "reportzip": "68144.0",
	                  "reportdist": "87.0",
	                  "vicalcohol": "Y",
	                  "vicdrugs": "N",
	                  "offensedes": "SEXUAL ASSAULT",
	                  "completeat": "COMPLETED",
	                  "actdesc1": null,
	                  "actdesc2": null,
	                  "actdesc3": null,
	                  "hatedesc": "UNKNOWN MOTIVATION",
	                  "offalcohol": "Y",
	                  "offdrugs": "N",
	                  "offcompute": "N",
	                  "locationde": "RESIDENCE/HOME",
	                  "weapon1": null,
	                  "weapon1typ": null,
	                  "weapon2": null,
	                  "weapon2typ": null,
	                  "xcoord": "-96.143343",
	                  "ycoord": "41.240948"
	                },
	                {
	                  "reportId": "C43682",
	                  "vicseq": "1",
	                  "offseq": "2",
	                  "prosecuteFlag": "Y",
	                  "rptdate": "10/12/2003 12:00 AM",
	                  "rpttime": null,
	                  "victype": "INDIVIDUAL",
	                  "occurdate": "09/18/2003 12:00 AM",
	                  "occurtime": null,
	                  "occuradd": "14700 SHIRLEY ST",
	                  "occurhalf": null,
	                  "occurapt": null,
	                  "occurcity": "OMAHA",
	                  "occurstate": "NE",
	                  "occurzip": "68144.0",
	                  "occurdistr": "87.0",
	                  "reportadd": "14700 SHIRLEY ST",
	                  "reportcity": "OMAHA",
	                  "reportstat": "NE",
	                  "reportzip": "68144.0",
	                  "reportdist": "87.0",
	                  "vicalcohol": "Y",
	                  "vicdrugs": "N",
	                  "offensedes": "STALKING-FOLLOW/HARASS,CREDIBLE THREAT",
	                  "completeat": "COMPLETED",
	                  "actdesc1": null,
	                  "actdesc2": null,
	                  "actdesc3": null,
	                  "hatedesc": "UNKNOWN MOTIVATION",
	                  "offalcohol": "Y",
	                  "offdrugs": "N",
	                  "offcompute": "N",
	                  "locationde": "RESIDENCE/HOME",
	                  "weapon1": null,
	                  "weapon1typ": null,
	                  "weapon2": null,
	                  "weapon2typ": null,
	                  "xcoord": "-96.143343",
	                  "ycoord": "41.240948"
	                }
	              ],
	              "loc": [
	                "-96.143343",
	                "41.240948"
	              ],
	              "reportNumber": "C43682"
	            },
	            "loc": [
	              "-96.143343",
	              "41.240948"
	            ],
	            "date": "09/18/2003 12:00 AM",
	            "type": "CRIME",
	            "category": "STALKING-FOLLOW/HARASS,CREDIBLE THREAT"
	          },
	  	{
	            "meta": {
	              "crimeNames": [
	                {
	                  "rptNum": "C66188",
	                  "role": "VICTIM",
	                  "seqNum": "1",
	                  "type": "PERSON",
	                  "lastname": "JACKSON",
	                  "firstname": "FELISHA",
	                  "middlename": "D",
	                  "address": "4001 SPENCER ST",
	                  "halfaddress": null,
	                  "roomApt": null,
	                  "city": "OMAHA",
	                  "state": "NE",
	                  "zip": "68111",
	                  "birthdate": "11/24/1983 08:00 AM +0000",
	                  "gender": "FEMALE",
	                  "race": "BLACK"
	                }
	              ],
	              "crimeOffenseWithXy": [
	                {
	                  "reportId": "C66188",
	                  "vicseq": "1",
	                  "offseq": "1",
	                  "prosecuteFlag": "Y",
	                  "rptdate": "12/26/2003 12:00 AM",
	                  "rpttime": null,
	                  "victype": "INDIVIDUAL",
	                  "occurdate": "12/26/2003 12:00 AM",
	                  "occurtime": null,
	                  "occuradd": "2114 SPENCER ST",
	                  "occurhalf": null,
	                  "occurapt": null,
	                  "occurcity": "OMAHA",
	                  "occurstate": "NE",
	                  "occurzip": "68110.0",
	                  "occurdistr": "36.0",
	                  "reportadd": "2114 SPENCER ST",
	                  "reportcity": "OMAHA",
	                  "reportstat": "NE",
	                  "reportzip": "68110.0",
	                  "reportdist": "36.0",
	                  "vicalcohol": "N",
	                  "vicdrugs": "N",
	                  "offensedes": "ASSAULT - MISD - NO WEAPON",
	                  "completeat": "COMPLETED",
	                  "actdesc1": null,
	                  "actdesc2": null,
	                  "actdesc3": null,
	                  "hatedesc": "UNKNOWN MOTIVATION",
	                  "offalcohol": "Y",
	                  "offdrugs": null,
	                  "offcompute": null,
	                  "locationde": "RESIDENCE/HOME",
	                  "weapon1": "HANDS",
	                  "weapon1typ": null,
	                  "weapon2": null,
	                  "weapon2typ": null,
	                  "xcoord": "-95.944051",
	                  "ycoord": "41.287889"
	                }
	              ],
	              "loc": [
	                "-95.944051",
	                "41.287889"
	              ],
	              "reportNumber": "C66188"
	            },
	            "loc": [
	              "-95.944051",
	              "41.287889"
	            ],
	            "date": "12/26/2003 12:00 AM",
	            "type": "CRIME",
	            "category": "ASSAULT - MISD - NO WEAPON"
	          },
	  	{
	            "meta": {
	              "crimeNames": [
	                {
	                  "rptNum": "C82905",
	                  "role": "VICTIM",
	                  "seqNum": "1",
	                  "type": "PERSON",
	                  "lastname": "HAGER",
	                  "firstname": "ALLEN",
	                  "middlename": "D",
	                  "address": "5530 N 16 ST",
	                  "halfaddress": null,
	                  "roomApt": null,
	                  "city": "OMAHA",
	                  "state": "NE",
	                  "zip": "68110",
	                  "birthdate": "12/28/1970 08:00 AM +0000",
	                  "gender": "MALE",
	                  "race": "WHITE"
	                },
	                {
	                  "rptNum": "C82905",
	                  "role": "VEHICLE INSURANCE COMPANY",
	                  "seqNum": "1",
	                  "type": "BUSINESS",
	                  "lastname": "STATE FARM",
	                  "firstname": null,
	                  "middlename": null,
	                  "address": null,
	                  "halfaddress": null,
	                  "roomApt": null,
	                  "city": null,
	                  "state": null,
	                  "zip": null,
	                  "birthdate": "12/28/1970 08:00 AM +0000",
	                  "gender": null,
	                  "race": null
	                }
	              ],
	              "crimeOffenseWithXy": [
	                {
	                  "reportId": "C82905",
	                  "vicseq": "1",
	                  "offseq": "1",
	                  "prosecuteFlag": "Y",
	                  "rptdate": "02/24/2004 12:00 AM",
	                  "rpttime": null,
	                  "victype": "INDIVIDUAL",
	                  "occurdate": "02/23/2004 12:00 AM",
	                  "occurtime": null,
	                  "occuradd": "5520 N 16 ST",
	                  "occurhalf": null,
	                  "occurapt": null,
	                  "occurcity": "OMAHA",
	                  "occurstate": "NE",
	                  "occurzip": "68110.0",
	                  "occurdistr": "36.0",
	                  "reportadd": "5520 N 16 ST",
	                  "reportcity": "OMAHA",
	                  "reportstat": "NE",
	                  "reportzip": "68110.0",
	                  "reportdist": "36.0",
	                  "vicalcohol": "N",
	                  "vicdrugs": "N",
	                  "offensedes": "THEFT OF MOTOR VEHICLE - FELONY MV",
	                  "completeat": "COMPLETED",
	                  "actdesc1": null,
	                  "actdesc2": null,
	                  "actdesc3": null,
	                  "hatedesc": null,
	                  "offalcohol": null,
	                  "offdrugs": null,
	                  "offcompute": null,
	                  "locationde": "PARKING LOT/GARAGE",
	                  "weapon1": null,
	                  "weapon1typ": null,
	                  "weapon2": null,
	                  "weapon2typ": null,
	                  "xcoord": "-95.937388",
	                  "ycoord": "41.308609"
	                }
	              ],
	              "loc": [
	                "-95.937388",
	                "41.308609"
	              ],
	              "reportNumber": "C82905"
	            },
	            "loc": [
	              "-95.937388",
	              "41.308609"
	            ],
	            "date": "02/23/2004 12:00 AM",
	            "type": "CRIME",
	            "category": "THEFT OF MOTOR VEHICLE - FELONY MV"
	          },
	  	{
	            "meta": {
	              "crimeNames": [
	                {
	                  "rptNum": "E36888",
	                  "role": "VICTIM",
	                  "seqNum": "1",
	                  "type": "PERSON",
	                  "lastname": "LARSEN",
	                  "firstname": "HARVEY",
	                  "middlename": "L",
	                  "address": "1800 GRAND AV",
	                  "halfaddress": null,
	                  "roomApt": null,
	                  "city": "CO BLUFFS",
	                  "state": "IA",
	                  "zip": null,
	                  "birthdate": "04/13/1949 08:00 AM +0000",
	                  "gender": "MALE",
	                  "race": "WHITE"
	                },
	                {
	                  "rptNum": "E36888",
	                  "role": "VEHICLE INSURANCE COMPANY",
	                  "seqNum": "1",
	                  "type": "BUSINESS",
	                  "lastname": "HARRY KOCH",
	                  "firstname": null,
	                  "middlename": null,
	                  "address": "12000 Q ST",
	                  "halfaddress": null,
	                  "roomApt": null,
	                  "city": "OMAHA",
	                  "state": "NE",
	                  "zip": "68137",
	                  "birthdate": "04/13/1949 08:00 AM +0000",
	                  "gender": null,
	                  "race": null
	                },
	                {
	                  "rptNum": "E36888",
	                  "role": "VEHICLE INSURANCE COMPANY",
	                  "seqNum": "2",
	                  "type": "BUSINESS",
	                  "lastname": "HARRY KOCH",
	                  "firstname": null,
	                  "middlename": null,
	                  "address": "12000 Q ST",
	                  "halfaddress": null,
	                  "roomApt": null,
	                  "city": "OMAHA",
	                  "state": "NE",
	                  "zip": "68137",
	                  "birthdate": "04/13/1949 08:00 AM +0000",
	                  "gender": null,
	                  "race": null
	                }
	              ],
	              "crimeOffenseWithXy": [
	                {
	                  "reportId": "E36888",
	                  "vicseq": "1",
	                  "offseq": "3",
	                  "prosecuteFlag": "Y",
	                  "rptdate": "08/20/2004 12:00 AM",
	                  "rpttime": null,
	                  "victype": "INDIVIDUAL",
	                  "occurdate": "08/18/2004 12:00 AM",
	                  "occurtime": null,
	                  "occuradd": "1402 S 50 ST",
	                  "occurhalf": null,
	                  "occurapt": null,
	                  "occurcity": "OMAHA",
	                  "occurstate": "NE",
	                  "occurzip": "68106.0",
	                  "occurdistr": "73.0",
	                  "reportadd": "1402 S 50 ST",
	                  "reportcity": "OMAHA",
	                  "reportstat": "NE",
	                  "reportzip": "68106.0",
	                  "reportdist": "73.0",
	                  "vicalcohol": "N",
	                  "vicdrugs": "N",
	                  "offensedes": "STOLEN LOCAL-RCOV LOCAL",
	                  "completeat": "COMPLETED",
	                  "actdesc1": null,
	                  "actdesc2": null,
	                  "actdesc3": null,
	                  "hatedesc": null,
	                  "offalcohol": null,
	                  "offdrugs": null,
	                  "offcompute": null,
	                  "locationde": null,
	                  "weapon1": null,
	                  "weapon1typ": null,
	                  "weapon2": null,
	                  "weapon2typ": null,
	                  "xcoord": "-95.9902",
	                  "ycoord": "41.245428"
	                },
	                {
	                  "reportId": "E36888",
	                  "vicseq": "1",
	                  "offseq": "2",
	                  "prosecuteFlag": "Y",
	                  "rptdate": "08/20/2004 12:00 AM",
	                  "rpttime": null,
	                  "victype": "INDIVIDUAL",
	                  "occurdate": "08/18/2004 12:00 AM",
	                  "occurtime": null,
	                  "occuradd": "1402 S 50 ST",
	                  "occurhalf": null,
	                  "occurapt": null,
	                  "occurcity": "OMAHA",
	                  "occurstate": "NE",
	                  "occurzip": "68106.0",
	                  "occurdistr": "73.0",
	                  "reportadd": "1402 S 50 ST",
	                  "reportcity": "OMAHA",
	                  "reportstat": "NE",
	                  "reportzip": "68106.0",
	                  "reportdist": "73.0",
	                  "vicalcohol": "N",
	                  "vicdrugs": "N",
	                  "offensedes": "THEFT BY UNLAWFUL TAKING OVR $1500",
	                  "completeat": "COMPLETED",
	                  "actdesc1": null,
	                  "actdesc2": null,
	                  "actdesc3": null,
	                  "hatedesc": "UNKNOWN MOTIVATION",
	                  "offalcohol": "N",
	                  "offdrugs": "N",
	                  "offcompute": "N",
	                  "locationde": "PARKING LOT/GARAGE",
	                  "weapon1": null,
	                  "weapon1typ": null,
	                  "weapon2": null,
	                  "weapon2typ": null,
	                  "xcoord": "-95.9902",
	                  "ycoord": "41.245428"
	                },
	                {
	                  "reportId": "E36888",
	                  "vicseq": "1",
	                  "offseq": "1",
	                  "prosecuteFlag": "Y",
	                  "rptdate": "08/20/2004 12:00 AM",
	                  "rpttime": null,
	                  "victype": "INDIVIDUAL",
	                  "occurdate": "08/18/2004 12:00 AM",
	                  "occurtime": null,
	                  "occuradd": "1402 S 50 ST",
	                  "occurhalf": null,
	                  "occurapt": null,
	                  "occurcity": "OMAHA",
	                  "occurstate": "NE",
	                  "occurzip": "68106.0",
	                  "occurdistr": "73.0",
	                  "reportadd": "1402 S 50 ST",
	                  "reportcity": "OMAHA",
	                  "reportstat": "NE",
	                  "reportzip": "68106.0",
	                  "reportdist": "73.0",
	                  "vicalcohol": "N",
	                  "vicdrugs": "N",
	                  "offensedes": "THEFT BY UNLAWFUL TAKING OVR $1500",
	                  "completeat": "COMPLETED",
	                  "actdesc1": "POSSESSING/CONCEALING",
	                  "actdesc2": null,
	                  "actdesc3": null,
	                  "hatedesc": "UNKNOWN MOTIVATION",
	                  "offalcohol": "N",
	                  "offdrugs": "N",
	                  "offcompute": "N",
	                  "locationde": "PARKING LOT/GARAGE",
	                  "weapon1": null,
	                  "weapon1typ": null,
	                  "weapon2": null,
	                  "weapon2typ": null,
	                  "xcoord": "-95.9902",
	                  "ycoord": "41.245428"
	                }
	              ],
	              "loc": [
	                "-95.9902",
	                "41.245428"
	              ],
	              "reportNumber": "E36888"
	            },
	            "loc": [
	              "-95.9902",
	              "41.245428"
	            ],
	            "date": "08/18/2004 12:00 AM",
	            "type": "CRIME",
	            "category": "STOLEN LOCAL-RCOV LOCAL"
	          }
	]

	return dataSet;
}

function fetchEvents() {
	$.get(baseurl + '/node');
	
	$.getJSON(baseurl + '/node', function(data) {
		console.log(data);
		  //var items = [];

		  //$.each(data, function(key, val) {
		    //items.push('<li id="' + key + '">' + val + '</li>');
		  //});

		});
	}

// define images for different types of data (http://jg.org/mapping/icons.html)
var markerImages = {
	"CRIME": "http://labs.google.com/ridefinder/images/mm_20_red.png",
	"SCHOOL": "http://labs.google.com/ridefinder/images/mm_20_white.png"
};