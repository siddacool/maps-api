import { getAllPlaces, findPlaceByCoordinates } from 'purple-maps-api';
import { Component } from 'domr-framework';
import * as L from 'leaflet';
import InfoDisplay from './InfoDisplay';

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function appendInfoDisplay(thisSelf, data) {
  const infoCreate = new InfoDisplay(data);

  if (document.querySelector('.info')) {
    const infoCreateCopy = document.querySelector('.info');
    infoCreate.Replace(infoCreateCopy);
  } else {
    infoCreate.After(thisSelf);
  }
}

export default class extends Component {
  constructor() {
    super();
  }

  Markup() {
    return `
      <div id="mapid" style="height: 100vh">
      </div>
    `;
  }

  AfterRenderDone() {
    const thisSelf = this.GetThisComponent();
    let mymap = '';

    if (isMobile) {
      mymap = L.map('mapid', {
        minZoom: 2,
        maxZoom: 6,
      }).fitWorld();
    } else {
      mymap = L.map('mapid', {
        minZoom: 2,
        maxZoom: 6,
      });
    }

    const circlesLayer = L.layerGroup();

    mymap.setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mymap);

    const marker = L.marker([0, 0]).addTo(mymap);

    marker.setOpacity(0);

    getAllPlaces()
    .then((places) => {
      places.forEach((p) => {
        const thisPlace = p;
        if (thisPlace.city_id) {
          const thisCity = thisPlace;

          circlesLayer.addLayer(
            L.circle([thisCity.lat, thisCity.lng], {
              color: 'blue',
              fillColor: 'blue',
              opacity: 1,
              fillOpacity: 0.3,
              radius: 70000,
            }),
          );
        } else if (thisPlace.country_id) {
          const thisCountry = thisPlace;

          circlesLayer.addLayer(
            L.circle([thisCountry.lat, thisCountry.lng], {
              color: 'red',
              fillColor: 'red',
              opacity: 1,
              fillOpacity: 0.3,
              radius: 70000,
            }),
          );
        }
      });
      mymap.addLayer(circlesLayer);
    })
    .catch((err) => {
      console.log(err);
    });

    mymap.on('click', (e) => {
      const lat = e.latlng.lat.toFixed(1);
      const lng = e.latlng.lng.toFixed(1);

      marker.setLatLng(e.latlng);
      marker.setOpacity(1);

      findPlaceByCoordinates(lat, lng)
      .then((data) => {
        if (data !== '') {
          appendInfoDisplay(thisSelf, data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    });
  }
}
