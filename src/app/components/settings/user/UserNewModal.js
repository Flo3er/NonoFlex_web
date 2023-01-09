import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompanyAPI from "../../../../apis/company/company";
import NonoToast from "../../common/toast/Toast";

import Close from "../../../../assets/images/closeWhite.png"
import Point from "../../../../assets/images/requiredPoint.png"
import TextField from "../../login/TextField"
import PrimaryButton from "../../common/button/PrimaryButton"
import "./UserEditModal.css"
import UserAPI from "../../../../apis/user/user";

const UserNewModal = (props) => {
    const [userName, setUserName] = useState("")
    // const [isActiveType, updateActiveType] = useState(true);

    // const activeTypeList = [
    //     { value: "활성", code: true },
    //     { value: "비활성", code: false }
    // ]

    // const dispatch = useDispatch();
    // const selectedUserInfo = useSelector((state) => state.user.selectedItem);

    // useEffect(() => {
    //     setUserName(selectedUserInfo.userName);
    //     updateActiveType(selectedUserInfo.active);

    // }, [selectedUserInfo]);

    const onClickCloseButton = () => {
        props.onClose();
    }

    const onChangeUserName = (text) => {
        console.log(text)
        if(text.length > 20) {
            NonoToast.error("참여자 이름은 20자를 넘을 수 없습니다.");
            return;
        }
        setUserName(text);
    }

    // const onChangeProductSaveTypeSelection = (item) => {
    //     updateActiveType(item.target.value)
    // }

    const onClickSaveUserButton = async () => {
        if (userName.length == 0) {
            NonoToast.error("참여자 이름을 입력해 주세요.");
            return;
        }

        const response = await UserAPI.createUserItem(
            userName);
        if (response.isSuccess) {
            NonoToast.success("참여자를 생성 하였습니다.");
            onClickCloseButton();
            setUserName("");

        } else {
            NonoToast.error("참여자 정보 생성에 실패하였습니다.");
        }
    }

    return (
        <div className="userNewModalPage">
            <div className="companyNewTitleSection">
                <span className="userEditModalTitle">참여자 계정 생성</span>
                <div className="emptySection" />
                <img src={Close}
                    className="companyNewTitleCloseButton"
                    onClick={onClickCloseButton} />
            </div>

            <div className="companyNewContentsSection">
                <div className="companyEditItemSection">
                    <img src={Point} className="requiredPoint" />
                    <span className="documentProductPriceTitle"> 이름</span>
                    <div className="documentProductPriceValueBox">
                        <TextField
                            placeholder="이름을 입력해 주세요."
                            value={userName}
                            isValidData={true}
                            type="text"
                            onChange={onChangeUserName}
                        />
                    </div>
                </div>

                {/* <div className="companyEditItemSection">
                    <div className="requiredPoint" />
                    <span className="documentProductPriceTitle">활성 상태</span>
                    <div className="userStatusChangeBox">
                        <div className="emptySection" />
                        <div className="companyStatusSelectBox">
                            <select className="productStatusSelect"
                                value={isActiveType ?? true}
                                onChange={(item) => onChangeProductSaveTypeSelection(item)}>
                                {
                                    activeTypeList.map((item, index) => {
                                        return (
                                            <option key={"productActiveType" + index} value={item.code}>{item.value}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div> */}

                <div className="emptySection" />
                <div className="createCompanyButtonBox">
                    <PrimaryButton onClick={onClickSaveUserButton} value="저장하기" />
                </div>
            </div>
        </div>
    );
}

export default UserNewModal;