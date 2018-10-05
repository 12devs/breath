import rp from 'request-promise';
import fetch from 'node-fetch';
import config from 'config';

const openweathermap = config.get('openweathermap');
const google_api_key = config.get('google.api_key');

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

  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${openweathermap.api_key}&units=${openweathermap.units}`;

  return fetch(url, { method: 'GET' })
    .then(res => res.json()) //@TODO error handling 404
    .then(res => {

      if (res.cod === '404') return Promise.reject(new Error(res.message));  //@TODO null ?
      const { humidity, pressure, temp, temp_max, temp_min } = res.main;
      const currentWeather = {
        humidity,
        pressure,
        temp,
        temp_max,
        temp_min,
        visibility: res.visibility,
        wind: res.wind,
        clouds: res.clouds.all,
      };

      return Promise.resolve(currentWeather);
    })
    .catch(err => {
      console.log(err);

      return Promise.reject(err);
    });
}

const minMaxTemperatureAndRainfall = zipCode => {

  return getCurrentLocation(zipCode)
    .then(location => {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lng}&appid=${openweathermap.api_key}&cnt=${openweathermap.cnt}&units=${openweathermap.units}`;

      return fetch(url, { method: 'GET' });
    })
    .then(res => res.json())
    .then(res => {

      const { list } = res;

      const data = {
        temp_min: 0,
        temp_max: 0,
        rain: 0,
        snow: 0,
      };

      list.forEach((row, index) => {

        data.temp_min = row.main.temp_min < data.temp_min || index === 0 ? row.main.temp_min : data.temp_min;
        data.temp_max = row.main.temp_max > data.temp_max || index === 0 ? row.main.temp_max : data.temp_max;

        const rain = (row.rain || {})['3h'];
        const snow = (row.snow || {})['3h'];

        data.rain = rain > data.rain ? rain : data.rain;
        data.snow = snow > data.snow ? snow : data.snow;

      });

      return {
        Lowest_Temperature: data.temp_min,
        Highest_Temperature: data.temp_max,
        Most_Amount_of_Rain: data.rain,
        Most_Amount_of_Snow: data.snow,
      };
    })
    .catch(err => Promise.reject(err));
}

const ozoneData = zipCode => {

  return getCurrentLocation(zipCode)
    .then(location => {
      const url = `https://api.openweathermap.org/pollution/v1/o3/${location.lat},${location.lng}/current.json?appid=${openweathermap.api_key}`;

      return fetch(url, { method: 'GET' });
    })
    .then(res => res.json()) //@TODO error handling 404
    .then(res => {

      if (res.message === 'not found') return Promise.reject(new Error('ozone data not found'));  //@TODO null ?

      return { ozoneData: res.data };
    })
    .catch(err => Promise.reject(err));
}

const COData = zipCode => {

  return getCurrentLocation(zipCode)
    .then(location => {
      const url = `https://api.openweathermap.org/pollution/v1/co/${location.lat},${location.lng}/current.json?appid=${openweathermap.api_key}`;

      return fetch(url, { method: 'GET' });
    })
    .then(res => res.json())
    .then(res => Promise.resolve({ COData: res.data }))
    .catch(err => Promise.reject(err));

}

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
        lat: (location.lat).toFixed(0),
        lng: (location.lat).toFixed(0),
      };

      return Promise.resolve(currentLocation);
    })
    .catch(err => Promise.reject(err));
}

module.exports = {
  Pollen_index_over_past_year,
  currentWeather,
  minMaxTemperatureAndRainfall,
  ozoneData,
  COData,
};
