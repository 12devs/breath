import { MainData } from "../api";
import { dailyOzone } from '../api/MainData';

export default {

  mainPageData(req, res) {

    const { codes } = req.query;
    const zipCodes = codes.split(',');

    const data = zipCodes.map(async code => {
      const ozone = await dailyOzone(code);

      return { code, ...ozone };
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
