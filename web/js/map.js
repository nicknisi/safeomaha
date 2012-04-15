var geocoder;
var map;
var infowindow;
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
	
	infowindow = new google.maps.InfoWindow({"maxWidth":50});
	
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
	
	
	listenForBoundsChange();
	
	// load data
	
	//fetchData();

}

function listenForBoundsChange()
{
	google.maps.event.addListenerOnce(map, 'bounds_changed', function(){
		google.maps.event.addListenerOnce(map, 'idle', function(){
			updateStats();
			listenForBoundsChange();
		});
	});
}

function updateStats()
{
	var bounds = map.getBounds();
	// pass extent to service
	var minX = bounds.getSouthWest().lng(); // minX = SW x
	var minY = bounds.getSouthWest().lat(); // minY = SW y
	var maxX = bounds.getNorthEast().lng(); // maxX = NE x
	var maxY = bounds.getNorthEast().lat(); // maxY = NE y
	
	console.info("Update stats based on map extent minX: " + minX + ", minY: " + minY + ", maxX: " + maxX + ", maxY: " + maxX );
}

function drawMarkers(data) {
console.log(data);
	dataSet = data.items;
	var markers = new Array();
	for (var i = 0; i < dataSet.length; i++) {
		//console.log('Will place marker at ' + dataSet[i].loc[0] + ' ' + dataSet[i].loc[1])
		markers[i] = new google.maps.Marker({
			position: new google.maps.LatLng(dataSet[i].loc[1], dataSet[i].loc[0]),
			title: dataSet[i].type,
			map: map
		});
		
		if (markerImages[dataSet[i].type])
			markers[i].setIcon(markerImages[dataSet[i].type]);
		
		google.maps.event.addListener(markers[i], 'click', (function(marker,dataSetRow) { 
			return function () {
				infowindow.setContent(makeInfoWindowContent(dataSetRow));
				infowindow.open(map, marker);
			};
		})(markers[i],dataSet[i]));
		
	}
}

function updateHeatmap(sliderData) {
	console.log('test');
	console.log(sliderData);
}

function makeInfoWindowContent(dataSetRow) {
	var html = '<div class="infowindow">';
	html += dataSetRow.category + '<br>' + dataSetRow.date + '<br>';
	//console.log(dataSetRow);
	//html += 'Offense: ' + dataSetRow.meta.crimeOffenseWithXy[0].offensedes;
	html += '</div>';
	return html.toLowerCase();
}

function fetchData() {
	// place holder function. This will fetch data later

	$.getJSON(baseurl + '/node/ACCIDENT?meta=true', function(data) {
		drawMarkers(data);
	});

}

function fetchEvents() {
	
	return;
	
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