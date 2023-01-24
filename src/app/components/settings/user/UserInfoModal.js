import { useEffect, useState } from "react";

import Close from "../../../../assets/images/closeWhite.png"
import "./UserInfoModal.css"
import { QRCodeSVG } from "qrcode.react";
import { useDispatch, useSelector } from "react-redux";
import AuthenticationAPI from "../../../../apis/login/Authentication";
import NonoToast from "../../common/toast/Toast";

const UserInfoModal = (props) => {
    const [userCode, setUserCode] = useState("")

    const onClickCloseButton = () => {
        props.onClose();
    }

    const dispatch = useDispatch();
    const selectedUserInfo = useSelector((state) => state.user.selectedItem);

    useEffect(() => {
        const fetchData = async () => {
            await getParticipantCode();
        }

        fetchData();
    }, [selectedUserInfo]);

    async function getParticipantCode() {
        console.log(selectedUserInfo);
        if (selectedUserInfo.userId != undefined) {
            const response = await AuthenticationAPI.getParticipantCode(selectedUserInfo.userId);
            if (response.isSuccess) {
                setUserCode(response.result.code);
            } else {
                // NonoToast.error("코드 발급에 실패했습니다.");
                console.log("code verify fail.");
            }
        }
    }

    return (
        <div className="userNewModalPage">
            <div className="companyNewTitleSection">
                <span className="userEditModalTitle">로그인 코드</span>
                <div className="emptySection" />
                <img src={Close}
                    className="companyNewTitleCloseButton"
                    onClick={onClickCloseButton} />
            </div>

            <div className="userInfoQrCodeBox">
                <div className="userCodeBox">
                    <span>{userCode}</span>
                </div>

                <QRCodeSVG value={userCode} size={300} />
            </div>
        </div>
    );
}

export default UserInfoModal;