import db from '../indexed-storage';

function saveCityData(lat, lng) {
  const promiseObj = new Promise((resolve, reject) => {
    let date = new Date();
    date = Date.parse(date);
    db.cities.put({ lat, lng, date })
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err.stack || err);
    });
  });
  return promiseObj;
}

function getCityDataAll() {
  const promiseObj = new Promise((resolve, reject) => {
    db.cities.orderBy('date').toArray((data) => {
      if (data && data.length) {
        resolve(data);
      } else {
        reject('No Data');
      }
    }).catch((err) => {
      reject(err.stack || err);
    });
  });

  return promiseObj;
}

function getCityByCoordinates(lat, lng) {
  const promiseObj = new Promise((resolve, reject) => {
    db.cities.orderBy('date').toArray((data) => {
      if (data && data.length) {
        for (let i = 0; i < data.length; i++) {
          const thisCity = data[i];
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

        resolve('');
      } else {
        reject('No Data');
      }
    }).catch((err) => {
      reject(err.stack || err);
    });
  });

  return promiseObj;
}

export {
  saveCityData,
  getCityDataAll,
  getCityByCoordinates,
};
