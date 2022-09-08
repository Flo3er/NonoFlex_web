import axios from 'axios';

// 토큰 값 생성
const ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJST0xFIjoiUk9MRV9BRE1JTiIsImlzcyI6ImJ1ZGR5IiwiZXhwIjoxNjY0OTE4MTY1LCJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4ifQ.-OXzzfUqkdY8DAh2TgsA0TmOsXiJFKcMAVJ4U9lr8uA';

// axionsInstance 생성
const Instance = axios.create({
    baseURL: 'http://3.39.53.3:3000',
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
});

export default Instance;

