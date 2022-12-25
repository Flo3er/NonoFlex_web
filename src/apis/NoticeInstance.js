import axios from "axios";

// 토큰 값 생성
const ACCESS_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJidWRkeSIsImV4cCI6MTY5MDIxMTY1MywidXNlcm5hbWUiOiJhZG1pbiJ9.J_gyUVVYCY8ckO8i6ub-BNPAV6SC0A_-XjLrCOctvCw";

// axionsInstance 생성
const Instance = axios.create({
  baseURL: "http://3.39.53.3:3000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `${ACCESS_TOKEN}`,
  },
});

export default Instance;
