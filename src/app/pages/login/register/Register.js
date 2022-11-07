import { useState } from "react";
import TextField from "../../../components/login/TextField";
import "./Register.css"

const Register = () => {
    const [userName, setUserName] = useState("");

    const onChangeUserName = event => {
        setUserName(event);
    }
    return (
        <div className="register">
            <div className="registerBody">
                <div className="topSpace" />
                <h1 className="title">Register</h1>

                <ul>
                    <li>
                        <h3 className="componentTitle">이름</h3>
                        <TextField
                            className="textField"
                            isValidData="true"
                            type="text"
                            placeholder="User Name"
                            onChange={value => {
                                onChangeUserName(value);
                            }} />
                    </li>
                </ul>
            </div>
        </div >
    );
}

export default Register;