import AuthenticationAPI from "../../apis/login/Authentication";

function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

async function checkToken() {
    if (isExpiredAccessToken()) {
        if (isExpiredRefreshToken()) {
            console.log("error: expired refresh token");
            return false;
        } else {
            const refreshToken = sessionStorage.getItem("refreshToken");
            const response = await AuthenticationAPI.refreshToken(refreshToken);
            if (response.isSuccess) {
                // token값 session에 저장.
                sessionStorage.setItem("accessToken", response.token.access_token,);
                sessionStorage.setItem("refreshToken", response.token.refresh_token);
                sessionStorage.setItem("expired", response.token.expires_in);
                sessionStorage.setItem("refresh_expried", response.token.refresh_token_expires_in);
                return true;
            } else {
                console.log("error" + response.errorMessage);
                return false;
            }
        }
    } else {
        return true;
    }
}

function isExpiredAccessToken() {
    const expried = sessionStorage.getItem("expired");
    const current = getCurrentUnixTime();
    if (expried >= current) {
        return false;
    } else {
        return true;
    }
}

function isExpiredRefreshToken() {
    const expried = sessionStorage.getItem("refresh_expried");
    const current = getCurrentUnixTime();
    if (expried >= current) {
        return false;
    } else {
        return true;
    }
}

function getCurrentUnixTime() {
    return new Date().getTime();
}

const Utils = {
    timeout,
    parseJwt,
    checkToken,
}

export default Utils;