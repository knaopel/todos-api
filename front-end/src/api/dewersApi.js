import axios from 'axios';
import { getHeaders, handleAxiosResponse, handleError } from './apiUtils';

const baseUrl = process.env.REACT_APP_API_URL + '/dewers';

export const getDewers = auth_token => {
  return axios
    .get(baseUrl, { headers: getHeaders(auth_token) })
    .then(handleAxiosResponse)
    .catch(handleError);
};
