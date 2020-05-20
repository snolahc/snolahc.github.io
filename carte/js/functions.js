function getAddr(lat, lng) {
    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + gmaps_api_key;
    var xhttp = new XMLHttpRequest();
    xhttp.open("get", url, false);
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    return response["results"][0]["formatted_address"];
}

function getLatLng(address) {
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURI(address) + "&key=" + gmaps_api_key;
    var xhttp = new XMLHttpRequest();
    xhttp.open("get", url, false);
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    if (response["results"][0]["geometry"]["location"]["lat"]) {
      var coord = {
        lat: response["results"][0]["geometry"]["location"]["lat"],
        lng: response["results"][0]["geometry"]["location"]["lng"]
      }
      return coord;
    } else {
      return null;
    }
}
