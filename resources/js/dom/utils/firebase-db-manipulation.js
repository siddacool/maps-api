import * as firebase from 'firebase/app';
import 'firebase/database';

function saveCityData(obj = {}) {
  const promiseObj = new Promise((resolve, reject) => {
    const dbRefObject = firebase.database().ref();
    let date = new Date();
    date = Date.parse(date);
    const cityId = `city-${date}`;
    const name = obj.name;
    const countryCode = obj.country_code;
    const lat = obj.lat;
    const lng = obj.lng;
    const isCapital = obj.isCapital;
    const area = obj.area;
    const timezone = obj.timezone;

    dbRefObject.push({
      city_id: cityId,
      name,
      country_code: countryCode,
      lat,
      lng,
      isCapital,
      timezone,
      area,
    })
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
  });
  return promiseObj;
}

function saveCountryData(obj = {}) {
  const promiseObj = new Promise((resolve, reject) => {
    const dbRefObject = firebase.database().ref();
    let date = new Date();
    date = Date.parse(date);
    const countryId = `country-${date}`;
    const name = obj.name;
    const countryCode = obj.country_code;
    const lat = obj.lat;
    const lng = obj.lng;
    const timezone = obj.timezone || [];

    dbRefObject.push({
      country_id: countryId,
      name,
      country_code: countryCode,
      lat,
      lng,
      timezone,
    })
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
  });
  return promiseObj;
}

function updateCityData(cityId, obj = {}) {
  const promiseObj = new Promise((resolve, reject) => {
    const dbRefObject = firebase.database().ref();
    const name = obj.name;
    const countryCode = obj.country_code;
    const lat = obj.lat;
    const lng = obj.lng;
    const isCapital = obj.isCapital;
    const area = obj.area;
    const timezone = obj.timezone;

    dbRefObject.once('value', (snap) => {
      if (snap.val()) {
        const valueSnap = snap.val();

        Object.keys(valueSnap).forEach((key) => {
          const thisCity = valueSnap[key];

          if (thisCity.city_id === cityId) {
            dbRefObject.child(key).update({
              name,
              country_code: countryCode,
              lat,
              lng,
              isCapital,
              timezone,
              area,
            });
          }
        });

        resolve('');
      } else {
        reject('NO DATA');
      }
    }).catch(() => {
      reject();
    });
  });
  return promiseObj;
}

function updateCountryData(countryId, obj = {}) {
  const promiseObj = new Promise((resolve, reject) => {
    const dbRefObject = firebase.database().ref();
    const name = obj.name;
    const countryCode = obj.country_code;
    const lat = obj.lat;
    const lng = obj.lng;
    const timezone = obj.timezone || [];

    dbRefObject.once('value', (snap) => {
      if (snap.val()) {
        const valueSnap = snap.val();

        Object.keys(valueSnap).forEach((key) => {
          const thisCountry = valueSnap[key];

          if (thisCountry.country_id === countryId) {
            dbRefObject.child(key).update({
              name,
              country_code: countryCode,
              lat,
              lng,
              timezone,
            });
          }
        });

        resolve('');
      } else {
        reject('NO DATA');
      }
    }).catch(() => {
      reject();
    });
  });
  return promiseObj;
}

function deleteCityData(cityId) {
  const promiseObj = new Promise((resolve, reject) => {
    const dbRefObject = firebase.database().ref();

    dbRefObject.once('value', (snap) => {
      if (snap.val()) {
        const valueSnap = snap.val();

        Object.keys(valueSnap).forEach((key) => {
          const thisCity = valueSnap[key];

          if (thisCity.city_id === cityId) {
            dbRefObject.child(key).remove();
            resolve();
          }
        });

        reject('No data to delete');
      } else {
        reject('NO DATA');
      }
    }).catch(() => {
      reject();
    });
  });
  return promiseObj;
}

function deleteCountryData(countryId) {
  const promiseObj = new Promise((resolve, reject) => {
    const dbRefObject = firebase.database().ref();

    dbRefObject.once('value', (snap) => {
      if (snap.val()) {
        const valueSnap = snap.val();

        Object.keys(valueSnap).forEach((key) => {
          const thisCity = valueSnap[key];

          if (thisCity.country_id === countryId) {
            dbRefObject.child(key).remove();
            resolve();
          }
        });

        reject('No data to delete');
      } else {
        reject('NO DATA');
      }
    }).catch(() => {
      reject();
    });
  });
  return promiseObj;
}

