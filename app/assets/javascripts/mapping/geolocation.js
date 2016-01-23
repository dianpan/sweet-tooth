$(document).ready(function(){
	var lng = $("#user_long");
	var lat = $("#user_lat");

function getLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
	    }
	}

	function setPosition(position) {
	    lat.val(position.coords.latitude)
	    lng.val(position.coords.longitude)
			var latStr = lat.val();
			var lngStr = lng.val();
	    var latitude = parseFloat(lat.val())
	    var longitude = parseFloat(lng.val())

	    storeLocation(lngStr,latStr);

		initMap(longitude,latitude)

	}

	//takes 2 strings
	function storeLocation(lng,lat){

			 var saveLoc = sessionStorage.setItem('loc', '{ "longitude": ' + lng + ', "latitude": ' + lat + '}');
			 var locString = sessionStorage.getItem('loc');
			 var locObj = JSON.parse(locString);
			 console.log(locObj);

	}

	function initMap(longitude,latitude) {
		var mapCenter = {lat: latitude, lng: longitude}
	    var mapOptions = {
	      zoom: 16,
	      center: mapCenter,
	      scrollwheel: false,
	      draggable:false
	    }
	    map = new google.maps.Map(document.getElementById("map"), mapOptions);

	    var marker = new google.maps.Marker({
	    position: mapCenter,
	    map: map
	  });
	}

getLocation();



});
