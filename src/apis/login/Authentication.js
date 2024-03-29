import NonoAPI from "../NonoApi";

async function login(userId, password) {
    try {
        const response = await NonoAPI().post(
            "/api/v1/auth/code", {
            email: userId,
            password: password
        }
        );
        console.log(response.data);
        const authCode = response.data.code;  
        const accesToken = await getAccessToken(authCode);
        return accesToken;
    } catch (error) {
        console.log(error)
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message,
        };
    }
}

async function getAccessToken(code) {
    try {
        const response = await NonoAPI().post(
            "/api/v1/auth/token", {
                grant_type: "authorization_code",
                code: code,
            }
        );
        console.log(response.data);
        return {
            isSuccess: true,
            token: response.data
        }
    } catch (error) {
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message,
        };
    }
}

async function refreshToken(token) {
    try {
        const response = await NonoAPI().post(
            "/api/v1/auth/token", {
                grant_type: "refresh_token",
                refresh_token: token,
            }
        );
        console.log(response.data);
        return {
            isSuccess: true,
            token: response.data
        }
    } catch (error) {
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message,
        };
    }
}

async function checkDuplicateEmail(email) {
    try {
        const response = await NonoAPI().post('/api/v1/auth/email/duplicate',{
            email: email,
            type: "JOIN"
        });
        console.log(response.data);
        return {
            isSuccess: true,
            result: response.data
        }
    } catch (error) {
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        }
    }
}

async function sendEmailAuthorization(email, type) {
    try {
        const response = await NonoAPI().post('/api/v1/auth/email/check',{
            email: email,
            type: type
        });
        console.log(response.data);
        return {
            isSuccess: true,
            result: response.data
        };
    } catch (error) {
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        };
    }
}

async function verifyEmailAuthorization(email, code) {
    try {
        const response = await NonoAPI().post('/api/v1/auth/email/verify',{
            email: email,
            code: code
        });
        console.log(response.data);
        return {
            isSuccess: true,
            result: response.data
        };
    } catch (error) {
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        };
    }
}

async function regitser(name, email, password, code) {
    console.log(name)
    console.log(email)
    console.log(password)
    console.log(code)
    try {
        const response = await NonoAPI().post('/api/v1/auth/join',{
            name: name,
            email: email,
            password: password,
            code: code
          });

          console.log(response.data)
          return {
            isSuccess: true,
            result: response.data
          }
    } catch (error) {
        console.log(error)
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        }
    }
}

async function getParticipantCode(loginId) {
    try {
        console.log(loginId)
        const response = await NonoAPI().post('/api/v1/auth/code/' + loginId);
          console.log(response.data)
          return {
            isSuccess: true,
            result: response.data
          }
    } catch (error) {
        console.log(error)
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        }
    }
}

async function resetPassword(email, code) {
    try {
        const response = await NonoAPI().post('/api/v1/auth/reissue', {
            email: email,
            code: code
        });
          console.log(response.data)
          return {
            isSuccess: true,
            result: response.data
          }
    } catch (error) {
        console.log(error)
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        }
    }
}

async function changePassword(currentPassword, newPassword) {
    try {
        const response = await NonoAPI().put('/api/v1/user/me/password', {
            password: currentPassword,
            newPassword: newPassword
        });
          console.log(response.data)
          return {
            isSuccess: true,
            result: response.data
          }
    } catch (error) {
        console.log(error)
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        }
    }
}

const AuthenticationAPI = {
    login,
    checkDuplicateEmail,
    sendEmailAuthorization,
    verifyEmailAuthorization,
    regitser,
    refreshToken,
    getParticipantCode,
    resetPassword,
    changePassword
}

export default AuthenticationAPI;