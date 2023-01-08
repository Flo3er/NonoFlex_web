import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompanyAPI from "../../../../apis/company/company";
import NonoToast from "../../common/toast/Toast";

import Close from "../../../../assets/images/closeWhite.png"
import Point from "../../../../assets/images/requiredPoint.png"
import TextField from "../../login/TextField"
import PrimaryButton from "../../common/button/PrimaryButton"
import "./CompanyEditModal.css"

const CompanyEditModal = (props) => {
    const [companyName, setCompanyName] = useState("")
    const [description, setDescription] = useState("")
    const [isSelectedDocumentInputType, updateSelectedDocumentInputType] = useState(true);
    const [isActiveType, updateActiveType] = useState(true);

    const activeTypeList = [
        { value: "활성", code: true },
        { value: "비활성", code: false }
    ]

    const dispatch = useDispatch();
    const selectedCompanyInfo = useSelector((state) => state.company.selectedItem);

    useEffect(() => {
        setCompanyName(selectedCompanyInfo.name);
        setDescription(selectedCompanyInfo.category);
        updateSelectedDocumentInputType((selectedCompanyInfo.type == "INPUT"))
        updateActiveType(selectedCompanyInfo.active);

    }, [selectedCompanyInfo]);

    const onClickCloseButton = () => {
        props.onClose();
    }

    const onChangeCompanyName = (text) => {
        console.log(text)
        setCompanyName(text);
    }

    const onChangeDescription = (text) => {
        console.log(text)
        setDescription(text);
    }

    const onClickDocumentInputButton = () => {
        updateSelectedDocumentInputType(true);
    }

    const onClickDocumentOutputButton = () => {
        updateSelectedDocumentInputType(false);
    }

    const onChangeProductSaveTypeSelection = (item) => {
        updateActiveType(item.target.value)
    }

    const onClickSaveCompanyButton = async () => {
        if (companyName.length == 0) {
            NonoToast.error("거래처 이름을 입력해 주세요.");
            return;
        }

        const type = isSelectedDocumentInputType ? "INPUT" : "OUTPUT";
        const response = await CompanyAPI.updateCompanyInfo(
            selectedCompanyInfo.companyId,
            companyName,
            type,
            description,
            isActiveType);
        if (response.isSuccess) {
            NonoToast.success("거래처를 수정 하였습니다.");
            onClickCloseButton();
            setCompanyName("");
            setDescription("");
            updateSelectedDocumentInputType(true);
        } else {
            NonoToast.error("거래처 수정에 실패하였습니다.");
        }
    }

    return (
        <div className="companyNewModalPage">
            <div className="companyNewTitleSection">
                <span>거래처 정보 수정</span>
                <div className="emptySection" />
                <img src={Close}
                    className="companyNewTitleCloseButton"
                    onClick={onClickCloseButton} />
            </div>

            <div className="companyNewContentsSection">
                <div className="companyEditItemSection">
                    <img src={Point} className="requiredPoint" />
                    <span className="documentProductPriceTitle">거래처 이름</span>
                    <div className="documentProductPriceValueBox">
                        <TextField
                            placeholder="이름을 입력해 주세요."
                            value={companyName}
                            isValidData={true}
                            type="text"
                            onChange={onChangeCompanyName}
                        />
                    </div>
                </div>

                <div className="companyEditItemSection">
                    <img src={Point} className="requiredPoint" />
                    <span className="documentProductPriceTitle">거래처 분류</span>

                    <div className="selectedDocumentTypeDisableBox">
                        {
                            isSelectedDocumentInputType ? <span>입고처</span> : <span>출고처</span>
                        }
                    </div>

                    {/* <div className={isSelectedDocumentInputType ? "selectedDocumentTypeBox" : "documentTypeBox"}
                        onClick={onClickDocumentInputButton}>
                        <span>입고처</span>
                    </div>
                    <div className={isSelectedDocumentInputType ? "outputDocumentTypeBox" : "selectedOutputDocumentTypeBox"}
                        onClick={onClickDocumentOutputButton}>
                        <span>출고처</span>
                    </div> */}

                </div>

                <div className="companyEditItemSection">
                    <div className="requiredPoint" />
                    <span className="documentProductPriceTitle">거래처 설명</span>
                    <div className="documentProductPriceValueBox">
                        <TextField
                            placeholder="설명을 입력해 주세요."
                            value={description}
                            isValidData={true}
                            type="text"
                            onChange={onChangeDescription}
                        />
                    </div>
                </div>

                <div className="companyEditItemSection">
                    <div className="requiredPoint" />
                    <span className="documentProductPriceTitle">활성 상태</span>
                    <div className="documentProductPriceValueBox">
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
                </div>

                <div className="emptySection" />
                <div className="createCompanyButtonBox">
                    <PrimaryButton onClick={onClickSaveCompanyButton} value="저장하기" />
                </div>
            </div>
        </div>
    );
}

export default CompanyEditModal;