import rp from 'request-promise';
import fetch from 'node-fetch';
import config from 'config';

const openweathermap = config.get('openweathermap');

const Pollen_index_over_past_year = async (code) => {
  const days = 360;
  return new Promise(resolve => {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/69.0.3497.81 Chrome/69.0.3497.81 Safari/537.36',
      'Referer': 'https://www.pollen.com/forecast/extended/pollen/' + code + '/' + days,
    };
    const options = {
      uri: 'https://www.pollen.com/api/forecast/historic/pollen/' + code + '/' + days,
      headers: headers,
      json: true
    };

    rp(options)
      .then(data => resolve({
        Pollen_index_over_past_year: data.Location.periods,
      }))
      .catch(err => resolve(err));
  });
}

const currentWeather = zipCode => {

  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${openweathermap.api_key}`;

  return fetch(url, {method: 'GET'})
    .then(res => res.json()) //@TODO error handling 404
    .then(res => {

      if (res.cod === '404') return Promise.reject(new Error(res.message));  //@TODO null ?

      const currentWeather = {
        main: res.main,
        visibility: res.visibility,
        wind: res.wind,
        clouds: res.clouds,
      };

      console.log(currentWeather);

      return Promise.resolve({ currentWeather });
    })
    .catch(err => {
      console.log(err);

      return Promise.reject(err);
    });
}

module.exports = {
  Pollen_index_over_past_year,
  currentWeather,
};
