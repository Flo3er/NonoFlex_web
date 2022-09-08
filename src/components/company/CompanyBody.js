import React, { useState } from "react";

import CompanyModal from "../common/modal/CompanyModal";
import "./CompanyBody.css"; 

const CompanyBody = () => {
    const [isOpen, setIsOpen] = useState(false);

    const addIconButton = () => {
        setIsOpen(true);
    }

    return (
        <div className="wrap">
            <div className="up-btn">
                <button className="btnList2 upBtn" />
                <button className="btnaddBlue upBtn" onClick={addIconButton} />
                {isOpen && (
                    <CompanyModal
                        onClose={() => {
                            setIsOpen(false);
                        }}
                    />
                )}
            </div>
            <div className="companyTitle">
                <div className="company_info">
                    <p>거래처 정보</p>
                </div>
                <div className="active_state">
                    <p>활성 상태</p>
                </div>
            </div>
        </div>
    )
}

export default CompanyBody;