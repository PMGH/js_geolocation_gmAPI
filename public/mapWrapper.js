var MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
  this.markers = [];
}

MapWrapper.prototype.addMarker = function(coords){
  var marker = new google.maps.Marker({
    position: coords,
    icon: "/icons/gnss.png",
    infowindowOpen: false,
    map: this.googleMap
  });
  this.markers.push(marker);
  marker.infowindow = new google.maps.InfoWindow({
    content: `${marker.position}`
  });
  marker.addListener('click', function(){
    // partially stack overflow :)
    for (var mark of this.markers){
      if (mark.infowindowOpen){
        mark.infowindow.close();
      }
    }
    marker.infowindow.open(this.googleMap, marker);
    marker.infowindowOpen = true;
  }.bind(this));
}

MapWrapper.prototype.addClickEvent = function(){
  google.maps.event.addListener(this.googleMap, 'click', function(event){
    this.addMarker(event.latLng, "Marker added by user click");
  }.bind(this));
}

MapWrapper.prototype.bounceMarkers = function(){
  this.markers.forEach(function(marker){
    marker.setAnimation(google.maps.Animation.BOUNCE);
  });
}

MapWrapper.prototype.toLocation = function(){
  var location = {lat: 45.398239, lng: 6.5657043};
  this.googleMap.setCenter(location);
}

MapWrapper.prototype.whereAmI = function(){
  navigator.geolocation.getCurrentPosition(function(position){
    var coords = {lat: position.coords.latitude, lng: position.coords.longitude};
    this.googleMap.setCenter(coords);
    this.googleMap.setMapTypeId('satellite');
    this.googleMap.setZoom(19);
    this.addMarker(coords);
  }.bind(this));
}
