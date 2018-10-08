import axios from 'axios';

const getMainPageData = () => {
  return axios.get('/mainPage/?codes=20001,20002')
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
