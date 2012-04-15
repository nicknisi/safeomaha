var myLocationMarker;

var locationTimer;
var locationWait = 900; // interval of inactivity until location updates automatically
var locationAutoMinChars = 4; // min chars needed to set auto commit timer for location in map

var ratingChangeTimer;
var ratingChangeWait = 500; // interval of inactivity after changing a rating range slider before committing update

function onLocationKeyPress(event)
{	
	var charCode = event.charCode;
	var locationValue = getLocationValue();
	
	// cancel timer
	if (locationTimer)
	{
		clearTimeout(locationTimer);
	}
	
	if (charCode == 13)
	{
		updateLocation(locationValue);
	}
	else if (locationValue.length > locationAutoMinChars)
	{
		// set timer
		locationTimer = setTimeout("locationTimeoutHandler()", locationWait);
		console.info(String.fromCharCode(charCode).toUpperCase());
	}
}



function getLocationValue()
{
	return $("#locationInput").val();
}



function locationTimeoutHandler()
{
	console.info("Automatically updating location based on new location");
	updateLocation(getLocationValue());
}



function updateLocation(location)
{
	console.info("Updating location: " + location);
	var requestData = {
		address: location
	};
	
	// results.geometry.location
	
	geocoder.geocode(requestData, geocodeResultHandler);
}



function geocodeResultHandler(r, status)
{
	console.info("Geocode complete. Status: " + status);
	
	if (status == google.maps.GeocoderStatus.OK)
	{
		var coordinate = r[0].geometry.location;
		if (!myLocationMarker) {
			myLocationMarker = new google.maps.Marker({
				map: map
			});
		}
		
		myLocationMarker.setPosition(coordinate);
		map.setCenter(coordinate);
	}
}



function onRatingChange(event, ratingType)
{
	ratingValue = event.currentTarget.value;
	console.info(ratingType + " rating changed to " + ratingValue);
	
	if (ratingChangeTimer)
	{
		clearTimeout(ratingChangeTimer);
	}
	
	var method = "updateRating(\"" + ratingType + "\"," + ratingValue + ")";
	ratingChangeTimer = setTimeout(method, ratingChangeWait);
}

function updateRating(ratingType, ratingValue)
{
	console.info("Updating " + ratingType + " rating value: " + ratingValue);
	
	var sliderData = {
		"crimeSlider": $('#crimeSlider').val(),
		"policeSlider": $('#policeSlider').val(),
		"accidentSlider": $('#accidentSlider').val()
	};

	updateHeatmap( sliderData );
	
	if (ratingType == "crime")
	{
	}
	else if (ratingType == "police")
	{
	}
	else if (ratingType == "accidents")
	{
	}
}
