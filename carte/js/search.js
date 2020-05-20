var eventbrite_api_key = "OBGGO723JKTC6SZDFKDC";

self.onmessage = function (msg) {
  console.log(msg);
  switch (msg.data.type) {
    case 'events':
      askEventbrite(msg.data);
      break;
    case 'venue':
      askEventbriteVenue(msg.data);
      break;
    default:
      throw 'no aTopic on incoming message to ChromeWorker';
  }
};


function askEventbrite(req) {
  var xhttp = new XMLHttpRequest();
  var url = "https://www.eventbriteapi.com/v3/events/search/?token=" + eventbrite_api_key + "&location.latitude=" + req.lat + "&location.longitude=" + req.lng + "&location.within=" + req.loc_within + "km&start_date.range_start=" + req.date_start + "&start_date.range_end=" + req.date_end + "&q=";
  console.log("URL : " + "https://www.eventbriteapi.com/v3/events/search/?token=" + eventbrite_api_key + "&location.latitude=" + req.lat + "&location.longitude=" + req.lng + "&location.within=" + req.loc_within + "km&start_date.range_start=" + req.date_start + "&start_date.range_end=" + req.date_end + "&q=");
  xhttp.open("get", url, false);
  xhttp.send();
  var response = JSON.parse(xhttp.responseText);
  response.events.forEach(function (item, index) {
    var tmp = {
      name: response.events[index].name.html,
      description: response.events[index].description.text,
      desc_html: response.events[index].description.html,
      time_start: response.events[index].start,
      time_end: response.events[index].end,
      url: response.events[index].url,
      logo: response.events[index].logo,
      venue: response.events[index].venue_id,
    };
    // console.log(tmp);
    self.postMessage({type: 'event', id: item.id, item: tmp});
  });
  self.postMessage({type: 'event', id: null, item: null});
}

function askEventbriteVenue(item) {
  // console.log("ADD VENUE");
  // console.log(item);
  if (item.venue_id !== null) {
    vhttp = new XMLHttpRequest();
    vurl = "https://www.eventbriteapi.com/v3/venues/" + item.venue_id + "/?token=" + eventbrite_api_key;
    console.log(vurl);
    vhttp.open("get", vurl, false);
    vhttp.send();
    var vresponse = JSON.parse(vhttp.responseText);
    var vtmp = {
      name: vresponse.name,
      address: vresponse.address,
      events: item.events,
    };
    self.postMessage({type: 'venue', id: item.venue_id, item: vtmp});
  } else {
      self.postMessage({type: 'end_loading'});
  }
//Add here HTTP call to find organizer ID for URL
}
