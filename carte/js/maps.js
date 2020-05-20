
function bindInfoWindow(marker, description) {
    marker.addListener('click', function() {
        infowindow.setContent(description);
        infowindow.open(map, this);
    });
}

function addVenueOnMap(id) {
  console.log("ADDING POINT");
  console.log(id);
  console.log(venues["v" + id]);
  console.log(events[venues["v" + id].events[0]]);
  var content = '<div id="content">'+
        '<div id="siteNotice"></div>'+
        '<h1 id="firstHeading" class="firstHeading">'+venues["v" + id].name+'</h1>'+
        '<div id="bodyContent"><ul>';
  venues["v" + id].events.forEach(function (item, index) {
    content += '<li><h3>' + events[item].name + '</h3>' + (events[item].description !== null ? events[item].description.slice(0, 128) : "") + '<br><a href="'+events[item].url+'" target="_blank">Link to the event</a></li>';
  });
  content +='</li></ul></div></div>';
  var onMap = new google.maps.Marker({
    map: map,
    position: getPosFromAddress(venues["v" + id].address.localized_address_display),
    title: venues["v" + id].name,
    animation: google.maps.Animation.DROP,
  });
//  onMap.setMap(map);
  bindInfoWindow(onMap, content);

  onMap.addListener('click', function() {
    infowindow.open(map, onMap);
  });
  venues["v" + id].onMap = onMap;
}
