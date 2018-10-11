import { getCityInfoByCodeAndLocation } from '../api/MainData';
import { getCurrentLocation, getNearbyCities, getCurrentZipCode } from '../api/location';

export default {

  async mainPageData(req, res) {

    let { codes } = req.query;
    const stubCodes = ['77001', '94177', '90024', '98093', '33101', '02101'];
    let data;

    try {
      if (!codes) {
        const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).slice(7);
        // const ip = '72.229.28.185';
        const cityLocations = await getNearbyCities(ip);
        if (!cityLocations.length) {
          throw Error('not city')
        }

        data = cityLocations.map(async location => {
          const code = await getCurrentZipCode(location);
          return getCityInfoByCodeAndLocation(code, location)
        });
      }
      else {
        const zipCodes = codes.split(',');
        data = zipCodes.map(async code => {
          const location = await getCurrentLocation(code);
          return getCityInfoByCodeAndLocation(code, location)
        });
      }
    } catch (err) {
      data = stubCodes.map(async code => {
        const location = await getCurrentLocation(code);
        return getCityInfoByCodeAndLocation(code, location)
      });
    }

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
