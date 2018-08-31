import Dexie from 'dexie';

const db = new Dexie('map-api-temp-data-1');
db.version(1).stores({
  cities: 'lat, lng, date',
});

export default db;
