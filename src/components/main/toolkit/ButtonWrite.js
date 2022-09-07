import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uriSave } from "../modules/uriSlice";

function ButtonWrite() {
    const dispatch = useDispatch();

    function onClick() {
        dispatch(uriSave('/BoardNew'));
    }
    
    return(
        <Link to='/BoardNew'>
            <button onClick={onClick}>
                Write
            </button>
        </Link>
    );
}

export default ButtonWrite;