import NonoAPI from "../NonoApi";

async function login(userId, password) {
    try {
        const response = await NonoAPI.post(
            "/api/v1/auth/code", {
            "email": userId,
            "password": password
        }
        );
        console.log(response.data);
        const authCode = response.data.code;  
        const accesToken = await getAccessToken(authCode);
        return accesToken;
    } catch (error) {
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message,
        };
    }
}

async function getAccessToken(code) {
    try {
        const response = await NonoAPI.post(
            "/api/v1/auth/token", {
                "grant_type": "authorization_code",
                "code": code,
            }
        );
        console.log(response.data);
        return {
            isSuccess: true,
            accessToken: response.data
        }
    } catch (error) {
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message,
        };
    }
}

const AuthenticationAPI = {
    login,
}

export default AuthenticationAPI;