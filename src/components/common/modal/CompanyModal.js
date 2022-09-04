import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

import Modal from "./Modal";
import { save } from "../../../features/BoardSlice";
import CompanyMethod from "../../../apis/CompanyMethod";

const CompanyModal = ({ onClose }) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [active, setActive] = useState("");
    const dispatch = useDispatch();

    const onSave = () => {
        if(name != "" && type !== "") {
            const companyData = {
                id: "",
                name: name,
                type: type,
                category: category,
                active: active
            };
            dispatch(save(companyData));
            CompanyMethod.CompanyPost(name, type, category, active);
            setName("");
            setCategory("");
            setActive(true)
        }
    };

    const handleCompanyName = (event) => {
        setName(event.target.value);
    };

    const handleCompanyDatail = (event) => {
        setType(event.target.value);
    };

    const receivingButton = () => {

    };

    const shippingButton = () => {

    };

    return (
        <Modal onClose={onClose}>
            <div className="Modal">
                <section>
                    <form>
                        <header>
                            <p>거래처 정보 수정</p>
                            <button className="close" onClick={onClose}>
                                <AiOutlineClose />
                            </button>
                        </header>
                        <main>
                            <div className="companyNameArea">
                                    <p>거래처 이름</p>
                                    <textarea
                                        placeholder="이름을 입력해주세요."
                                        className="??"
                                        onChange={handleCompanyName}
                                    />
                            </div>
                            <div className="companyCategoryArea">
                                <p>거래처 분류</p>
                                <button className="receiving" onClick={receivingButton}>입고처</button>
                                <button className="shipping" onClick={shippingButton}>출고처</button>
                            </div>
                            <div className="companyDetail">
                                <textarea 
                                    placeholder="알맞은 설명을 입력해보세요!"
                                    className=""
                                    onChange={handleCompanyDatail}
                                />
                            </div>
                        </main>
                        <footer>
                            <button className="" onclick={onSave}>저장하기</button>
                        </footer>
                    </form>
                </section>
            </div>
        </Modal>
    );
};

export default CompanyModal;