import "./Dialog.css"

const Dialog = (props) => {
    const onClickCancelButton = () => {
        props.onCancel();
    }

    const onClickOKButton = () => {
        props.confirm();
    }

    return (
        <div className="dialogBody">
            <div className="dialogTitle">
                <span>{props.title}</span>
            </div>
            <div className="diloagBodyContents">
                <p>{props.contents}</p>
            </div>
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
    );
}

export default Dialog;