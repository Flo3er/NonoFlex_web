import { ToastContainer } from "react-toastify";
import "./ResetPassword.css"

import Lights from "../../../../assets/images/lights.png"
import TextField from "../../../components/login/TextField";
import { useEffect, useState } from "react";
import PrimaryButton from "../../../components/common/button/PrimaryButton";
import RoundButton from "../../../components/common/button/RoundButton";
import NonoToast from "../../../components/common/toast/Toast";
import AuthenticationAPI from "../../../../apis/login/Authentication";
import Utils from "../../../../features/utils/Utils";

const ResetPassword = (props) => {
    const [isValidUserEmail, updateUserEmailValidation] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [onClickedAuthRequest, updateClickedAuthRequest] = useState(false);
    const [isValidAuthCode, updateAuthCodeAValidation] = useState(false);
    const [authorizationCode, setAuthCode] = useState("");
    const [isConfirmedAuthCode, updateConfirmAuthCode] = useState(false);
    const regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/

    const onChangeUserEmail = (email) => {
        setUserEmail(email);
        const checkValidataion = regExpEmail.test(email);
        if (email === "") {
            checkValidataion = false;
        }

        updateUserEmailValidation(checkValidataion);
    }

    const onClickConfirmAuthorizationRequest = async () => {
        const sendEmailResponse = await AuthenticationAPI.sendEmailAuthorization(userEmail, "REISSUE");
        if (sendEmailResponse.isSuccess) {
            if (sendEmailResponse.result.result) {
                NonoToast.success("이메일 인증 요청을 전송하였습니다. \n이메일을 확인해 주세요.");
                // updateConfirmRequestTime(new Date());
                updateClickedAuthRequest(true);
            } else {
                NonoToast.success("이메일 인증 요청에 실패하였습니다. \n잠시후 다시 시도해 주세요.");
                updateClickedAuthRequest(false);
            }
        }
    }

    const onChangeAuthorizationCode = (event) => {
        updateAuthCodeAValidation(event !== "");
        setAuthCode(event);
    }

    const onClickConfirmAuthorization = async () => {
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

    const onClickResetPassword = async () => {
        const response = await AuthenticationAPI.resetPassword(userEmail, authorizationCode);
        if (response.isSuccess) {
            if (response.result.result) {
                NonoToast.success("비밀번호 초기화에 성공하였습니다.");
                await Utils.timeout(1500);
                window.location.replace("/login");
            } else {
                NonoToast.error(response.result.message);
            }
        } else {
            NonoToast.error(response.errorMessage);
        }

    }

    return (
        <div className="resetPassword">
            <ToastContainer />
            <div className="resetPasswordBox">
                <div className="resetPasswordBody">
                    <div className="resetPasswordTitleBox">
                        <p>비밀번호 초기화</p>
                        <div className="resetPasswordTitleUnderline" />
                    </div>
                    <div className="resetPasswordInformBox">
                        <img src={Lights} className="resetPasswordImformImage" />
                        <p>
                            비밀번호 초기화 시 변경된 비밀번호가 이메일로 전송됩니다.<br />
                            임시 비밀번호로 로그인 후, 좌측 상단 메뉴를 활용하여 비밀번호를 변경하세요.
                        </p>
                    </div>
                    <div className="resetPasswordContentInputBox">
                        <div className="resetPasswordContentTitleBox">
                            <span>이메일</span>
                        </div>
                        <TextField
                            type="text"
                            placeholder="사용자 이메일을 입력하세요."
                            isValidData={true}
                            onChange={value => {
                                onChangeUserEmail(value);
                            }}
                        />
                    </div>
                    <div className="resetPasswordContentInputBox">
                        <div className="resetPasswordContentTitleBox">
                            <span>이메일 인증</span>
                        </div>
                        {
                            onClickedAuthRequest ?
                                <div className="resetPasswordEmailAuthCheckBox">
                                    <div className="resetPasswordEmailAuthTextFieldBox">
                                        <TextField
                                            isValidData={isValidAuthCode}
                                            type="text"
                                            placeholder="인증 코드 입력."
                                            readOnly={isConfirmedAuthCode}
                                            onChange={value => {
                                                onChangeAuthorizationCode(value);
                                            }} />
                                    </div>
                                    <div className="resetPasswordEmailAuthCheckButton">
                                        {
                                            isConfirmedAuthCode ?
                                                <PrimaryButton value="확인 완료" />
                                                :
                                                <RoundButton value="인증 확인"
                                                    disabled={!onClickedAuthRequest}
                                                    onClick={onClickConfirmAuthorization} />
                                        }
                                    </div>
                                </div>
                                :
                                <RoundButton value="인증 요청"
                                    disabled={!isValidUserEmail}
                                    onClick={onClickConfirmAuthorizationRequest} />
                        }
                    </div>
                    <div className="emptySpace" />
                    <div className="resetPasswordButtonBox">
                        <PrimaryButton
                        value="비밀번호 초기화"
                        disabled={!isConfirmedAuthCode}
                        onClick={onClickResetPassword} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;