function findPlaceByCoordinates(lat, lng) {
  const promiseObj = new Promise((resolve, reject) => {
    const dbRefObject = firebase.database().ref();
    dbRefObject.once('value', (snap) => {
      if (snap.val()) {
        const valueSnap = snap.val();
        let toSend = '';
        const arr = [];
        const totalDiff = lat - lng;

        Object.keys(valueSnap).forEach((key) => {
          const thisPlace = valueSnap[key];
          const thisLat = thisPlace.lat;
          const thisLng = thisPlace.lng;
          const total = thisLat - thisLng;
          const latMin = +thisLat - 0.18;
          const latMax = +thisLat + 0.18;
          const lngMin = +thisLng - 0.18;
          const lngMax = +thisLng + 0.18;

          thisPlace.total = total;

          if (lat <= latMax && lat >= latMin && lng <= lngMax && lng >= lngMin) {
            arr.push(thisPlace);
          }
        });

        if (arr.length && arr.length > 0) {
          let diff = '';

          for (let i = 0; i < arr.length; i++) {
            const thisPlace = arr[i];
            const total = thisPlace.total;
            const thisDiff = totalDiff - total;

            if (diff === '' || diff > thisDiff) {
              diff = thisDiff;
              toSend = thisPlace;
            }
          }
        }

        resolve(toSend);
      } else {
        reject('NO DATA');
      }
    }).catch(() => {
      reject();
    });
  });

  return promiseObj;
}

function findCountryByCountryCode(countryCode) {
  const promiseObj = new Promise((resolve, reject) => {
    const dbRefObject = firebase.database().ref();
    dbRefObject.once('value', (snap) => {
      if (snap.val()) {
        const valueSnap = snap.val();
        const toPush = '';

        Object.keys(valueSnap).forEach((key) => {
          const thisCountry = valueSnap[key];

          if (thisCountry.country_id && thisCountry.country_code === countryCode) {
            resolve(thisCountry);
            return;
          }
        });

        resolve(toPush);
      } else {
        reject('NO DATA');
      }
    }).catch(() => {
      reject();
    });
  });

  return promiseObj;
}

function getAllPlaces() {
  const promiseObj = new Promise((resolve, reject) => {
    const dbRefObject = firebase.database().ref();
    dbRefObject.once('value', (snap) => {
      if (snap.val()) {
        const valueSnap = snap.val();
        const arr = [];

        Object.keys(valueSnap).forEach((key) => {
          const thisPlace = valueSnap[key];

          arr.push(thisPlace);
        });

        resolve(arr);
      } else {
        reject('NO DATA');
      }
    }).catch(() => {
      reject();
    });
  });

  return promiseObj;
}

function getAllCities() {
  const promiseObj = new Promise((resolve, reject) => {
    const dbRefObject = firebase.database().ref();
    dbRefObject.once('value', (snap) => {
      if (snap.val()) {
        const valueSnap = snap.val();
        const arr = [];

        Object.keys(valueSnap).forEach((key) => {
          const thisCity = valueSnap[key];

          if (thisCity.city_id) {
            arr.push(thisCity);
          }
        });

        resolve(arr);
      } else {
        reject('NO DATA');
      }
    }).catch(() => {
      reject();
    });
  });

  return promiseObj;
}

function getAllCountries() {
  const promiseObj = new Promise((resolve, reject) => {
    const dbRefObject = firebase.database().ref();
    dbRefObject.once('value', (snap) => {
      if (snap.val()) {
        const valueSnap = snap.val();
        const arr = [];

        Object.keys(valueSnap).forEach((key) => {
          const thisCountry = valueSnap[key];

          if (thisCountry.country_id) {
            arr.push(thisCountry);
          }
        });

        resolve(arr);
      } else {
        reject('NO DATA');
      }
    }).catch(() => {
      reject();
    });
  });

  return promiseObj;
}

export {
  saveCityData,
  saveCountryData,
  updateCityData,
  updateCountryData,
  deleteCityData,
  deleteCountryData,
  findPlaceByCoordinates,
  findCountryByCountryCode,
  getAllPlaces,
  getAllCities,
  getAllCountries,
};
