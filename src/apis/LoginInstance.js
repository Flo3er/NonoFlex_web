import axios from 'axios';

const Instance = axios.create({
  baseURL: 'http://3.39.53.3:3000'
});

export default Instance;
