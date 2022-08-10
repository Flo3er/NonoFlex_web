import React from "react";

import Header from "../../components/common/header/Header";
import Sidebar from "../../components/common/sidebar/Sidebar";
import NoticeListBody from "../../components/noticeList/NoticeListBody";

const NoticeListPage = () => {
  return (
    <div>
      <Header />
      <div className="noticeList row">
        <Sidebar />
        <NoticeListBody />
      </div>
    </div>
  );
};

export default NoticeListPage;
