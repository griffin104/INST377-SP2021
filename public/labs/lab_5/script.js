function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  let map = L.map('map')
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ3JpZmZpbjEwNCIsImEiOiJja20xeDgzNzEwY2tiMnZwaWJtYjI5aDMyIn0.s7LL5rA1pRQVxasgzgsFIw'
}).addTo(map);
  return map;
}

async function dataHandler(mapObjectFromFunction) {
  const search = document.querySelector('#search');
  const filteredList = document.querySelector('#filteredList')

  let filteredPlaces = [];

  function findMatches(search, places) {
    return places.filter(place => {
        const regex = new RegExp(search, 'gi');
        return place.zip.match(regex)
    });
  }

  function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
  }

  function applyMarkers(map) {
    map.eachLayer(function (layer) {
      map.removeLayer(layer)
    })
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ3JpZmZpbjEwNCIsImEiOiJja20xeDgzNzEwY2tiMnZwaWJtYjI5aDMyIn0.s7LL5rA1pRQVxasgzgsFIw'
    }).addTo(map);
    map.setView([filteredPlaces[0].geocoded_column_1.coordinates[1], filteredPlaces[0].geocoded_column_1.coordinates[0]], 13);
    L.marker([filteredPlaces[0].geocoded_column_1.coordinates[1], filteredPlaces[0].geocoded_column_1.coordinates[0]]).addTo(mapObjectFromFunction)
    L.marker([filteredPlaces[1].geocoded_column_1.coordinates[1], filteredPlaces[1].geocoded_column_1.coordinates[0]]).addTo(mapObjectFromFunction)
    L.marker([filteredPlaces[2].geocoded_column_1.coordinates[1], filteredPlaces[2].geocoded_column_1.coordinates[0]]).addTo(mapObjectFromFunction)
    L.marker([filteredPlaces[3].geocoded_column_1.coordinates[1], filteredPlaces[3].geocoded_column_1.coordinates[0]]).addTo(mapObjectFromFunction)
    L.marker([filteredPlaces[4].geocoded_column_1.coordinates[1], filteredPlaces[4].geocoded_column_1.coordinates[0]]).addTo(mapObjectFromFunction)
  }

  function displayMatches() {
    fetch("/api")
        .then(res => res.json())
        .then(json => {
          removeChildren(filteredList)
          filteredPlaces = []
          if (search.value != "") {
            filteredPlaces = findMatches(search.value, json)
            filteredPlaces = filteredPlaces.slice(0,5);
            filteredPlaces.forEach(place => {
            filteredList.insertAdjacentHTML('beforeend', `<li class='card mt-4'>
              <div class="card-content">
              <div class="content">
              <p class="title is-3">${place.name}</p>
              <p class="subtitle is-5">${place.category}</p>
              <address>${place.address_line_1}<br/>${place.address_line_2}<br/>
                  ${place.city}, ${place.state}. ${place.zip}</address>
              </div>
              </div>
            </li>`)
        })
      } 
      console.log(filteredPlaces)
      applyMarkers(mapObjectFromFunction)
    })
  }


  search.addEventListener('change', displayMatches);
  search.addEventListener('keyup', displayMatches);
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;