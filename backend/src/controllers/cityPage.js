import {
  Pollen_index_over_past_year,
  currentWeather,
  minMaxTemperatureAndRainfall,
  ozoneData,
  COData,
} from "./../api/DataForCity";
import emailExistence from 'email-existence';
import { Email } from './../models';

const verifyEmail = (email) => {
  return new Promise((resolve, reject) => {
    emailExistence.check(email, function (error, response) {
      console.log(email, error, response);
      if (error) {
        reject(new Error(`email ${email} doesn't exist`))
      }
      if (!response) {
        reject(new Error(`email ${email} doesn't exist`))
      }
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
    });
  })
};

export default {

  async cityPageData(req, res) {
    try {
      const { code, email } = req.params;
      const promises = [
        Pollen_index_over_past_year(code),
        currentWeather(code),
        minMaxTemperatureAndRainfall(code),
        ozoneData(code),
        COData(code),
        verifyEmail(email)
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
