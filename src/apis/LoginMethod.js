import Instance from "./LoginInstance";

async function LoginPost () {
  try {
      const response = await Instance.post('/api/v1/auth/login',{
          "email": "admin",
          "password": "admin",
          "tokenActiveSeconds": 300 // 5분
      });
      localStorage.setItem("Authorization", JSON.stringify(response.data));
      console.log(response.data);
  } catch (error) {
      console.log(error);
  }
  // console.log(response.data);
};

const LoginMethod = {
  LoginPost
}

export default LoginMethod;