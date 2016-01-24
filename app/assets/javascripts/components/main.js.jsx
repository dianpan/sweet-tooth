var Main = React.createClass({
  getInitialState: function(){
    return {
      data:null,
      longitude:'',
      latitude:'',
      location:'',
      showCone:true
    }
  },
  componentDidMount(){
    console.log('initial state:', this.state)

    this.getLocation();
  },
  sendStateData: function(){
    var formData = {
      location: {
        longitude:this.state.longitude,
        latitude:this.state.latitude
      }
    }
    $.ajax({
      url: "/searches",
      dataType: 'json',
      type: 'POST',
      data: formData,
      success: function(result) {
        this.setState({data:result.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error( status, err.toString());
      }.bind(this)
    });
  },
  render: function(){
    if (this.state.showCone) {
      return (
        <div>
        <image className="ice-cream" onClick={this.handleIceCreamClick} src={this.props.img_src} />
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  },
  handleIceCreamClick: function(){
    this.setLocation();
    var map = $('#map');
    map.removeClass('hide-map');
    map.addClass('show-map');
    this.setState({showCone:false})
  },
  getLocation: function(){
    var lng = $("#user_long");
    var lat = $("#user_lat");
    function getCoordinates() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
      }
    }
    function setPosition(position) {
      lat.val(position.coords.latitude)
      lng.val(position.coords.longitude)
      console.log('inside set location', this.state)
    }
    getCoordinates();
  },
  setLocation: function(){
    var long=$("#user_long").val()
    var lat=$("#user_lat").val()
    this.setState({longitude:long})
    this.setState({latitude:lat})
  },
  componentDidUpdate: function(){
    if(this.state.data===null) {
      if (this.state.longitude && this.state.latitude) {
        this.sendStateData();
      }
    } else {
      this.showMap();
    }
  },
  showMap: function(){

    function initMap(longitude,latitude,dataArray) {
      var latitude = parseFloat(latitude)
      var longitude = parseFloat(longitude)
      var mapCenter = new google.maps.LatLng({lat: latitude, lng: longitude})
      var mapOptions = {
        zoom: 16,
        center: mapCenter,
        scrollwheel: false,
        draggable:false
      }
      map = new google.maps.Map(document.getElementById("map"), mapOptions);


      var selfMarker = new google.maps.Marker({
        position: mapCenter,
        map: map
      });

      var IceCreamCoords = [];
      var iceCreamMarkers = [];

      for (var i = 0; i < dataArray.length; i++) {
        var coords= {lat: dataArray[i]['latitude'], lng: dataArray[i]['longitude']};
        var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">' + dataArray[i]['name'] + '</h1>'+
        '<div id="bodyContent">'+
        '<img src=' + dataArray[i]['rating'] + '/>'+
        '<p><b> ' + dataArray[i]['phone'] + '</b></p>'+
        '<p> ' + dataArray[i]['address'] + '</p>'+
        '</div>'+
        '</div>';
        iceCreamMarkers[i] = createMarker({
          position:new google.maps.LatLng(coords),
          map: map,
          title: 'ice cream',
          icon: "http://31.media.tumblr.com/tumblr_ls9k18YAcI1qg66hv.gif",
          optimized: false
        }, contentString);
        iceCreamMarkers[i].addListener('click', toggleBounce);
        // iceCreamMarkers[i].addListener('mouseover', openInfoWindow);
        // iceCreamMarkers[i].addListener('mouseout', closeInfoWindow);
      };
    }

    function createMarker(options, html) {
      var marker = new google.maps.Marker(options);
      if (html) {
        var infoWindow = new google.maps.InfoWindow({
          content: html
        });
        google.maps.event.addListener(marker, "mouseover", function() {
          infoWindow.setContent(html);
          infoWindow.open(options.map, this);
        });
        google.maps.event.addListener(marker, "mouseout", function() {
          infoWindow.close(options.map, this);
        });
      }
      return marker;
    }

    function openInfoWindow() {
      infoWindow.open(map, this);
    }

    function closeInfoWindow() {
      infoWindow.close(map, this);
    }

    function toggleBounce() {
      if (this.getAnimation()) {
        this.setAnimation(null);
      } else {
        this.setAnimation(google.maps.Animation.BOUNCE);
      }
    }







    initMap(this.state.longitude,this.state.latitude, this.state.data)
    console.log(this.state.data.length);
  }
});
