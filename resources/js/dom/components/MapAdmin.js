import * as firebase from 'firebase/app';
import 'firebase/database';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import MapBase from './MapBase';
import InfoCreate from '../components/InfoCreate';
import InfoEdit from '../components/InfoEdit';
import { findPlaceByCoordinates } from '../utils/firebase-db-manipulation';

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

export default class extends MapBase {
  constructor() {
    super();
  }

  MapArea(thisSelf, mymap, circlesLayer, marker) {
    const dbRefObject = firebase.database().ref();

    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
    });

    mymap.addControl(searchControl);


    dbRefObject.on('value', (snap) => {
      if (snap.val()) {
        circlesLayer.clearLayers();
        const valueSnap = snap.val();

        Object.keys(valueSnap).forEach((key) => {
          const thisPlace = valueSnap[key];

          if (thisPlace.city_id) {
            const thisCity = thisPlace;

            circlesLayer.addLayer(
              this.MakeCircle(thisCity.lat, thisCity.lng, 'city'),
            );
          } else if (thisPlace.country_id) {
            const thisCountry = thisPlace;

            circlesLayer.addLayer(
              this.MakeCircle(thisCountry.lat, thisCountry.lng, 'country'),
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
