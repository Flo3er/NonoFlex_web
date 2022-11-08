import "./PrimaryButton.css"

const PrimaryButton = (props) => {
    return (
        <button className="loginPrimaryButton"
            onClick={props.onClick}>
            {props.value}
        </button>

    );
}

export default PrimaryButton;