var map = {};

var map_rendered = false;
var markersArray = {};
var curr_buses = {};
var image;
var first_load = true;


function createTable(tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}


function initMap() {
  var umd = {lat: 38.9869, lng: -76.9426 };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: umd
  });

  map_rendered = true;

  image = {
    url: 'buses.svg',
    scaledSize: new google.maps.Size(60, 60)
  };


}


setInterval(function(){
  $.get("http://api.umd.io/v0/bus/locations", function(response) {

    // the API response data
    buses = response.vehicle;

    // looping through every bus from the API call
    for (i = 0; i < buses.length; i++) {

      // storing the current bus
      bus = buses[i];

      // generating a latlng dict for this bus
      var latlng = {};
      latlng['lat'] = parseFloat(bus['lat']);
      latlng['lng'] = parseFloat(bus['lon']);

      // generating a bus_obj for this bus
      // this is what gets stored in a list
      // if this changes between API calls
      // then we know we need to update this bus_obj
      bus_obj = {id: bus['id'], latlng: latlng}

      // getting the old bus_obj from the dictionary
      // we retrieve it using the bus's key
      old_bus = curr_buses[bus_obj['id']]


      // we compare the old_bus string to the new bus_obj
      // if the strings match, then this bus did not have a lat long update
      // and we should leave it alone and not draw a new bus marker
      if (old_bus == JSON.stringify(bus_obj)) {


      } else {
        // if they did not match, that means we have a new bus_obj
        // this means we should update the old one
        // or if this is the first load, then we set it for the firs time

        // updating the curr_buses dictionary
        curr_buses[bus_obj['id']] = JSON.stringify(bus_obj)
        console.log('\n\nupdating bus #', bus_obj['id'])
        console.log(Object.keys(curr_buses).length)
        $('#update').text('Just updated bus #' + bus_obj['id']);
        $('#bus-count').text(Object.keys(curr_buses).length);
        // removing the bus marker from the map
        // first we check if it exists
        // if it doesn't, then this is probably the first load of the map
        if (markersArray[bus_obj['id']] != null) {
            markersArray[bus_obj['id']].setMap(null);
        }


        // drawing new bus marker on the map
        var marker = new google.maps.Marker({
          position: latlng,
          icon: image,
          draggable: false,
          map : map
        });

        // pushing the new marker object to the markersArray
        // the key is the bus's ID and the value is the marker object
        markersArray[bus_obj['id']] = marker;
      }

  }


  first_load = false;
  });
}, 1000);
