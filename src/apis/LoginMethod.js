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

async function EmailDuplicate  (email) {
  try {
      const response = await Instance.post('/api/v1/auth/email/duplicate',{
          "email": email,
          "type": "JOIN"
      });
      console.log(response.data);
      return response;
  } catch (error) {
      console.log(error);
      return error;
  }
  // console.log(response.data);
};

async function EmailCheck (email) {
  try {
      const response = await Instance.post('/api/v1/auth/email/check',{
          "email": email,
          "type": "JOIN"
      });
      console.log(response.data);
      return response;
  } catch (error) {
      console.log(error);
      return error;
  }
  // console.log(response.data);
};

async function EmailVerify (email, code) {
  try {
      const response = await Instance.post('/api/v1/auth/email/verify',{
          "email": email,
          "code": code
      });
      console.log(response.data);
      return response;
  } catch (error) {
      console.log(error);
  }
  // console.log(response.data);
};

async function Join (name, email, password, code) {
  try {
      const response = await Instance.post('/api/v1/auth/join',{
        "name": name,
        "email": email,
        "password": password,
        "code": code
      });
      console.log(response.data);
      return response;
  } catch (error) {
      console.log(error);
  }
  // console.log(response.data);
};

async function Code (email, password) {
  try {
      const response = await Instance.post('/api/v1/auth/code',{
        "email": email,
        "password": password,
      });
      console.log(response.data);
  } catch (error) {
      console.log(error);
  }
  // console.log(response.data);
};

async function Token (code) {
  try {
      const response = await Instance.post('/api/v1/auth/code',{
        "grant_type": "authorization_code",
        "code": code
      });
      console.log(response.data);
  } catch (error) {
      console.log(error);
  }
  // console.log(response.data);
};
const LoginMethod = {
  LoginPost,
  EmailDuplicate,
  EmailCheck,
  EmailVerify,
  Join,
  Code,
  Token
}

export default LoginMethod;