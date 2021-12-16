import axios from 'axios';
import { getHeaders, handleAxiosResponse, handleError } from './apiUtils';

const baseUrl = process.env.REACT_APP_API_URL + '/honeys';

export const getHoneys = auth_token => {
  return axios
    .get(baseUrl, { headers: getHeaders(auth_token) })
    .then(handleAxiosResponse)
    .catch(handleError);
};

export const userExists = (email, auth_token) => {
  return axios
    .post(`${baseUrl}/exists`, { email }, { headers: getHeaders(auth_token) })
    .then(handleAxiosResponse)
    .catch(handleError);
};