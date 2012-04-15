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
	
	infowindow = new google.maps.InfoWindow({"maxWidth":175});
	
	google.maps.event.addListener(map, 'click', function(event) {
		// call web service here to get data about this point
		
		// add a marker here, and load data about this location
		infowindow.close();
		infowindow.setContent("<center><img src='/images/ajax-loader.gif'></center>");
		infowindow.setPosition(event.latLng);
		infowindow.open(map);
		
		fetchEvents(event.latLng.lat(),event.latLng.lng());
		//console.log(event.latLng.lat(),event.latLng.lng());
	  });

	listenForBoundsChange();
	
    map.overlayMapTypes.insertAt(0, new google.maps.ImageMapType({
        getTileUrl: function (tile, zoom) {
        	var sliderData = getSliderData();
            var base = '/heatmap';
            map_name = 'goodCrime';
            color_scheme = 'classic';
            url = base +'/'+ map_name +'/' + 
            sliderData["crimeSlider"] + '/' +
            sliderData["policeSlider"] + '/' +
            sliderData["accidentSlider"] + '/' +
            color_scheme +'/'+ zoom +'/'
            url += tile.x +','+ tile.y +'.png';
            return url;
        },
        tileSize: new google.maps.Size(256, 256),
        isPng: true
    }));
    	
	// load data
	
	//fetchData();
        
        map_foursquare_points();

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
	
	var urlParams = "minX=" + minX + "&minY=" + minY + "&maxX=" + maxX + "&maxY=" + maxY;
	$.getJSON(baseurl + '/node/stats?' + urlParams, function(data) {
		//crime-facts
		//cops-facts
		// ol
		
		var i = 0;
		var crimes = data.topCrimes;
		var officers = data.topOfficers;
		
		var topCrimesContent = "<ol>";
		for (i = 0; i < crimes.length; i++)
		{
			var crimeData = crimes[i];
			topCrimesContent += "<li>" + crimeData.crime + ": " + crimeData.count + "</li>";
		}
		topCrimesContent += "</ol>";
		
		var topOfficersContent = "<ol>";
		for (i = 0; i < officers.length; i++)
		{
			var officerData = officers[i];
			topOfficersContent += "<li>Badge #" + officerData.officer + ": " + officerData.count + "</li>";
		}
		topOfficersContent += "</ol>";
		
		$("#crime-facts").html(topCrimesContent);
		$("#cops-facts").html(topOfficersContent);
		
		console.info("Update stats complete. " + data);
	});
	
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
	console.log('sliders updated, will update map now.');
    //map.setCenter(map.getBounds().getCenter());
    var zoom = map.getZoom();
    map.setZoom(zoom + 1);
    map.setZoom(zoom);
	google.maps.event.trigger(map,'resize');
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

function fetchEvents(lat,lng) {
	console.log('fetchEvents called.');
	$.getJSON(baseurl + '/node/CRIME?x=' + lng + '&y=' + lat + '&radius=25&meta=true', handleEvents);
	}

function handleEvents(data) {
	var html = '';
	for (var i = 0; i < data.items.length; i++) {
		html += '<p><b>' + data.items[i].category + '</b><br>' +
		data.items[i].meta.crimeOffenseWithXy[0].occuradd +
		'</p>';
	}

	var finalHtml = "<div class='infowindow'>" + html + "</div>";
	infowindow.setContent(finalHtml.toLowerCase());
}

// define images for different types of data (http://jg.org/mapping/icons.html)
var markerImages = {
	"CRIME": "http://labs.google.com/ridefinder/images/mm_20_red.png",
	"SCHOOL": "http://labs.google.com/ridefinder/images/mm_20_white.png"
};

