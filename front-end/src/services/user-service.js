import axios from 'axios';
import BaseService from './base-service';

class UserService extends BaseService {
  getUser() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.API_URL}/user`)
        .then(resp => resolve(resp.data))
        .catch(err => {
          // TODO: error logging
          console.log('Error:', err);
          reject('Error fetching user data');
        });
    });
  }
}

export default UserService;