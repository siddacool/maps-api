import firebase from 'firebase';

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

    dbRefObject.push({
      country_id: countryId,
      name,
      country_code: countryCode,
      lat,
      lng,
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

        Object.keys(valueSnap).forEach((key) => {
          const thisCity = valueSnap[key];
          const thisLatRound = Math.round(thisCity.lat);
          const thisLngRound = Math.round(thisCity.lng);
          const latRound = Math.round(lat);
          const lngRound = Math.round(lng);
          const latMax = latRound + 2;
          const lngMax = lngRound + 2;
          const latMin = latRound - 2;
          const lngMin = lngRound - 2;

          if (thisLatRound <= latMax && thisLatRound >= latMin
            && thisLngRound <= lngMax && thisLngRound >= lngMin) {
            resolve(thisCity);
            return;
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

function findCityByCoordinates(lat, lng) {
  const promiseObj = new Promise((resolve, reject) => {
    const dbRefObject = firebase.database().ref();
    dbRefObject.once('value', (snap) => {
      if (snap.val()) {
        const valueSnap = snap.val();

        Object.keys(valueSnap).forEach((key) => {
          const thisCity = valueSnap[key];
          if (thisCity.city_id) {
            const thisLatRound = Math.round(thisCity.lat);
            const thisLngRound = Math.round(thisCity.lng);
            const latRound = Math.round(lat);
            const lngRound = Math.round(lng);
            const latMax = latRound + 2;
            const lngMax = lngRound + 2;
            const latMin = latRound - 2;
            const lngMin = lngRound - 2;

            if (thisLatRound <= latMax && thisLatRound >= latMin
              && thisLngRound <= lngMax && thisLngRound >= lngMin) {
              resolve(thisCity);
              return;
            }
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

function findCountryByCoordinates(lat, lng) {
  const promiseObj = new Promise((resolve, reject) => {
    const dbRefObject = firebase.database().ref();
    dbRefObject.once('value', (snap) => {
      if (snap.val()) {
        const valueSnap = snap.val();

        Object.keys(valueSnap).forEach((key) => {
          const thisCountry = valueSnap[key];
          if (thisCountry.country_id) {
            const thisLatRound = Math.round(thisCountry.lat);
            const thisLngRound = Math.round(thisCountry.lng);
            const latRound = Math.round(lat);
            const lngRound = Math.round(lng);
            const latMax = latRound + 2;
            const lngMax = lngRound + 2;
            const latMin = latRound - 2;
            const lngMin = lngRound - 2;

            if (thisLatRound <= latMax && thisLatRound >= latMin
              && thisLngRound <= lngMax && thisLngRound >= lngMin) {
              resolve(thisCountry);
              return;
            }
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
  findCityByCoordinates,
  findCountryByCoordinates,
  getAllPlaces,
  getAllCities,
  getAllCountries,
};
