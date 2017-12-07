var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

var requestComplete = function(){
  if (this.status != 200) return;
  var jsonString = this.responseText;
  var apiData = JSON.parse(jsonString);
  var points = apiData.points;
  populateMap(points);
}

var populateMap = function(points){
  var container = document.getElementById('main-map');
  var center = {lat: 55.856946, lng: -4.244088}
  var zoom = 10;
  var mainMap = new MapWrapper(container, center, zoom);
  mainMap.addMarker(center);

  for (var point of points){
    var location = {lat: parseFloat(point.latitude), lng: parseFloat(point.longitude)};
    mainMap.addMarker(location);
  }

  var sseHydro = {lat: 55.860189, lng: -4.2851830}
  mainMap.addMarker(sseHydro);

  mainMap.addClickEvent();

  var bounceButton = document.getElementById('button-bounce-markers');
  bounceButton.addEventListener('click', mainMap.bounceMarkers.bind(mainMap));

  // var meribelButton = document.getElementById('button-to-meribel');
  // var meribelCoords = {lat: 45.398239, lng: 6.5657043};
  // meribelButton.addEventListener('click', mainMap.toLocation.bind(mainMap));

  var jakartaButton = document.getElementById('jakarta');
  jakartaButton.addEventListener('click', function(){
    var jakarta = {lat: -6.051, lng: 106.865};
    mainMap.centerFunction(jakarta);
  })

  var whereAmIButton = document.getElementById('button-where-am-i');
  whereAmIButton.addEventListener('click', mainMap.whereAmI.bind(mainMap));

  var deleteMarkerButton = document.getElementById('button-delete-markers');
  deleteMarkerButton.addEventListener('click', mainMap.removeMarker.bind(mainMap));
};

var initialise = function(){

  // request data from API
  var url = "http://tour-guider.herokuapp.com/api/tours/2";
  makeRequest(url, requestComplete);

}

window.addEventListener('load', initialise);
