import { dailyOzone } from '../api/MainData';
import { getCurrentLocation, getNearbyZipCodes, getCurrentZipCode } from '../api/location';
import { pollenIndex, aqiIndex, apiWaqiInfo, getPhoto } from '../api/DataForCity';

export default {

  async mainPageData (req, res) {

    let { codes } = req.query;
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).slice(7);
    const zipCodes = !codes ? await getNearbyZipCodes(ip) : codes.split(',');
    const stubCodes = ['77001','94177','90024','98093','33101','02101'];

    if (!zipCodes.length) {
      codes = true;
      zipCodes.push(...stubCodes);
    }

    const data = zipCodes.map(async item => {
      const code = !codes ? await getCurrentZipCode(item): item;
      const location = !codes ? item : await getCurrentLocation(code);

      const promises = [
        dailyOzone(location),
        pollenIndex(code),
        aqiIndex(location),
        apiWaqiInfo(location)
          .then(apiWaqiInfo => ({
            pm25:apiWaqiInfo.apiWaqiInfo.pm25,
            o3:apiWaqiInfo.apiWaqiInfo.o3,
          })),
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
