import rp from 'request-promise';

const Pollen_index_over_past_year = (code, days = 360) => {
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
      .then(data => resolve({
        Pollen_index_over_past_year: data.Location.periods,
      }))
      .catch(err => resolve(err));
  });
};

module.exports = {
  Pollen_index_over_past_year,
};
