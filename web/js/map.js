function initialize() {
	var myOptions = {
	center: new google.maps.LatLng(41.25917,-95.93386),
	zoom: 12,
	mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	// load data
	var dataSet = fetchData();
	
	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
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

			google.maps.event.addListener(markers[i], 'click', (function(marker) { 
				return function () {
					alert("I am marker " + marker.getTitle());
				};
			})(markers[i]));
			
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
			  "type": "crime"
		  },
		  {
			  "title": "Another point",
			  "lat": 41.26916,
			  "lng": -95.9418,
			  "type": "trafficStop"
		  }
		];

	return dataSet;
}

// define images for different types of data (http://jg.org/mapping/icons.html)
var markerImages = {
	"crime": "http://labs.google.com/ridefinder/images/mm_20_red.png",
	"trafficStop": "http://labs.google.com/ridefinder/images/mm_20_white.png"
};