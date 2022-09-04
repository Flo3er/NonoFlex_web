import React from "react";

import NoticeHeader from "../../components/common/header/Header";
import Sidebar from "../../components/common/sidebar/Sidebar";
import CompanyBody from "../../components/company/CompanyBody";

const CompanyPage = () => {
  return (
    <div>
      <NoticeHeader />
      <div className="noticeList row">
        <Sidebar />
        <CompanyBody />
      </div>
    </div>
  );
};

export default CompanyPage;
