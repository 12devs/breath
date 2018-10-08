import fetch from "node-fetch";
import config from 'config';
import { getCurrentLocation } from './location';

const darksky_api_key = config.get('darksky.api_key');

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const dailyOzone = zipCode => {

  return getCurrentLocation(zipCode)
    .then(location => {
      const url = `https://api.darksky.net/forecast/${darksky_api_key}/${location.lat},${location.lng}`;

      return fetch(url, { method: 'GET' });
    })
    .then(res => res.json())
    .then(res => {
      const { ozone } = res.currently;

       return Promise.resolve({ Ozone: ozone });
    })
    .catch(err => Promise.reject(err));
}

export {
  dailyOzone,
}

export default () => {
  return ([
    {
      Name: "Abbeville",
      PM: getRndInteger(5, 15),
      Ozone: getRndInteger(5, 15),
      Pollen: getRndInteger(5, 15),
      AQI: getRndInteger(5, 15),
      code: 36310,
    },
    {
      Name: "Abernant",
      PM: getRndInteger(5, 15),
      Ozone: getRndInteger(5, 15),
      Pollen: getRndInteger(5, 15),
      AQI: getRndInteger(5, 15),
      code: 35440,
    },
    {
      Name: "Addison",
      PM: getRndInteger(5, 15),
      Ozone: getRndInteger(5, 15),
      Pollen: getRndInteger(5, 15),
      AQI: getRndInteger(5, 15),
      code: 35540,
    },
    {
      Name: "Adger",
      PM: getRndInteger(5, 15),
      Ozone: getRndInteger(5, 15),
      Pollen: getRndInteger(5, 15),
      AQI: getRndInteger(5, 15),
      code: 35006,
    },
  ])
}
