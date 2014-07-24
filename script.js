$(document).ready(function(){
  function initialize() {
    var mapOptions = {
      center: new google.maps.LatLng(37.7833, -122.4167),
      zoom: 12
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
  };
  google.maps.event.addDomListener(window, 'load', initialize);

  $("#location-select").keydown(function(event) {
    if (event.which === 13){
      determinePosition();
      //Figure out LatLong
      //Make request to Earthquake server
      //Parse result
      //Make request to Google server
      //Parse result
    }
  });

  function determinePosition() {
    var userInput = encodeURIComponent($("#location-select").val());
    var customUrl = "http://maps.googleapis.com/maps/api/geocode/json?address="
    customUrl += userInput;
    $.ajax({
      url: customUrl,
      success: function(resp) {
        var coordObj = resp.results[0].geometry.bounds;
        var north = coordObj.northeast.lat;
        var south = coordObj.southwest.lat;
        var east = coordObj.northeast.lng;
        var west = coordObj.southwest.lng;
        requestEarthquakes(north, south, east, west);
      },
    });
  };

  function requestEarthquakes(north, south, east, west) {
    var customUrl = "http://api.geonames.org/earthquakesJSON?"
    customUrl += "north=" + north;
    customUrl += "&south=" + south;
    customUrl += "&east=" + east;
    customUrl += "&west=" + west;
    customUrl += "&username=sammilechman";
    $.ajax({
      url: customUrl,
      success: function(resp) {
        moveMap(north, south, east, west);
        plotEarthquakes(resp.earthquakes);
      },
    });
  };

  function moveMap(north, south, east, west) {
    var map = new google.maps.Map(document.getElementById("map-canvas"));
    var bounds = new google.maps.LatLngBounds();
    var southwest = new google.maps.LatLng(south, west);
    var northeast = new google.maps.LatLng(north, east);
    bounds.extend(southwest);
    bounds.extend(northeast);
    map.fitBounds(bounds);
  };

  function plotEarthquakes(arr) {
    // var map = new google.maps.Map(document.getElementById("map-canvas"));
    for (var x = 0; x < 3; x++) {
console.log(x)
      var eq = arr[x];
      var latLng = new google.maps.LatLng(eq.lat, eq.lng);
      var marker = new google.maps.Marker({
        position: latLng,
        // map: map,
        title: "hello world!"
      })
    }
  };

});
