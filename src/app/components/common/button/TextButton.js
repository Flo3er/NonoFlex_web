import { Link } from "react-router-dom";
import "./TextButton.css"

const TextButton = props => {
    const onClickButton = () => {
       props.onclick();
    }

    return (
        <div
            onClick={onClickButton}
            className={props.warning ? "warningButton" : "textButton"}>
            {props.value}
        </div>
    );
}

export default TextButton;