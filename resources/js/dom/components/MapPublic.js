import { GetAllPlaces, FindPlaceByCoordinates } from 'purple-maps-api';
import MapBase from './MapBase';
import InfoDisplay from './InfoDisplay';

function appendInfoDisplay(thisSelf, data) {
  const infoCreate = new InfoDisplay(data);

  if (document.querySelector('.info')) {
    const infoCreateCopy = document.querySelector('.info');
    infoCreate.Replace(infoCreateCopy);
  } else {
    infoCreate.After(thisSelf);
  }
}

function clearInfoDisplay() {
  if (document.querySelector('.info')) {
    const infoCreate = document.querySelector('.info');
    infoCreate.parentElement.removeChild(infoCreate);
  }
}

export default class extends MapBase {
  constructor() {
    super();
  }

  MapArea(thisSelf, mymap, circlesLayer, marker) {
    GetAllPlaces()
    .then((places) => {
      places.forEach((p) => {
        const thisPlace = p;
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
    })
    .catch((err) => {
      console.log(err);
    });

    mymap.on('click', (e) => {
      const lat = e.latlng.lat.toFixed(1);
      const lng = e.latlng.lng.toFixed(1);

      marker.setLatLng(e.latlng);
      marker.setOpacity(1);

      FindPlaceByCoordinates(lat, lng)
      .then((data) => {
        if (data !== '') {
          appendInfoDisplay(thisSelf, data);
        } else {
          clearInfoDisplay();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    });
  }
}
