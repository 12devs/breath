import {
  Pollen_index_over_past_year,
  currentWeather,
  minMaxTemperatureAndRainfall,
  ozoneData,
  COData,
} from "./../api/DataForCity";

export default {

  async cityPageData(req, res) {
    try {
      const code = req.params.code;
      const promises = [
        Pollen_index_over_past_year(code),
        currentWeather(code),
        minMaxTemperatureAndRainfall(code),
        ozoneData(code),
        COData(code),
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
        });
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}
