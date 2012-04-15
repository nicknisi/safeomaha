function map_foursquare_points() {
   var access_token = window.location.hash.split('=')[1];
   if (access_token) {
      createCookie('access_token', access_token, 1000);
   }
   console.debug('Your access_token is ' + readCookie('access_token'));
   access_token = readCookie('access_token');
   if (!access_token) {
      return; 
   }

   var url = 'https://api.foursquare.com/v2/users/self/checkins?oauth_token=' + access_token;
   $.ajax({
      url: url, 
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {
         console.debug('success! ' + textStatus + ' ' + data.response.checkins.count);
         map_foursquare_points_yes_really(data.response.checkins.items);
      }
   });
}


function map_foursquare_points_yes_really(items) {
   var markers = new Array();
   for (var i in items) {
      (function(){
         var createdat =  items[i].createdAt;
         var name =       items[i].venue.name;
         var url =        items[i].venue.url;
         var lat =        items[i].venue.location.lat;
         var lng =        items[i].venue.location.lng;
         var address =    items[i].venue.location.address;
         var city =       items[i].venue.location.city;
         var state =      items[i].venue.location.state;
         var postalcode = items[i].venue.location.postalCode;
         var country =    items[i].venue.location.country;
         console.debug(name + ' ' + lat + ' ' + lng);

         var created = new Date(createdat * 1000);
         var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            title:    name,
            map:      map,
            icon:     "/images/marker_sprite.png"
         });
         google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(
               '<a href="' + url + '">' + name + '</a><br/>' + 
               created.toDateString() + '<br/>' + 
               address + '<br/>' + city + ', ' + state + ' ' + postalcode + ' ' + country
            );
            infowindow.open(map, marker);
         });
      })();
   }
}


// http://www.quirksmode.org/js/cookies.html
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}



