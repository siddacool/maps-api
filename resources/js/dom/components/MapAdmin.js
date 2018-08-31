import firebase from 'firebase';
import { Component } from 'domr-framework';
import * as L from 'leaflet';

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
    const dbRefObject = firebase.database().ref();
    const mymap = L.map('mapid', {
      minZoom: 2,
      maxZoom: 6,
    });

    mymap.setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mymap);
  }
}
