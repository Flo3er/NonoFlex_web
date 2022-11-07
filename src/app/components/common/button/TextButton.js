import { Link } from "react-router-dom";
import "./TextButton.css"

const TextButton = props => {
    return (
        <Link
            to={props.onClick}
            className="textButton">{
                props.value}
        </Link>
    );
}

export default TextButton;