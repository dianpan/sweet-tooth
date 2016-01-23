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
	    var latitude = parseFloat(lat.val())
	    var longitude = parseFloat(lng.val())

		initMap(longitude,latitude)

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
