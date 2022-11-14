import "./PrimaryButton.css"

const PrimaryButton = (props) => {
    return (
        <button className="loginPrimaryButton"
            disabled={props.disabled}
            onClick={props.onClick}>
            {props.value}
        </button>

    );
}

export default PrimaryButton;