import rp from 'request-promise';
import fetch from 'node-fetch';
import config from 'config';
import moment from 'moment';

const openweathermap = config.get('openweathermap');
const google_api_key = config.get('google.api_key');
const api_waqi_info = config.get('api_waqi_info');
const wwo_api_key = config.get('worldweatheronline.api_key');

const historicPollenIndex = (code, days = 360) => {
  return new Promise(resolve => {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/69.0.3497.81 Chrome/69.0.3497.81 Safari/537.36',
      'Referer': `https://www.pollen.com/forecast/extended/pollen/${code}/${days}`,
    };
    const options = {
      uri: `https://www.pollen.com/api/forecast/historic/pollen/${code}/${days}`,
      headers: headers,
      json: true
    };

    rp(options)
      .then(data => resolve({
        Pollen_index_over_past_year: data.Location.periods,
      }))
      .catch(err => resolve({}))
  });
};

const currentWeather = code => {

  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${code},us&appid=${openweathermap.api_key}&units=${openweathermap.units}`;

  return fetch(url, { method: 'GET' })
    .then(res => res.json()) //@TODO error handling 404
    .then(res => {
      if (res.cod === '404') return ({});  //@TODO null ?
      const { humidity, pressure, temp, temp_max, temp_min } = res.main;
      return {
        humidity,
        pressure,
        temp,
        temp_max,
        temp_min,
        visibility: res.visibility,
        wind: res.wind,
        clouds: res.clouds.all,
      };
    })
    .catch(() => {
      return {};
    });
}

const minMaxTemperatureAndRainfall = location => {
  const Name = location.name;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lng}&appid=${openweathermap.api_key}&cnt=${openweathermap.cnt}&units=${openweathermap.units}`;
  return fetch(url, { method: 'GET' })
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
        Name,
      };
    })
    .catch(err => ({}));
};

const ozoneData = location => {
  const url = `https://api.openweathermap.org/pollution/v1/o3/${location.lat},${location.lng}/current.json?appid=${openweathermap.api_key}`;

  return fetch(url, { method: 'GET' })
    .then(res => res.json()) //@TODO error handling 404
    .then(res => {
      if (res.message === 'not found') return {};  //@TODO null ?

      return { ozoneData: res.data };
    })
    .catch(() => ({}));
}

const COData = location => {
  const url = `https://api.openweathermap.org/pollution/v1/co/${location.lat},${location.lng}/current.json?appid=${openweathermap.api_key}`;

  return fetch(url, { method: 'GET' })
    .then(res => res.json())
    .then(res => ({ COData: res.data }))
    .catch(() => ({}));

}

const pollenIndex = (code) => {
  return new Promise(resolve => {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/69.0.3497.81 Chrome/69.0.3497.81 Safari/537.36',
      'Referer': `https://www.pollen.com/forecast/current/pollen/${code}`,
    };
    const options = {
      uri: `https://www.pollen.com/api/forecast/current/pollen/${code}`,
      headers: headers,
      json: true
    };

    rp(options)
      .then(data => resolve({
        Pollen_index: data.Location.periods[1].Index,
      }))
      .catch(err => resolve({}));
  });
};

const aqiIndex = (location) => {
  return new Promise(resolve => {
      const options = {
        uri: `http://aqimap.hellowynd.com:8000/api/air/closestStation?lat=${location.lat}&lng=${location.lng}`,
        json: true
      };
      rp(options)
        .then(data => resolve({
          AQI_Today: data.aqi,
        }))
        .catch(err => resolve({}));
    });
};

const getPhotoReference = (location) => {
  return new Promise(resolve => {
      const options = {
        uri: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=2000&key=${google_api_key}`,
        json: true
      };
      rp(options)
        .then(data => resolve(data.results[0].photos[0].photo_reference))
        .catch(err => resolve({}));
  });
};

const getPhoto = (location, maxWidth = 1600) => {
  return new Promise(resolve => {
    getPhotoReference(location).then(ref => {
      console.log(ref);
      const options = {
        uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${ref}&key=${google_api_key}`,
        json: true,
        transform: (body, res) => {
          return res.request.uri.href;
        }
      };

      rp(options)
        .then(body => resolve({ Img: body }))
        .catch(err => resolve({ Img: err }));
    })
  });
};

const apiWaqiInfo = (location) => {
  return new Promise(resolve => {
      const options = {
        uri: `https://api.waqi.info/feed/geo:${location.lat};${location.lng}/?token=${api_waqi_info.api_key}`,
        json: true
      };

      rp(options)
        .then(data => {
          const apiWaqi = data.data.iaqi;
          const result = {};
          for (let key in apiWaqi) {
            result[key] = apiWaqi[key].v;
          }
          return resolve({apiWaqiInfo:result});
        })
        .catch(err => resolve(err));
  });
};

const historicTemperatureAndHumidity = (code) => {

  const currentMoment = moment();
  const endDate = currentMoment.format("YYYY-MM-DD");
  const startDate = currentMoment.subtract(30, 'days').format("YYYY-MM-DD");

  const url = `http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=${wwo_api_key}&q=${code}&format=json&date=${startDate}&enddate=${endDate}&tp=24`;

  return fetch(url, { method: 'GET' })
    .then(res => res.json())
    .then(res => {
      const { weather } = res.data;

      const result = weather.map(day => {

        const { hourly } = day;
        const item = {
          date: day.date,
          temp: 0,
          humidity: 0,
        };

        if (hourly.length) {
          item.temp = (hourly[0] || {}).tempC;
          item.humidity= (hourly[0] || {}).humidity;
        }

        return item;
      });

      return { result }
    })
    .catch(() => ({}));
}

const getStationId = (location) => {
  return new Promise(resolve => {
      const options = {
        uri: `https://api-ak.wunderground.com/api/d8585d80376a429e/conditions/labels/lang:EN/units:english/bestfct:1/v:2.0/q/${location.lat},${location.lng}.json`,
        json: true
      };
      console.log(options);
      rp(options)
        .then(data => {
          return resolve(data.current_observation.station.id)
        })
        .catch(err => resolve({}));
    })
};

const getHistoricalData = (code, start = '20181005', end = '20181008') => {
  return new Promise(resolve => {
    getStationId(code).then(id => {
      const options = {
        uri: `https://api-ak.wunderground.com/api/606f3f6977348613/history_${start}${end}/units:metric/v:2.0/q/pws:${id}.json?showObs=0`,
        json: true
      };
      console.log(options);
      rp(options)
        .then(data => {
          return resolve({Historical: data.history.days})
        })
        .catch(err => resolve({}));
    })
  });
};

module.exports = {
  historicPollenIndex,
  currentWeather,
  minMaxTemperatureAndRainfall,
  ozoneData,
  COData,
  pollenIndex,
  aqiIndex,
  getPhoto,
  apiWaqiInfo,
  historicTemperatureAndHumidity,
  getHistoricalData
};
