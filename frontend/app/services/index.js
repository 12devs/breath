import axios from 'axios';

const getMainPageData = () => {
  return axios.get('/mainPage/?codes=77001,94177,90024,98093,33101,02101')
    .then(result => {
      return result.data
    })
};

const getCityPageData = (code) => {
  return axios.get(`/cityPage/${code}`)
    .then(result => {
      return result.data
    })
    .catch(result => {
      return result.response.data;
    })
};

const saveEmail = (email, code) => {
  return axios.get(`/email/${email}/${code}`)
    .then(result => {
      return result.data
    })
    .catch(result => {
      return result.response.data;
    })
};

export default {
  getMainPageData,
  getCityPageData,
  saveEmail
};
