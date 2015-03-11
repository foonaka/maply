// $.get(url).done(function(data) {
//    var location = data.results[0].geometry.location;
//     // alert('lat: ' + location.lat + '\n\nlng: ' + location.lng);
//   });

var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

// Default map on page load
var scotts_house = {
  center: { lat: 39.957139, lng: -86.17521599999999 },
  zoom: 18,
  mapTypeId: google.maps.MapTypeId.HYBRID
};

// Create the map
var map = new google.maps.Map($('#map')[0], scotts_house);

// Add a marker
new google.maps.Marker({
    position: scotts_house.center,
    map: map,
    title:"Eleven Fifty Coding Academy"
});

// Watch for form submit
$('form#geocoder').submit(function(ev) {
  ev.preventDefault();
  var address = this.address.value;

  // Ask Google for the address coordinates
  $.get(url + address).success(function(data) {
    var location = data.results[0].geometry.location;
    var map_options = {
      center: {
        lat: location.lat,
        lng: location.lng
      },
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.HYBRID
    };

    // Move map to new coordinates
    map.setOptions(map_options);

    // Add marker
    var marker = new google.maps.Marker({
        position: map_options.center,
        map: map,
        title: address
    });

  });
});
