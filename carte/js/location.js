function setPosition(loc) {
  if (map != null) {
    map.setCenter(loc);
    var marker = new google.maps.Marker({
      position: loc,
      map: map
    });
  }
  myloc = loc;
}

function setLocation(address) {
  setPosition(getLatLng(address));
}

function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  myloc = {lat: position.coords.latitude, lng: position.coords.longitude};
  setPosition(myloc);
  document.getElementById("loc_addr").value = getAddr(position.coords.latitude, position.coords.longitude);
}

getMyLocation();
