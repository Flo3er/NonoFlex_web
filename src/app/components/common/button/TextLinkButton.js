import { Link } from "react-router-dom";
import "./TextButton.css"

const TextLinkButton = props => {
    return (
        <Link
            to={props.onClick}
            className="textButton">{
                props.value}
        </Link>
    );
}

export default TextLinkButton;