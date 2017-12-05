var MapWrapper = function(container, coords, zoom){
  // this.googleMap is just a variable name
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
  this.markers = [];
}

MapWrapper.prototype.addMarker = function(coords){
  // accessing the google.maps API
  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });
  this.markers.push(marker);
  var infowindow = new google.maps.InfoWindow({
    content: `${marker.position}`
  });
  marker.addListener('click', function(){
    infowindow.open(this.googleMap, marker);
  });
}

MapWrapper.prototype.addClickEvent = function(){
  google.maps.event.addListener(this.googleMap, 'click', function(event){
    // console.log(event);
    // console.log('You have clicked on the Map.');
    // console.log(event.latLng.lat() + ", " + event.latLng.lng());
    // var clickPosition = {lat: event.latLng.lat(), lng: event.latLng.lng()};
    // this.addMarker(clickPosition);
    this.addMarker(event.latLng, "Marker added by user click");
  }.bind(this));
}

MapWrapper.prototype.bounceMarkers = function(){
  this.markers.forEach(function(marker){
    marker.setAnimation(google.maps.Animation.BOUNCE);
  });
}