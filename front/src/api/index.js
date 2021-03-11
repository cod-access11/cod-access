import axios from 'axios';

export default axios.create({

  baseURL: process.env.API_URL,

  baseURL: 'http://ec2-54-89-63-156.compute-1.amazonaws.com:3000/api',

  timeout: 5000,
});
