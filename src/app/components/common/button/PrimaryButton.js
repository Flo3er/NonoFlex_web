import "./PrimaryButton.css"

const PrimaryButton = (props) => {
    return (
        <div>
            <button className="loginPrimaryButton"
                onClick={props.onClick}>
                {props.value}
            </button>
        </div>
    );
}

export default PrimaryButton;