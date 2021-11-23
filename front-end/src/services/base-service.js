import axios from 'axios';

class BaseService {
  constructor(token) {
    this.token = token;
    axios.defaults.headers.common['Authorization'] = token;
    this.API_URL = process.env.REACT_APP_API_URL;
  }
}

export default BaseService;