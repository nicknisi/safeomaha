var geocoder;
var map;

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
		//fetchDetail(event.latLng.lat(),event.latLng.lng())
		
		// add a marker here, and load data about this location

	    console.log(event.latLng.lat(),event.latLng.lng());
	  });
	
	var infowindow = new google.maps.InfoWindow({"maxWidth":50});
	
	// load data
	var dataSet = fetchData();
	
	var markers = new Array();
		for (var i = 0; i < dataSet.length; i++) {
			markers[i] = new google.maps.Marker({
				position: new google.maps.LatLng(dataSet[i].lat, dataSet[i].lng),
				title: dataSet[i].title,
				map: map
			});
			
			if (markerImages[dataSet[i].type])
				markers[i].setIcon(markerImages[dataSet[i].type]);
			
			console.log('test ' + markers[i].getTitle());

			google.maps.event.addListener(markers[i], 'click', (function(marker,dataSetRow) { 
				return function () {
					infowindow.setContent(dataSetRow.detail);
					infowindow.open(map, marker);
				};
			})(markers[i],dataSet[i]));
			
		}

	}

function fetchData() {
	// place holder function. This will fetch data later
	var dataSet =
		[
		  {
			  "title": "Some point",
			  "lat": 41.25768,
			  "lng": -95.9442,
			  "type": "crime",
			  "detail": "<h1>Crime</h1><p>Someone was robbed here</p>"
		  },
		  {
			  "title": "Another point",
			  "lat": 41.26916,
			  "lng": -95.9418,
			  "type": "trafficStop",
			  "detail": "<h1>Traffic Stop</h1><p>Todd got a speeding ticket here</p>"
		  }
		];

	return dataSet;
}

// define images for different types of data (http://jg.org/mapping/icons.html)
var markerImages = {
	"crime": "http://labs.google.com/ridefinder/images/mm_20_red.png",
	"trafficStop": "http://labs.google.com/ridefinder/images/mm_20_white.png"
};