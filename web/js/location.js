function onLocationKeyPress(event)
{	
	var charCode = event.charCode;
	
	if (charCode == 13)
	{
		// cancel timer
		updateLocation($("#locationInput").val());
	}
	else
	{
		// set timer
		console.info(String.fromCharCode(charCode).toUpperCase());
	}
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

var myLocationMarker;

function geocodeResultHandler(r, status)
{
	console.info("geocode complete: " + r[0]);
	map.setCenter(r[0].geometry.location);
	
	if (!myLocationMarker)
	{
		myLocationMarker = new google.maps.Marker({map: map});
	}
	
	myLocationMarker.setPosition(r[0].geometry.location);
}
