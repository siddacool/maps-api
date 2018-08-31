import { Component } from 'domr-framework';
import * as L from 'leaflet';
import { saveCityData, getCityDataAll, getCityByCoordinates } from '../utils/db-manipulation';

export default class extends Component {
  constructor() {
    super();
  }

  Markup() {
    return `
      <div class="home">
        <div id="mapid" class="map" style="height: 100vh;"></div>
      </div>
    `;
  }

  AfterRenderDone() {
    const thisSelf = this.GetThisComponent();
    const mymap = L.map('mapid', {
      minZoom: 2,
      maxZoom: 6,
    });

    mymap.setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mymap);

    getCityDataAll()
    .then((data) => {
      const thisData = data;

      thisData.forEach((c) => {
        const thisCity = c;

        L.circle([thisCity.lat, thisCity.lng], {
          color: 'blue',
          fillColor: 'blue',
          opacity: 1,
          fillOpacity: 0.3,
          radius: 70000,
        }).addTo(mymap);
      });
    })
    .catch((err) => {
      console.log(err);
    });

    mymap.on('click', (e) => {
      const lat = e.latlng.lat.toFixed(1);
      const lng = e.latlng.lng.toFixed(1);

      getCityByCoordinates(lat, lng)
      .then((data) => {
        if (data === '') {
          console.log('called');
          saveCityData(lat, lng)
          .then(() => {
            L.circle([lat, lng], {
              color: 'blue',
              fillColor: 'blue',
              opacity: 1,
              fillOpacity: 0.3,
              radius: 70000,
            }).addTo(mymap);
          })
          .catch((err) => {
            console.log(err);
          });
        }

        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        saveCityData(lat, lng)
          .then(() => {
            L.circle([lat, lng], {
              color: 'blue',
              fillColor: 'blue',
              opacity: 1,
              fillOpacity: 0.3,
              radius: 70000,
            }).addTo(mymap);
          })
          .catch((err1) => {
            console.log(err1);
          });
      });
    });
  }
}
