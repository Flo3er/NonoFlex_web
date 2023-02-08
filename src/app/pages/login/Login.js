import PrimaryButton from "../../components/common/button/PrimaryButton";
import TextField from "../../components/login/TextField";
import "./Login.css"
import logo from '../../../assets/images/yellowLogo.png';
import { useEffect } from "react";
import { useState } from "react";
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from "react-redux";
import TextLinkButton from "../../components/common/button/TextLinkButton";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../../features/login/LoginSlice";
import AuthenticationAPI from "../../../apis/login/Authentication";
import NonoToast from "../../components/common/toast/Toast.js";
import Utils from "../../../features/utils/Utils";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [userId, setUserId] = useState("");
    const [isValidUserId, updateUserIdValidation] = useState(true);
    const [password, setPassword] = useState("");
    const [isValidPassword, updatePasswordValidation] = useState(true);
    const [isCheckeSaveduserId, updateCheckedSaveUserId] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['rememberEmail']);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.rememberEmail !== undefined) {
            onChangeUserId(cookies.rememberEmail);
            updateCheckedSaveUserId(true);
        }
    }, [cookies.rememberEmail])

    const regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    const regExpPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*^#?&]{8,}$/

    const onChangeUserId = event => {
        setUserId(event);
        const isValidUserId = regExpEmail.test(event);
        updateUserIdValidation(isValidUserId);
    }

    const onChangePassword = event => {
        setPassword(event);
        const isValidPassword = regExpPassword.test(event);
        updatePasswordValidation(isValidPassword);
    }

    const onChangeSaveUserIdCheck = event => {
        updateCheckedSaveUserId(event.target.checked);
    }

    const pressLoginButton = async () => {
        if (isValidUserId && isValidPassword) {
            const response = await AuthenticationAPI.login(userId, password);
            if (response.isSuccess) {
                dispatch(login({
                    userId: userId,
                    password: password,
                    accessToken: response.token.access_token,
                    refreshToken: response.token.refresh_token
                }));
                // token값 session에 저장.
                sessionStorage.setItem("accessToken", response.token.access_token,);
                sessionStorage.setItem("refreshToken", response.token.refresh_token);
                sessionStorage.setItem("expired", response.token.expires_in);
                sessionStorage.setItem("refresh_expired", response.token.refresh_token_expires_in)
                NonoToast.success("로그인에 성공하였습니다.");
                await Utils.timeout(2000);
                window.location.replace("/main");
            } else {
                NonoToast.error(response.errorMessage);
            }
            if (isCheckeSaveduserId) {
                setCookie('rememberEmail', userId, { maxAge: 2000 });
            } else {
                removeCookie('rememberEmail');
            }
        } else {
            NonoToast.error("로그인 정보가 올바르지 않습니다.");
        }
    }

    return (
        <div className="login">
            <ToastContainer />
            <div className="loginBody">
                <div className="topSpace" />
                <div className="loginBodyComponent">
                    <img src={logo} className="loginLogo" />
                </div>
                <div className="topSpace" />
                <div className="loginBodyComponent">
                    <TextField isValidData={isValidUserId}
                        type="text"
                        value={userId}
                        placeholder="User Id"
                        onChange={value => {
                            onChangeUserId(value);
                        }} />
                </div>
                <div className="emailCheckBox">
                    {
                        !isValidUserId ?
                            <p className="emailCheck">이메일 형식이 아닙니다.</p> : <p></p>
                    }
                </div>
                <div className="loginBodyComponent">
                    <TextField isValidData={isValidPassword}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={value => {
                            onChangePassword(value);
                        }} />
                </div>
                <div className="passwordCheckBox">
                    {
                        !isValidPassword ?
                            <p className="passwordCheck">올바른 비밀번호 양식이 아닙니다.</p> : <p></p>
                    }
                </div>
                
                <div className="loginBodyComponent">
                    <div className="saveUserId">
                        <input
                            className="saveUserIdCheckBox"
                            id="saveUserIdCheckbox"
                            type="checkbox"
                            name="isAutoLogin"
                            checked={isCheckeSaveduserId}
                            onChange={event => {
                                onChangeSaveUserIdCheck(event);
                            }} />
                        <label htmlFor="saveUserIdCheckbox" />
                        <label className="saveUserIdLabel">아이디 저장</label>
                    </div>
                    <div className="registerAndChangePassword">
                        <span className="registerButtonBox"
                         onClick={() => window.location.href("/register")}>회원 가입</span>
                        {/* <TextLinkButton onClick="/register" value="회원 가입" /> */}
                        <br />
                        <span  className="resetPasswordButtonBox"
                         onClick={() => window.location.href("/resetPassword")}>비밀번호 초기화</span>
                        {/* <TextLinkButton onClick="/resetPassword" value="비밀번호 초기화" /> */}
                    </div>
                </div>
                <br />
                <div className="loginButton">
                    <PrimaryButton onClick={pressLoginButton} value="Login" />
                </div>
            </div>
        </div>
    )
}

export default Login;