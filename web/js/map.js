		function initialize() {
			var myOptions = {
			center: new google.maps.LatLng(41.25917,-95.93386),
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
			};
		
		var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
			var markers = new Array();
			for (var i = 0; i < dataSet.length; i++) {
				markers[i] = new google.maps.Marker({
					position: new google.maps.LatLng(dataSet[i].Lat, dataSet[i].Lng),
					title: dataSet[i].title,
					map: map
				});
				
			}

		}
		
		// fake an array of points. This would be returned by an ajax call
		var dataSet =
			[
			  {
				  "title": "Some point",
				  "Lat": 41.25768,
				  "Lng": -95.9442
			  },
			  {
				  "title": "Another point",
				  "Lat": 41.26916,
				  "Lng": -95.9418
			  }
			]
				