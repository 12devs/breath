import {
  historicPollenIndex,
  currentWeather,
  minMaxTemperatureAndRainfall,
  ozoneData,
  COData,
  pollenIndex,
  aqiIndex,
  getPhoto,
  apiWaqiInfo,
  getHistoricalData
} from "./../api/DataForCity";
import emailExistence from 'email-existence';
import { Email } from './../models';

const verifyEmail = (email) => {
  return new Promise((resolve, reject) => {
    emailExistence.check(email, function (error, response) {
      console.log(email, error, response);
      if (error || (!response)) {
        return reject(new Error(`email ${email} doesn't exist`))
      } else {
        return Email.findOrCreate({
          where: { email },
          defaults: { email, created_at: new Date(), updated_at: new Date() }
        })
          .then(() => {
            return resolve(true)
          })
          .catch(err => {
            console.log(err);
            return reject(err)
          })
      }
    });
  })
};

export default {

  async cityPageData(req, res) {
    try {
      const { code, email } = req.params;
      const promises = [
        historicPollenIndex(code),
        currentWeather(code),
        minMaxTemperatureAndRainfall(code),
        ozoneData(code),
        COData(code),
        pollenIndex(code),
        aqiIndex(code),
        getPhoto(code),
        verifyEmail(email),
        apiWaqiInfo(code),
        getHistoricalData(code)
      ];
      return Promise.all(promises)
        .then(result => {
          const data = {
            Code: code,
          };
          result.forEach(elem => {
            Object.assign(data, elem);
          });
          return res.status(200).json(data)
        })
        .catch(err => {
          return res.status(500).json({ error: err.message })
        })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}
