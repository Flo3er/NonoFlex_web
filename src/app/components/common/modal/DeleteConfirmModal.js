import "./DeleteConfirmModal.css"

const DeleteConfirmModal = (props) => {
    
    const onClickCancelButton = () => {
        props.onCancel();
    }

    const onClickOKButton = () => {
        props.confirm();
    }
    return (
        <div className="companyDeleteModalPage">
            <div className="comapnyDeleteModalContents">
            <p className="companyDeleteTitle">{props.title}</p>
            <p>{"'" + props.name + "'을 삭제하시겠습니까?"}</p>
            <p className="warningText">정보 삭제시 영구적으로 삭제되고, 삭제된 정보는 복구할 수 없습니다.</p>
            </div>
            <div className="emptySpace" />
            <div className="dialogTail">
                <div className="dialogTailCancelButton"
                    onClick={onClickCancelButton}>
                    <span>취소</span>
                </div>
                <div className={props.warning ? "dialogTailWarningButton" : "dialogTailOKButton"}
                    onClick={onClickOKButton}>
                    <span>확인</span>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmModal;