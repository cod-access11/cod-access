import axios from 'axios';

export default axios.create({
  baseURL: 'http://ec2-54-89-63-156.compute-1.amazonaws.com:3000',
  timeout: 5000,
});
