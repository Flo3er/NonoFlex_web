import axios from 'axios';

// 토큰 값 생성
const ACCESS_TOKEN = localStorage.getItem("Authorization");

// axionsInstance 생성
const Instance = axios.create({
    baseURL: 'http://3.39.53.3:3000',
    headers: {
        "Content-Type": "application/json",
        Authorization:  `${ACCESS_TOKEN}`
      }
});

export default Instance;

