import "./Modal.css"

const Modal = (props) => {
const onClickBackground = () => {
    props.onClose();
}

    return (
        <div className={props.isOpen ? "modalBackground show" : "modalBackground"}
             onClick={onClickBackground}>
            <div className="modalWindow">
                <div className="modalPopup" onClick={ e=> e.stopPropagation()}>
                    {props.children}
                </div>
            </div>
        </div>
    )

}

export default Modal;