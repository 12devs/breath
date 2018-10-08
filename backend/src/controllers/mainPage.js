import { dailyOzone } from '../api/MainData';
import { getCurrentLocation } from '../api/location';
import { pollenIndex, aqiIndex, apiWaqiInfo, getPhoto } from '../api/DataForCity';

export default {

  mainPageData(req, res) {

    const { codes } = req.query;
    const zipCodes = codes.split(',');

    const data = zipCodes.map(async code => {

      const location = await getCurrentLocation(code);
      const ozone = await dailyOzone(location.lat, location.lng);
      const pollen = await pollenIndex(code);
      const aqi = await aqiIndex(code);
      const waqiInfo = await apiWaqiInfo(code);
      const photo = await getPhoto(code); //@TODO width

      return {
        code,
        Name: (location || {}).name,
        ...ozone,
        ...pollen,
        ...aqi,
        PM25: (waqiInfo || {}).PM25,
        photo: photo.Img,
      };
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
