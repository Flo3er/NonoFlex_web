import { useState } from "react";
import PrimaryButton from "../../../components/common/button/PrimaryButton";
import TextField from "../../../components/login/TextField";
import RoundButton from "../../../components/common/button/RoundButton";

import { ToastContainer, toast } from "react-toastify";
import "./Register.css"
import AuthenticationAPI from "../../../../apis/login/Authentication";
import NonoToast from "../../../components/common/toast/Toast.js";
import Utils from "../../../../features/utils/Utils.js";
import { useLocation } from 'react-router-dom';

const Register = (props) => {
    const [userName, setUserName] = useState("");
    const [isValidUserName, updateValidUserName] = useState(true);
    const [userEmail, setUserEmail] = useState("");
    const [isValidUserEmail, updateValidUserEmail] = useState(true);
    const [enabledConfirm, updateEnabedConfirm] = useState(false);
    const [authorizationCode, setAuthorizationCode] = useState("");
    const [isValidAuthCode, updateValidAuthCode] = useState(true);
    const [isConfirmedAuthCode, updateConfirmAuthCode] = useState(false);
    const [password, setPassword] = useState("");
    const [isValidPassword, updateValidPassword] = useState(true);
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isPasswordConfirm, updatePasswordConfirm] = useState(true);
    const [enableRequestRegister, updateEnableRegister] = useState(false);

    const regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    const regExpPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

    const location = useLocation();

    const onChangeUserName = event => {
        setUserName(event);
        userNameValidation(event);
        checkRegisterValidation();
    }

    const userNameValidation = (event) => {
        const validUserName = event !== "";
        updateValidUserName(validUserName);
    }

    const onChangeUserEmail = event => {
        setUserEmail(event);
        userEmailValidation(event);
        updateEnabedConfirm(false);
        checkRegisterValidation();
    }

    const userEmailValidation = event => {
        var isValidUserEmail = regExpEmail.test(userEmail);
        if(event === "") {
            isValidUserEmail = false;
        }
        console.log(event + isValidUserEmail);
        updateValidUserEmail(isValidUserEmail);
    }

    const onClickCheckDuplication = async () => {
        const isValidUserEmail = regExpEmail.test(userEmail);
        if (!isValidUserEmail) {
            NonoToast.error("올바른 이메일 양식이 아닙니다.");
            updateValidUserEmail(isValidUserEmail);
            return;
        }

        updateValidUserEmail(true);
        //TODO: check duplication.
        const response = await AuthenticationAPI.checkDuplicateEmail(userEmail);
        if (response.isSuccess) {
            if (response.result.result) {
                const sendEmailResponse = await AuthenticationAPI.sendEmailAuthorization(userEmail, "JOIN");
                if (sendEmailResponse.isSuccess) {
                    if(sendEmailResponse.result.result) {
                        NonoToast.success("이메일 인증 요청을 전송하였습니다. \n이메일을 확인해 주세요.");
                        updateEnabedConfirm(true);
                    } else {
                        NonoToast.success("이메일 인증 요청에 실패하였습니다. \n잠시후 다시 시도해 주세요.");
                        updateEnabedConfirm(false);
                    }
                } else {
                    NonoToast.error(sendEmailResponse.result.message);
                    updateEnabedConfirm(false);
                }
            } else {
                NonoToast.error(response.result.message);
                updateEnabedConfirm(false);
            }
        } else {
            NonoToast.error(response.errorMessage);
            updateEnabedConfirm(false);
        }

        checkRegisterValidation();
    }

    const onChangeAuthorizationCode = event => {
        setAuthorizationCode(event);
        authorizationCodeValidation(event);
        checkRegisterValidation();
    }

    const authorizationCodeValidation = (event) => {
        const isValidAuthorizationCode = (event !== "");
        updateValidAuthCode(isValidAuthorizationCode);
    }

    const onClickConfirmAuthorization = async event => {
        const response = await AuthenticationAPI.verifyEmailAuthorization(userEmail, authorizationCode);
        if(response.isSuccess) {
            NonoToast.success("이메일 인증에 성공하였습니다.")
            updateConfirmAuthCode(true)
        } else {
            NonoToast.error(response.errorMessage);
            updateConfirmAuthCode(false)
        }
    }

    const onChangePassword = event => {
        setPassword(event);
        passwordValidation(event);
        checkRegisterValidation();
    }

    const passwordValidation = (event) => {
        console.log("password:" + event);
        const isValidPassword = regExpPassword.test(event);
        updateValidPassword(isValidPassword);
        if (password === passwordConfirm) {
            updatePasswordConfirm(true);
        } else {
            updatePasswordConfirm(false);
        }
    }

    const onChanagePasswordConfirm = event => {
        setPasswordConfirm(event);
        console.log(event)
        console.log(password)
        if (event === password) {
            updatePasswordConfirm(true);
        } else {
            updatePasswordConfirm(false);
        }
        checkRegisterValidation();
    }

    const checkRegisterValidation = () => {
        const validation = (userName !== "") &&
            (regExpEmail.test(userEmail)) &&
            (authorizationCode !== "") &&
            (isConfirmedAuthCode) &&
            (regExpPassword.test(password));

            // password일치 여부는 click 했을 떄 확인.
        updateEnableRegister(validation);
    }

    const onCLickedRegister = async () => {
        //TODO: Request Register
        const isConfirmedUserName = (userName !== "")
        if (!isConfirmedUserName) {
            NonoToast.error("사용자 이름을 입력하세요.");
            updateValidUserName(false);
            return;
        }

        if(!regExpEmail.test(userEmail)) {
            NonoToast.error("이메일 형식을 확인하세요.");
            updateValidUserEmail(false);
            updateConfirmAuthCode(false);
            return;
        }

        if(!isConfirmedAuthCode) {
            NonoToast.error("이메일 인증을 완료해 주세요.");
            updateValidAuthCode(false);
            return;
        }

        if(!regExpPassword.test(password)) {
            NonoToast.error("올바른 비밀번호 양식이 아닙니다. \n특수문자 포함 10글자 이상 입력해 주세요.");
            updateValidPassword(false);
            return;
        }

        if(!isPasswordConfirm) {
            NonoToast.error("처음 입력한 비밀번호와 다릅니다. \n입력한 비밀번호를 다시 확인해 주세요.")
            updatePasswordConfirm(false);
            return;
        }

        // 전체 필드가 맞다고 판단 -> 전송 요청.
        const response = await AuthenticationAPI.regitser(userName, userEmail, password, authorizationCode);

        if(response.isSuccess) {
            NonoToast.success("회원 가입에 성공하였습니다. 로그인 페이지로 이동합니다.");
            await Utils.timeout(2000); // 2초대기
            window.location.replace("./login");
        } else {
            NonoToast.error(response.errorMessage);
        }

    }

    return (
        <div className="register">
            <ToastContainer />
            <div className="registerBody">
                <div className="topSpace" />
                <h1 className="title">Register</h1>

                <ul className="bodyComponent">
                    <li>
                        <p className="componentTitle">이름</p>
                        <div className="textFieldBox">
                            <TextField
                                isValidData={isValidUserName}
                                type="text"
                                placeholder="User Name"
                                onChange={value => {
                                    onChangeUserName(value);
                                }}
                                onFocusOut={value => {
                                    onChangeUserName(value);
                                }} />
                        </div>
                    </li>
                    <li>
                        {
                            !isValidUserName ?
                                <p className="invalidDataInform">이름은 필수 항목 입니다.</p> : <p></p>
                        }
                    </li>
                    <li>
                        <p className="componentTitle">이메일</p>
                        <div className="emailTextFieldBox">
                            <TextField
                                isValidData={isValidUserEmail}
                                type="text"
                                placeholder="User E-mail"
                                readOnly={isConfirmedAuthCode}
                                onChange={value => {
                                    onChangeUserEmail(value);
                                }}  />
                        </div>
                        <div className="emailCheckButton">
                            <RoundButton value="중복 확인"
                                onClick={onClickCheckDuplication} />
                        </div>
                    </li>
                    <li>
                        {
                            !isValidUserEmail ?
                                <p className="invalidDataInform">올바른 이메일 양식이 아닙니다.</p> : <p></p>
                        }
                    </li>
                    <li>
                        <p className="componentTitle">이메일 인증</p>
                        <div className="emailAuthTextFieldBox">
                            <TextField
                                isValidData={isValidAuthCode}
                                type="text"
                                placeholder="Authentication Code"
                                readOnly={isConfirmedAuthCode}
                                onChange={value => {
                                    onChangeAuthorizationCode(value);
                                }} />
                        </div>
                        <div className="emailAuthCheckButton">
                            <RoundButton value="인증 요청"
                                disabled={!enabledConfirm}
                                onClick={onClickConfirmAuthorization} />
                        </div>
                    </li>
                    <li>
                        {
                            !isValidAuthCode ?
                                <p className="invalidDataInform">인증 코드를 입력하세요.</p> : <p></p>
                        }
                    </li>
                    <li>
                        <p className="componentTitle">비밀번호</p>
                        <div className="textFieldBox">
                            <TextField
                                isValidData={isValidPassword}
                                type="password"
                                placeholder="Enter Password"
                                onChange={value => {
                                    onChangePassword(value);
                                }} />
                        </div>
                    </li>
                    <li>
                        {
                            !isValidPassword ?
                                <p className="invalidDataInform">특수문자 포함 8글자 이상 입력해주세요.</p> : <p></p>
                        }
                    </li>
                    <li>
                        <p className="componentTitle">비밀번호 확인</p>
                        <div className="textFieldBox">
                            <TextField
                                isValidData={isPasswordConfirm}
                                type="password"
                                placeholder="Re-Enter Password"
                                onChange={value => {
                                    onChanagePasswordConfirm(value);
                                }} />
                        </div>
                    </li>
                    <li>
                        {
                            !isPasswordConfirm ?
                                <p className="invalidDataInform">기존에 입력한 비밀번호와 다릅니다.</p> : <p></p>
                        }
                    </li>
                    <li>
                        <div className="registerButton">
                            <PrimaryButton value="회원 가입" disabled={!enableRequestRegister} onClick={onCLickedRegister} />
                        </div>
                    </li>
                </ul>
            </div>
        </div >
    );
}

export default Register;