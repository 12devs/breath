import axios from 'axios';

const getMainPageData = () => {
  return axios.get('/mainPage/')
    .then(result => {
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
