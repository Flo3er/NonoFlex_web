import React from "react";

import "./CompanyBody.css"; 

const CompanyBody = () => {
    return (
        <div className="wrap">
            <div className="up-btn">
                <button className="btnList2 upBtn" />
                <button className="btnaddBlue upBtn" />
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