import { useState } from "react";
import PrimaryButton from "../../../components/common/button/PrimaryButton";
import TextField from "../../../components/login/TextField";
import RoundButton from "../../../components/common/button/RoundButton";
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

                <ul className="bodyComponent">
                    <li>
                        <p className="componentTitle">이름</p>
                        <div className="textFieldBox">
                            <TextField
                                isValidData="true"
                                type="text"
                                placeholder="User Name"
                                onChange={value => {
                                    onChangeUserName(value);
                                }} />
                        </div>
                    </li>
                    <li>
                        <p className="componentTitle">이메일</p>
                        <div className="emailTextFieldBox">
                            <TextField
                                isValidData="true"
                                type="text"
                                placeholder="User E-mail"
                                onChange={value => {
                                    onChangeUserName(value);
                                }} />
                        </div>
                        <div className="emailCheckButton">
                            <RoundButton value="중복 확인" />
                        </div>
                    </li>
                    <li>
                        <p className="componentTitle">이메일 인증</p>
                        <div className="emailAuthTextFieldBox">
                            <TextField
                                isValidData="true"
                                type="text"
                                placeholder="Authentication Code"
                                onChange={value => {
                                    onChangeUserName(value);
                                }} />
                        </div>
                        <div className="emailAuthCheckButton">
                            <RoundButton value="인증 요청" disabled={true} />
                        </div>
                    </li>
                    <li>
                        <p className="componentTitle">비밀번호</p>
                        <div className="textFieldBox">
                            <TextField
                                isValidData="true"
                                type="text"
                                placeholder="Enter Password"
                                onChange={value => {
                                    onChangeUserName(value);
                                }} />
                        </div>
                    </li>
                    <li>
                        <p className="componentTitle">비밀번호 확인</p>
                        <div className="textFieldBox">
                            <TextField
                                isValidData="true"
                                type="text"
                                placeholder="Re-Enter Password"
                                onChange={value => {
                                    onChangeUserName(value);
                                }} />
                        </div>
                    </li>
                    <li>
                        <div className="registerButton">
                            <PrimaryButton value="회원 가입" />
                        </div>
                    </li>
                </ul>
            </div>
        </div >
    );
}

export default Register;