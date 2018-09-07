import * as firebase from 'firebase/app';
import 'firebase/database';
import MapBase from './MapBase';
import InfoCreate from '../components/InfoCreate';
import InfoEdit from '../components/InfoEdit';
import { findPlaceByCoordinates } from '../utils/firebase-db-manipulation';

function appendInfoCreate(thisSelf, lat, lng, type = 'country', data = {}) {
  const infoCreate = new InfoCreate(lat, lng, type, data);

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
      const geoSearch = thisSelf.querySelector('.geosearch');
      const rect = geoSearch.getBoundingClientRect();
      const containerPoint = e.containerPoint;
      const left = rect.left + scrollX;
      const top = rect.top + scrollY;
      const bottom = rect.bottom + scrollY;
      const right = rect.right + scrollX;
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      const isClickOnSearch = containerPoint.x > left && containerPoint.x < right && containerPoint.y > top && containerPoint.y < bottom;

      if (!isClickOnSearch) {
        marker.setLatLng(e.latlng);
        marker.setOpacity(1);

        findPlaceByCoordinates(lat, lng)
        .then((data) => {
          if (data === '') {
            appendInfoCreate(thisSelf, lat, lng);
          } else {
            appendInfoEdit(thisSelf, data);
          }
        })
        .catch(() => {
          appendInfoCreate(thisSelf, lat, lng);
        });
      }
    });

    mymap.on('geosearch/showlocation', (e) => {
      const location = {
        lat: e.location.y,
        lng: e.location.x,
      };

      const isCity = e.location.raw.address.city
                     && e.location.raw.address.city !== '';

      const name = isCity ? e.location.raw.address.city : e.location.raw.address.country;
      const type = isCity ? 'city' : 'country';
      const countryCode = e.location.raw.address.country_code.toUpperCase();
      const dataObj = {
        name,
        country_code: countryCode,
      };

      marker.setLatLng(location);
      marker.setOpacity(1);

      findPlaceByCoordinates(location.lat, location.lng)
      .then((data) => {
        if (data === '') {
          appendInfoCreate(thisSelf, location.lat, location.lng, type, dataObj);
        } else {
          appendInfoEdit(thisSelf, data);
        }
      })
      .catch(() => {
        appendInfoCreate(thisSelf, location.lat, location.lng, type, dataObj);
      });
    });
  }
}
