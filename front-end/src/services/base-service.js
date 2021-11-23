import axios from 'axios';

class BaseService {
  constructor(token) {
    this.token = token;
    axios.defaults.headers.common['Authorization'] = token;
  }
}

export default BaseService;