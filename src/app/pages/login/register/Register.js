import { useState } from "react";
import PrimaryButton from "../../../components/common/button/PrimaryButton";
import TextField from "../../../components/login/TextField";
import RoundButton from "../../../components/common/button/RoundButton";

import { ToastContainer } from "react-toastify";
import "./Register.css"
import AuthenticationAPI from "../../../../apis/login/Authentication";
import NonoToast from "../../../components/common/toast/Toast.js";
import Utils from "../../../../features/utils/Utils.js";

const Register = (props) => {
    const [userName, setUserName] = useState("");
    const [isValidUserName, updateValidUserName] = useState(true);
    const [userEmail, setUserEmail] = useState("");
    const [isValidUserEmail, updateValidUserEmail] = useState(true);
    const [isCheckedEmailDuplicate, updateEmailDuplicateCheck] = useState(false);
    const [isClickedConfirmRequest, updateConfirmRequest] = useState(false);
    const [enabledConfirm, updateEnabedConfirm] = useState(false);
    const [confirmRequestTime, updateConfirmRequestTime] = useState(new Date());
    const [authorizationCode, setAuthorizationCode] = useState("");
    const [isValidAuthCode, updateValidAuthCode] = useState(true);
    const [isConfirmedAuthCode, updateConfirmAuthCode] = useState(false);
    const [password, setPassword] = useState("");
    const [isValidPassword, updateValidPassword] = useState(true);
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isPasswordConfirm, updatePasswordConfirm] = useState(true);
    const [enableRequestRegister, updateEnableRegister] = useState(false);

    const regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    const regExpPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=])[A-Za-z\d!@#$%^&*()+=\-_]{8,}$/ 

    const onChangeUserName = event => {
        console.log(event)
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
        updateConfirmAuthCode(false);
        updateEmailDuplicateCheck(false);
        checkRegisterValidation();
    }

    const userEmailValidation = event => {
        var isValidUserEmail = regExpEmail.test(event);
        if (event === "") {
            isValidUserEmail = false;
        }
        updateValidUserEmail(isValidUserEmail);
    }

    const onClickCheckEmailDuplication = async () => {
        const isValidUserEmail = regExpEmail.test(userEmail);
        if (!isValidUserEmail) {
            NonoToast.error("올바른 이메일 양식이 아닙니다.");
            updateValidUserEmail(isValidUserEmail);
            return;
        }

        updateValidUserEmail(true);

        const response = await AuthenticationAPI.checkDuplicateEmail(userEmail);
        if (response.isSuccess) {
            if (response.result.result) {
                NonoToast.success("중복된 사용자가 없습니다.");
                updateEmailDuplicateCheck(true);
            } else {
                NonoToast.error("이미 다른 사용자가 사용중입니다.")
                updateEmailDuplicateCheck(false);
            }
        } else {
            NonoToast.error("네트워크 통신에 실패했습니다.")
            updateEmailDuplicateCheck(false);
        }
    }

    const onClickConfirmAuthorizationRequest = async () => {
        const sendEmailResponse = await AuthenticationAPI.sendEmailAuthorization(userEmail, "JOIN");
        if (sendEmailResponse.isSuccess) {
            if (sendEmailResponse.result.result) {
                NonoToast.success("이메일 인증 요청을 전송하였습니다. \n이메일을 확인해 주세요.");
                updateConfirmRequestTime(new Date());
                updateEnabedConfirm(true);
            } else {
                NonoToast.success("이메일 인증 요청에 실패하였습니다. \n잠시후 다시 시도해 주세요.");
                updateEnabedConfirm(false);
            }
        }
    }

    // const onClickCheckDuplication = async () => {
    //     const isValidUserEmail = regExpEmail.test(userEmail);
    //     if (!isValidUserEmail) {
    //         NonoToast.error("올바른 이메일 양식이 아닙니다.");
    //         updateValidUserEmail(isValidUserEmail);
    //         return;
    //     }

    //     updateValidUserEmail(true);
    //     //TODO: check duplication.
    //     const response = await AuthenticationAPI.checkDuplicateEmail(userEmail);
    //     if (response.isSuccess) {
    //         if (response.result.result) {
    //             const sendEmailResponse = await AuthenticationAPI.sendEmailAuthorization(userEmail, "JOIN");
    //             if (sendEmailResponse.isSuccess) {
    //                 if (sendEmailResponse.result.result) {
    //                     NonoToast.success("이메일 인증 요청을 전송하였습니다. \n이메일을 확인해 주세요.");
    //                     updateEnabedConfirm(true);
    //                 } else {
    //                     NonoToast.success("이메일 인증 요청에 실패하였습니다. \n잠시후 다시 시도해 주세요.");
    //                     updateEnabedConfirm(false);
    //                 }
    //             } else {
    //                 NonoToast.error(sendEmailResponse.result.message);
    //                 updateEnabedConfirm(false);
    //             }
    //         } else {
    //             NonoToast.error(response.result.message);
    //             updateEnabedConfirm(false);
    //         }
    //     } else {
    //         NonoToast.error(response.errorMessage);
    //         updateEnabedConfirm(false);
    //     }

    //     checkRegisterValidation();
    // }

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
        if (response.isSuccess) {
            if(response.result.result) {
                NonoToast.success("이메일 인증에 성공하였습니다.")
                updateConfirmAuthCode(true)
            } else {
                NonoToast.error("이메일 인증에 실패하였습니다. 코드를 확인해 주세요.")
                updateConfirmAuthCode(false)
            }
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
        if (event === password) {
            updatePasswordConfirm(true);
        } else {
            updatePasswordConfirm(false);
        }
        checkRegisterValidation();
    }

    const checkRegisterValidation = () => {
        const validation = (userName !== "") &&
            (isCheckedEmailDuplicate) &&
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

        if (!regExpEmail.test(userEmail)) {
            NonoToast.error("이메일 형식을 확인하세요.");
            updateValidUserEmail(false);
            updateConfirmAuthCode(false);
            return;
        }

        if (!isConfirmedAuthCode) {
            NonoToast.error("이메일 인증을 완료해 주세요.");
            updateValidAuthCode(false);
            return;
        }

        if (!regExpPassword.test(password)) {
            NonoToast.error("올바른 비밀번호 양식이 아닙니다. \n특수문자 포함 10글자 이상 입력해 주세요.");
            updateValidPassword(false);
            return;
        }

        if (!isPasswordConfirm) {
            NonoToast.error("처음 입력한 비밀번호와 다릅니다. \n입력한 비밀번호를 다시 확인해 주세요.")
            updatePasswordConfirm(false);
            return;
        }

        // 전체 필드가 맞다고 판단 -> 전송 요청.
        const response = await AuthenticationAPI.regitser(userName, userEmail, password, authorizationCode);

        if (response.isSuccess) {
            window.location.replace("/register/confirm");
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
                                placeholder="사용자 이름을 입력하세요."
                                onChange={value => {
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
                                placeholder="사용자 이메일을 입력하세요."
                                readOnly={isConfirmedAuthCode}
                                onChange={value => {
                                    onChangeUserEmail(value);
                                }} />
                        </div>
                        <div className="emailCheckButton">
                            {
                                isCheckedEmailDuplicate ?
                                    <PrimaryButton value="확인 완료" />
                                    :
                                    <RoundButton value="중복 확인"
                                        onClick={onClickCheckEmailDuplication} />
                            }

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
                        {
                            enabledConfirm ?
                                <div className="emailAuthCheckBox">
                                    <div className="emailAuthTextFieldBox">
                                        <TextField
                                            isValidData={isValidAuthCode}
                                            type="text"
                                            placeholder="인증 코드 입력."
                                            readOnly={isConfirmedAuthCode}
                                            onChange={value => {
                                                onChangeAuthorizationCode(value);
                                            }} />
                                    </div>
                                    <div className="emailAuthCheckButton">
                                        {
                                            isConfirmedAuthCode ?
                                                <PrimaryButton value="확인 완료" />
                                                :
                                                <RoundButton value="인증 확인"
                                                    disabled={!enabledConfirm}
                                                    onClick={onClickConfirmAuthorization} />
                                        }
                                    </div>
                                </div>
                                :
                                <div className="emailAuthRequestButtonBox">
                                    <RoundButton value="인증 요청"
                                        disabled={!isCheckedEmailDuplicate}
                                        onClick={onClickConfirmAuthorizationRequest} />
                                </div>
                        }




                    </li>
                    <li>
                        {
                            enabledConfirm ?
                                <p className="subInformMessage">인증 코드는 {confirmRequestTime.toLocaleTimeString()} 이후 5분 이내에 입력해야 합니다.</p> : <p></p>
                        }
                    </li>
                    <li>
                        <p className="componentTitle">비밀번호</p>
                        <div className="textFieldBox">
                            <TextField
                                isValidData={isValidPassword}
                                type="password"
                                placeholder="비밀번호를 입력하세요."
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
                                placeholder="비밀번호를 다시 한 번 입력하세요."
                                onChange={value => {
                                    onChanagePasswordConfirm(value);
                                }} />
                        </div>
                    </li>
                    <li>
                        {
                            !isPasswordConfirm ?
                                <span className="invalidDataInform">기존에 입력한 비밀번호와 다릅니다.</span> : <p></p>
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