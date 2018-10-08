import fetch from "node-fetch";
import config from 'config';

const google_api_key = config.get('google.api_key');

const getCurrentLocation = zipCode => {

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${google_api_key}`;

  return fetch(url, { method: 'GET' })
    .then(res => res.json())
    .then(res => {

      if (res.status !== 'OK') return Promise.reject(new Error('zip code not found'));  //@TODO null ?
      if (!res.results.length) return Promise.reject(new Error('zip code not found'));  //@TODO null ?

      const currentResult = res.results[0];
      const { location } = currentResult.geometry;

      const currentLocation = {
        lat: (location.lat).toFixed(4),
        lng: (location.lng).toFixed(4),
        // name: currentResult.address_components.find(elem => {
        //   return elem.types.indexOf('locality') > -1;
        // }).long_name,
      };

      return Promise.resolve(currentLocation);
    })
    .catch(err => Promise.reject(err));
}

export {
  getCurrentLocation,
}