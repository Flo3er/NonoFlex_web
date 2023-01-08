import "./CompanyNewModal.css"
import Close from "../../../../assets/images/closeWhite.png"
import Point from "../../../../assets/images/requiredPoint.png"
import TextField from "../../login/TextField"
import { useState } from "react"
import PrimaryButton from "../../common/button/PrimaryButton"
import NonoToast from "../../common/toast/Toast"
import CompanyAPI from "../../../../apis/company/company"
import { useDispatch } from "react-redux"
import { clearCompanyList } from "../../../../features/settings/companySlice"

const CompanyNewModal = (props) => {
    const [companyName, setCompanyName] = useState("")
    const [description, setDescription] = useState("")
    const [isSelectedDocumentInputType, updateSelectedDocumentInputType] = useState(true);

    const dispatch = useDispatch();

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

    const onClickSaveCompanyButton = async () => {
        if(companyName.length == 0) {
            NonoToast.error("거래처 이름을 입력해 주세요.");
            return;
        }

        const type = isSelectedDocumentInputType ? "INPUT" : "OUTPUT";
        const response = await CompanyAPI.createCompanyItem(companyName, type, description);
        if(response.isSuccess) {
            NonoToast.success("거래처를 등록하였습니다.");
            onClickCloseButton();
            setCompanyName("");
            setDescription("");
            updateSelectedDocumentInputType(true);
        } else {
            NonoToast.error("거래처 등록에 실패하였습니다.");
        }
    }

    return (
        <div className="companyNewModalPage">
            <div className="companyNewTitleSection">
                <span>새로운 거레처 추가</span>
                <div className="emptySection" />
                <img src={Close}
                    className="companyNewTitleCloseButton"
                    onClick={onClickCloseButton} />
            </div>

            <div className="companyNewContentsSection">
                <div className="companyNewItemSection">
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

                <div className="companyNewItemSection">
                    <img src={Point} className="requiredPoint" />
                    <span className="documentProductPriceTitle">거래처 분류</span>

                    <div className={isSelectedDocumentInputType ? "selectedDocumentTypeBox" : "documentTypeBox"}
                        onClick={onClickDocumentInputButton}>
                        <span>입고처</span>
                    </div>
                    <div className={isSelectedDocumentInputType ? "outputDocumentTypeBox" : "selectedOutputDocumentTypeBox"}
                        onClick={onClickDocumentOutputButton}>
                        <span>출고처</span>
                    </div>

                </div>

                <div className="companyNewItemSection">
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
                <div className="emptySection" />
                <div className="createCompanyButtonBox">
                    <PrimaryButton onClick={onClickSaveCompanyButton} value="저장하기" /> 
                </div>
            </div>
        </div>

    )
}

export default CompanyNewModal;