// import axios from 'axios';
import authStore from '../stores/authStore';

class BaseService {
  constructor() {
    this.API_URL = process.env.REACT_APP_API_URL;
    this.token = authStore.getToken();
  }

  // handleError(error) {
  //   console.log('API call failed.', error);
  //   throw error;
  // }

  // async handleResponse(response) {
  //   if (response.ok) return response.json();
  //   if (response.status === 400) {
  //     const error = await response.text();
  //     throw new Error(error);
  //   }
  //   throw new Error("network response was not ok.");
  // }
}

export default BaseService;