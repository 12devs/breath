import rp from 'request-promise';

export default async (code) => {
  const Code = code;
  const AQI_Today = 'not done yet';
  const AQI_Historically = 'not done yet';
  const Highest_PM = 'not done yet';
  const Lowest_PM = 'not done yet';
  const Pollen_Index = 'not done yet';
  const Lowest_Temperature = 'not done yet';
  const Highest_Temperature = 'not done yet';
  const Most_Amount_of_Rain = 'not done yet';

  const Pollen_index_over_past_year = (days = 360) => {
    return new Promise(resolve => {
      const headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/69.0.3497.81 Chrome/69.0.3497.81 Safari/537.36',
        'Referer': 'https://www.pollen.com/forecast/extended/pollen/' + code + '/' + days,
      };
      const options = {
        uri: 'https://www.pollen.com/api/forecast/historic/pollen/' + code + '/' + days,
        headers: headers,
        json: true
      };

      rp(options)
        .then(data => resolve(data))
        .catch(err => resolve(err));
    });
  };

  const Humidity_throughtout_past_year = 'not done yet';
  const Ozone = 'not done yet';
  const Current_Weather_Data = 'not done yet';
  const CO2 = 'not done yet';

  return {
    Code,
    AQI_Today,
    AQI_Historically,
    Highest_PM,
    Lowest_PM,
    Pollen_Index,
    Lowest_Temperature,
    Highest_Temperature,
    Most_Amount_of_Rain,
    Pollen_index_over_past_year: await Pollen_index_over_past_year(),
    Humidity_throughtout_past_year,
    Ozone,
    Current_Weather_Data,
    CO2,
  };
}
