import Instance from "./LoginInstance";

async function LoginPost () {
  try {
      const response = await Instance.post('/api/v1/auth/login',{
          "email": "admin",
          "password": "admin",
          "tokenActiveSeconds": 300 // 5분
      });
      // console.log(response.data);
      // console.log(response);
      
  } catch (error) {
      console.log(error);
  }
  // console.log(response.data);
};

const LoginMethod = {
  LoginPost
}

export default LoginMethod;