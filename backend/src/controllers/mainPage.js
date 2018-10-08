import { dailyOzone } from '../api/MainData';
import { getCurrentLocation } from '../api/location';

export default {

  mainPageData(req, res) {

    const { codes } = req.query;
    const zipCodes = codes.split(',');

    const data = zipCodes.map(async code => {

      const location = await getCurrentLocation(code);
      const ozone = await dailyOzone(location.lat, location.lng);

      return {
        code,
        Name: location.name,
        ...ozone,
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
