//google map
if ($("#map-canvas").length) {
jQuery(document).ready(function($) {
	
	"use strict";

		var map;
		function initialize() {
		  var mapOptions = {
		    zoom: 12,
		    center: new google.maps.LatLng(1.2734, 36.8481)
		  };
		  map = new google.maps.Map(document.getElementById('map-canvas'),
		      mapOptions);
		      var marker = new google.maps.Marker({
		        map: map,
		        icon: "images/map-marker.png",
		        title: "Eastleigh",
		        position: map.getCenter()
		      });
		      var marker2 = new google.maps.Marker({
		        map: map,
		        icon: "images/map-marker2.png",
		        title: "Nairobi",
		        position: new google.maps.LatLng(1.2921, 1.2921)
		      });
		      var marker3 = new google.maps.Marker({
		        map: map,
		        icon: "images/map-marker3.png",
		        title: "Kenya",
		        position: new google.maps.LatLng(0.0236, 37.9062)
		      });



		      var infowindow = new google.maps.InfoWindow();
		      infowindow.setContent('<b>Eastleigh</b>');

		      var infowindow2 = new google.maps.InfoWindow();
		      infowindow2.setContent('<b>Nairobi</b>');

		      var infowindow3 = new google.maps.InfoWindow();
		      infowindow3.setContent('<b>Kenya</b>');

		      infowindow.open(map, marker);


		      google.maps.event.addListener(marker, 'click', function() {
		        infowindow.open(map, marker);
		      });
		      google.maps.event.addListener(marker2, 'click', function() {
		        infowindow2.open(map, marker2);
		      });
		      google.maps.event.addListener(marker3, 'click', function() {
		        infowindow3.open(map, marker3);
		      });
		}

		google.maps.event.addDomListener(window, 'load', initialize);
});
}