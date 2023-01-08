import "./CompanyDeleteModal.css"

const CompanyDeleteModal = (props) => {
    
    const onClickCancelButton = () => {
        props.onCancel();
    }

    const onClickOKButton = () => {
        props.confirm();
    }
    return (
        <div className="companyDeleteModalPage">
            <p className="companyDeleteTitle">거래처 삭제</p>
            <p>{"정말 " + props.companyName + "을 영구삭제 하시곘습니까?"}</p>
            <p className="warningText">삭제된 거래처 정보는 복구할 수 없습니다.</p>
            <div className="emptySpace" />
            <div className="dialogTail">
                <div className="dialogTailCancelButton"
                    onClick={onClickCancelButton}>
                    <span>cancel</span>
                </div>
                <div className={props.warning ? "dialogTailWarningButton" : "dialogTailOKButton"}
                    onClick={onClickOKButton}>
                    <span>OK</span>
                </div>
            </div>
        </div>
    )
}

export default CompanyDeleteModal;