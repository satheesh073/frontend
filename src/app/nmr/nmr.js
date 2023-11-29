// your-component.component.js

// Declare the 'google' variable
var google;

// Your component logic
angular
  .module("yourModuleName")
  .controller("YourComponentController", YourComponentController);

YourComponentController.$inject = ["$scope"];

function YourComponentController($scope) {
  var map;

  // Initialize the map
  function initMap() {
    var mapOptions = {
      center: { lat: 0, lng: 0 }, // Set initial center coordinates
      zoom: 8, // Set initial zoom level
    };

    // Create a new map instance
    map = new google.maps.Map(
      document.getElementById("yourMapDiv"),
      mapOptions
    );

    // Add a click event listener to the map
    map.addListener("click", function (event) {
      handleMapClick(event);
    });
  }

  // Handle map click event
  function handleMapClick(event) {
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();

    // Do something with latitude and longitude (e.g., update input fields)
    $scope.$apply(function () {
      $scope.latitude = latitude;
      $scope.longitude = longitude;
    });
  }

  // Call the initMap function
  initMap();
}
