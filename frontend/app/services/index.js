import axios from 'axios';

const getMainPageData = () => {
  return axios.get('/mainPage/')
    .then(result => {
      return result.data
    })
};

const getCityPageData = (code) => {
  return axios.get(`/cityPage/${code}`)
    .then(result => {
      return result.data
    })
};

export default {
  getMainPageData,
  getCityPageData
};
