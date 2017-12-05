var initialise = function(){
  var container = document.getElementById('main-map');
  var center = {lat: 55.856946, lng: -4.244088}
  var zoom = 10;
  var mainMap = new MapWrapper(container, center, zoom);
  mainMap.addMarker(center);

  var sseHydro = {lat: 55.860189, lng: -4.2851830}
  mainMap.addMarker(sseHydro);

  mainMap.addClickEvent();

  var bounceButton = document.getElementById('button-bounce-markers');
  bounceButton.addEventListener('click', mainMap.bounceMarkers.bind(mainMap));
}

window.addEventListener('load', initialise);
