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
  constructor(config = {}) {
    super();
    this.locate = config.locate || false;
    this.locate_pop = config.locate_pop || false;
  }

  MapArea(thisSelf, mymap, circlesLayer, marker) {
    const isLocate = this.locate;
    const isLocatePop = this.locate_pop;

    console.log(isLocate, isLocatePop);

    if (isLocate) {
      mymap.locate({ setView: true, maxZoom: 6 });
    }

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
      const geoSearch = thisSelf.querySelector('.geosearch');
      const rect = geoSearch.getBoundingClientRect();
      const containerPoint = e.containerPoint;
      const left = rect.left + scrollX;
      const top = rect.top + scrollY;
      const bottom = rect.bottom + scrollY;
      const right = rect.right + scrollX;
      const lat = e.latlng.lat.toFixed(1);
      const lng = e.latlng.lng.toFixed(1);
      const isClickOnSearch = containerPoint.x > left && containerPoint.x < right && containerPoint.y > top && containerPoint.y < bottom;

      if (!isClickOnSearch) {
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
      }
    });

    mymap.on('geosearch/showlocation', (e) => {
      const loaction = {
        lat: e.location.y,
        lng: e.location.x,
      };
      marker.setLatLng(loaction);
      marker.setOpacity(1);

      FindPlaceByCoordinates(loaction.lat, loaction.lng)
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

    mymap.on('locationfound', (e) => {
      marker.setLatLng(e.latlng);
      marker.setOpacity(1);

      if (isLocatePop) {
        FindPlaceByCoordinates(e.latlng.lat, e.latlng.lng)
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
      }
    });
  }
}
