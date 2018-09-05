import firebase from 'firebase/app';
import 'firebase/database';
import { Component } from 'domr-framework';
import * as L from 'leaflet';
import InfoCreate from '../components/InfoCreate';
import InfoEdit from '../components/InfoEdit';
import { findPlaceByCoordinates } from '../utils/firebase-db-manipulation';

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function appendInfoCreate(thisSelf, lat, lng) {
  const infoCreate = new InfoCreate(lat, lng);

  if (document.querySelector('.info')) {
    const infoCreateCopy = document.querySelector('.info');
    infoCreate.Replace(infoCreateCopy);
  } else {
    infoCreate.After(thisSelf);
  }
}

function appendInfoEdit(thisSelf, data) {
  const infoEdit = new InfoEdit(data);

  if (document.querySelector('.info')) {
    const infoCreateCopy = document.querySelector('.info');
    infoEdit.Replace(infoCreateCopy);
  } else {
    infoEdit.After(thisSelf);
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
    const dbRefObject = firebase.database().ref();
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

    dbRefObject.on('value', (snap) => {
      if (snap.val()) {
        circlesLayer.clearLayers();
        const valueSnap = snap.val();

        Object.keys(valueSnap).forEach((key) => {
          const thisPlace = valueSnap[key];

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
      } else {
        console.error('NO DATA');
      }
    });

    mymap.on('click', (e) => {
      const lat = e.latlng.lat.toFixed(1);
      const lng = e.latlng.lng.toFixed(1);

      marker.setLatLng(e.latlng);
      marker.setOpacity(1);

      findPlaceByCoordinates(lat, lng)
      .then((data) => {
        if (data === '') {
          appendInfoCreate(thisSelf, lat, lng);
        } else {
          console.log(data);
          appendInfoEdit(thisSelf, data);
        }
      })
      .catch(() => {
        appendInfoCreate(thisSelf, lat, lng);
      });
    });
  }
}
