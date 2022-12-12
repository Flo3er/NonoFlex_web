import "./TextField.css"

import Visibility from "../../../assets/images/visibility.png"
import { useState } from "react";
/*
TextField
  - isValidData: 해당 필드 값이 유효한지.
  - type: input type
  - value : input 값
  - onChange : 값이 변경되었을 때.
  - placeholder: placeholder
  - onClickVisible : password 보기 버튼 클릭시 동작.
*/
const TextField = (props) => {
    const [passwordType, setPassworedType] = useState("password");
    const [isShowPassword, updateShowPassword] = useState(false);

    const changeShowPassword = () => {
        if (isShowPassword) {
            setPassworedType("password");
            updateShowPassword(false);
        } else {
            setPassworedType("text");
            updateShowPassword(true);
        }
    }

    return (
        <div className={props.isValidData ? 'normalInputBox' : 'wrongInputBox'}>
            <input type={props.type === "password" ? passwordType : props.type}
                value={props.value}
                className='inputBox'
                onChange={({ target: { value } }) => props.onChange(value)}
                readOnly={props.readOnly}
                placeholder={props.placeholder}
                onBlur={props.onFocusOut}
            />

            <img src={Visibility}
                alt=''
                className='visibliltyicon'
                onClick={changeShowPassword}
                hidden={(props.type !== "password")} />
        </div>
    );
}

export default TextField;