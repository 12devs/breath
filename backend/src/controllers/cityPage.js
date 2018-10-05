import {
  historicPollenIndex,
  currentWeather,
  minMaxTemperatureAndRainfall,
  ozoneData,
  COData,
  pollenIndex,
  aqiIndex,
  photo
} from "./../api/DataForCity";

export default {

  async cityPageData(req, res) {
    try {
      const code = req.params.code;
      const promises = [
        historicPollenIndex(code),
        currentWeather(code),
        minMaxTemperatureAndRainfall(code),
        ozoneData(code),
        COData(code),
        pollenIndex(code),
        aqiIndex(code),
        photo(code)
      ];
      return Promise.all(promises)
        .then(result => {
          const data = {
            Code:code,
              AQI_today: 25,
              AQI_Historically:[],
              Highest_PM: 75,
              Lowest_PM: 25,
              PolLen_Index: 34,
              Lowest_Temperature: 20,
              Highest_Temperature: 48,
              Most_Amount_of_Rain: 75,
              Most_Amount_of_Snow: 72,
              PolLen_index_over_past_year: [{'date':new Date('2014-11-01'),'value':12}, {'date':new Date('2014-11-02'),'value':18}],
              Humidity_throughtout_past_year:[],
              Ozone: 72,
              Current_Weather_Data: [],
              CO2: 25,
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
