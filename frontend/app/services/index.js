import axios from 'axios';

const getMainPageData = () => {
  return axios.get('/mainPage/?codes=77001,94177,90024,98093,33101,02101')
    .then(result => {
      console.log(result.data);
      return result.data
    })
};

const getCityPageData = (code, email) => {
  return axios.get(`/cityPage/${code}/${email}`)
    .then(result => {
      return result.data
    })
    .catch(result => {
      return result.response.data;
    })
};

export default {
  getMainPageData,
  getCityPageData
};
