import { dailyOzone } from '../api/MainData';
import { getCurrentLocation } from '../api/location';
import { pollenIndex, aqiIndex, apiWaqiInfo, getPhoto } from '../api/DataForCity';

export default {

  async mainPageData (req, res) {

    const { codes } = req.query;
    const zipCodes = codes.split(',');

    const data = zipCodes.map(async code => {
      const location = await getCurrentLocation(code);
      const promises = [
        dailyOzone(location),
        pollenIndex(code),
        aqiIndex(location),
        apiWaqiInfo(location)
          .then(apiWaqiInfo => ({pm25:apiWaqiInfo.apiWaqiInfo.pm25})),
        getPhoto(location),
      ];
      return Promise.all(promises)
        .then(result => {
          const data = {
            Code: code,
            Name: location.name,
          };
          result.forEach(elem => {
            Object.assign(data, elem);
          });
          return data;
        })
        .catch(err => {
          console.log(err);
          return res.status(500).json({ error: err.message })
        })
    });

    return Promise.all(data)
      .then(result => {
        return res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ error: err.message });
      });
  }
}
