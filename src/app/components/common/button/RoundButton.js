import "./RoundButton.css"

const RoundButton = props => {
    return (
            <button className="roundButton"
            disabled={props.disabled}
            onClick={props.onClick}>
                {props.value}
            </button>
    );
}

export default RoundButton;