import PrimaryButton from "../../components/common/button/PrimaryButton";
import TextField from "../../components/login/TextField";
import "./Login.css"
import logo from '../../../assets/images/logo.png';
import { useEffect, useImperativeHandle } from "react";
import { useState } from "react";
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from "react-redux";
import TextButton from "../../components/common/button/TextButton";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../../features/login/LoginSlice";
import AuthenticationAPI from "../../../apis/login/Authentication";

const Login = () => {
    const [userId, setUserId] = useState("");
    const [isValidUserId, updateUserIdValidation] = useState(true);
    const [password, setPassword] = useState("");
    const [isValidPassword, updatePasswordValidation] = useState(true);
    const [isCheckeSaveduserId, updateCheckedSaveUserId] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['rememberEmail']);

    const dispatch = useDispatch();

    useEffect(() => {
        if (cookies.rememberEmail !== undefined) {
            onChangeUserId(cookies.rememberEmail);
            updateCheckedSaveUserId(true);
        }
    }, [cookies.rememberEmail])


    const regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    const regExpPassword = /^[a-zA-Z\\d`~!@#$%^&*()-_=+]{10,20}$/

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
            if(response.isSuccess) {
                dispatch(login({
                    userId: userId,
                    password: password,
                    accessToken: response.accessToken.access_token,
                    refreshToken: response.accessToken.refresh_token
                }));
                toast.success("Login Success", {
                    autoClose: 3000,
                    position: toast.POSITION.TOP_CENTER,
                    bodyClassName: "toastBody",
                    hideProgressBar: true,
                    closeButton: false,
                    theme: "colored"
                });
            } else {
                toast.error("["+response.errorCode+"]"+response.errorMessage, {
                    autoClose: 3000,
                    position: toast.POSITION.TOP_CENTER,
                    bodyClassName: "toastBody",
                    hideProgressBar: true,
                    closeButton: false,
                    theme: "colored"
                });
            }




            if (isCheckeSaveduserId) {
                setCookie('rememberEmail', userId, { maxAge: 2000 });
            } else {
                removeCookie('rememberEmail');
            }
        } else {
            toast.error("로그인 정보가 올바르지 않습니다.", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
                bodyClassName: "toastBody",
                hideProgressBar: true,
                closeButton: false,
                theme: "colored"
            });
        }
    }

    return (
        <div className="login">
            <ToastContainer />
            <div className="loginBody">
                <div className="topSpace" />
                <div className="bodyComponent">
                    <img src={logo} className="loginLogo" />
                </div>
                <div className="topSpace" />
                <div className="bodyComponent">
                    <TextField isValidData={isValidUserId}
                        type="text"
                        value={userId}
                        placeholder="User Id"
                        onChange={value => {
                            onChangeUserId(value);
                        }} />
                    {
                        !isValidUserId ?
                            <p className="emailCheck">이메일 형식이 아닙니다.</p> : <p></p>
                    }
                </div>
                <br />
                <div className="bodyComponent">
                    <TextField isValidData={isValidPassword}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={value => {
                            onChangePassword(value);
                        }} />
                    {
                        !isValidPassword ?
                            <p className="passwordCheck">올바른 비밀번호 양식이 아닙니다.</p> : <p></p>
                    }
                </div>
                <br />
                <div className="bodyComponent">
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
                        <TextButton onClick="/register" value="회원 가입" />
                        <br />
                        <TextButton onClick="" value="비밀번호 변경하기" />
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