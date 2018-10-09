import fetch from "node-fetch";
import config from 'config';

const darksky_api_key = config.get('darksky.api_key');

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const dailyOzone = (location) => {
  const { lat, lng } = location;
  const url = `https://api.darksky.net/forecast/${darksky_api_key}/${lat},${lng}`;

  return fetch(url, { method: 'GET' })
    .then(res => res.json())
    .then(res => {
      const { ozone } = res.currently;

      return { Ozone: ozone };
    })
    .catch(() => ({}));
}

export {
  dailyOzone,
}
