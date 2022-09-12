import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

import Modal from "./Modal";
import { save } from "../../../features/CompanySlice";
import CompanyMethod from "../../../apis/CompanyMethod";
import "./CompanyModal.css"

const CompanyModal = ({ onClose }) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    // const [active, setActive] = useState(true);
    const dispatch = useDispatch();

    const onSave = (event) => {
        if(name === "") {
            alert("거래처 이름이 비어있습니다.");
            // name.focus();
            event.preventDefault();
        }
        if(name !== "") {
            const companyData = {
                id: "",
                name: name,
                type: type,
                category: category
            };
            dispatch(save(companyData));
            // CompanyMethod.CompanyPost(name, type, category);
            console.log(companyData);
            setName("");
            setType("");
            setCategory("");
            // setActive(true);
            onClose();
        }
    };

    const handleCompanyName = (event) => {
        setName(event.target.value);
    };

    const handleCompanyCategory = (event) => {
        setCategory(event.target.value);
    };

    const inputButton = () => {
        setType("INPUT");
    };

    const outputButton = () => {
        setType("OUTPUT");
    };

    return (
        <Modal onClose={onClose}>
            <div className="modal">
                <div className="topArea">
                    <p>새로운 거래처 추가</p>
                    <button onClick={onClose}>
                        <AiOutlineClose />
                    </button>
                </div>
                <div className="companyAddBody">
                    <ul>
                        <li>
                            <p>거래처 이름</p>
                            <input 
                                type="text"
                                placeholder="이름을 입력해주세요."
                                name="companyName"
                                maxLength={30}
                                onChange={handleCompanyName}
                            />
                        </li>
                        <li>
                            <p>거래처 분류</p>
                            <div className="typeButton">
                                <button className="input" onClick={inputButton}>입고처</button>
                                <button className="output" onClick={outputButton}>출고처</button>
                            </div>
                        </li>
                        <li>
                            <p>거래처 설명</p>
                            <input 
                                type="text"
                                placeholder="알맞은 설명을 입력해보세요!"
                                name="companyCategory"
                                maxLength={30}
                                onChange={handleCompanyCategory}
                            />
                        </li>
                    </ul>
                    <div className="saveButton">
                        <button onClick={onSave}>저장하기</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CompanyModal;