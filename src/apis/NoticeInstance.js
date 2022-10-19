import axios from "axios";

// 토큰 값 생성
const ACCESS_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJST0xFIjoiUk9MRV9BRE1JTiIsImlzcyI6ImJ1ZGR5IiwiZXhwIjoxNjY2MTYxODg4LCJpYXQiOjE2NjYxNTQ2ODgsInVzZXJJZCI6OSwidXNlcm5hbWUiOiJldWlyYW4ifQ.GlmsUu6n3DeTtErct0YccLi2Z757dTQcLHx1a6hR5RQ";

// axionsInstance 생성
const Instance = axios.create({
  baseURL: "http://3.39.53.3:3000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export default Instance;
