import "./ChangePasswordModal.css"
import Close from "../../../assets/images/closeWhite.png"
import TextField from "./TextField";
import PrimaryButton from "../common/button/PrimaryButton";
import { useEffect, useState } from "react";
import NonoToast from "../common/toast/Toast";
import AuthenticationAPI from "../../../apis/login/Authentication";
import { useSelector } from "react-redux";

const ChangePasswordModal = (props) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordConfirmValue, setPasswordConfirm] = useState("");
    const [isValidChangePassword, updateChangePasswordValidation] = useState(false);

    const resetFlag = useSelector((state) => state.login.changePasswordModalFlag);
    const regExpPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*^#?&]{8,}$/

    useEffect(() => {
        console.log("flag");
        setCurrentPassword("");
        setNewPassword("");
        setPasswordConfirm("");
        updateChangePasswordValidation(false);
    }, [resetFlag])

    const onClickCloseButton = () => {
        props.onClickClose();
    }

    const onChangeCurrentPasswordValue = (value) => {
        setCurrentPassword(value);
        checkCurrentPasswordValidation(value);
    }
    function checkCurrentPasswordValidation(value) {
        if (!regExpPassword.test(value)) {
            updateChangePasswordValidation(false);
            return;
        }
        const validation = value != "" && newPassword != "" && passwordConfirmValue != "";
        updateChangePasswordValidation(validation)
    }
    const onChangeNewPasswordValue = (value) => {
        setNewPassword(value);
        checkNewPasswordValidation(value)
    }
    function checkNewPasswordValidation(value) {
        if (!regExpPassword.test(value)) {
            updateChangePasswordValidation(false);
            return;
        }
        const validation = value != "" && currentPassword != "" && passwordConfirmValue != "";
        updateChangePasswordValidation(validation)
    }
    const onChangePasswordConfirmValue = (value) => {
        setPasswordConfirm(value);
        checkPasswordConfirmValidation(value);
    }
    function checkPasswordConfirmValidation(value) {
        if (!regExpPassword.test(value)) {
            updateChangePasswordValidation(false);
            return;
        }
        const validation = value != "" && newPassword != "" && currentPassword != "";
        updateChangePasswordValidation(validation)
    }
    const onClickChagePassword = async () => {
        if (!regExpPassword.test(currentPassword)) {
            NonoToast.error("현재 비밀번호를 확인하세요.");
            return;
        }
        if(!regExpPassword.test(newPassword)) {
            NonoToast.error("비밀번호는 특수문자를 포함하여 8글자 이상 입력해 주세요.");
            return;
        }

        if(newPassword !== passwordConfirmValue) {
            NonoToast.error("새로운 비밀번호가 일치하지 않습니다.");
            return;
        }

        if (isValidChangePassword) {
            const response = await AuthenticationAPI.changePassword(currentPassword, newPassword);
            if(response.isSuccess) {
                if (response.result.result) {
                    NonoToast.success("비밀번호를 변경했습니다.");
                    onClickCloseButton();
                } else {
                    NonoToast.error("비밀번호를 확인하세요.");
                }
            } else {
                NonoToast.error(response.errorMessage);
            }
        }

    }
    return (
        <div className="changePasswordModalPage">
            <div className="changePasswordModalTitleSection">
                <span>비밀번호 변경</span>
                <div className="emptySpace" />
                <img src={Close}
                    className="companyNewTitleCloseButton"
                    onClick={onClickCloseButton} />
            </div>
            <div className="changePasswordModalBodySection">
                <div className="chanePasswordTextFieldSection">
                    <div className="changePasswordTextFieldTitleSection">
                        <span>현재 비밀번호</span>
                    </div>
                    <TextField type="password"
                        isValidData={true}
                        placeholder="현재 비밀번호를 입력하세요."
                        value={currentPassword}
                        onChange={(value) => { onChangeCurrentPasswordValue(value) }} />
                </div>
                <div className="emptySpaceForChangePasswordCurrentPassword" />
                <div className="chanePasswordTextFieldSection">
                    <div className="changePasswordTextFieldTitleSection">
                        <span>새로운 비밀번호</span>
                    </div>
                    <TextField type="password"
                        isValidData={true}
                        placeholder="새로운 비밀번호를 입력하세요."
                        value={newPassword}
                        onChange={(value) => { onChangeNewPasswordValue(value) }} />
                </div>
                <div className="emptySpaceForChangePasswordChangePassowrd" />
                <div className="chanePasswordTextFieldSection">
                    <div className="changePasswordTextFieldTitleSection">
                        <span>비밀번호 확인</span>
                    </div>
                    <TextField type="password"
                        isValidData={true}
                        placeholder="비밀번호를 한번 더 입력하세요."
                        value={passwordConfirmValue}
                        onChange={(value) => { onChangePasswordConfirmValue(value) }} />
                </div>


                <div className="emptySpace" />

                <div className="changePasswordModalButton">
                    <PrimaryButton 
                    value="비밀번호 변경"
                    disabled = {!isValidChangePassword}
                    onClick={onClickChagePassword} />
                </div>
            </div>
        </div>
    );

}

export default ChangePasswordModal;