import React from "react";

import NoticeHeader from "../../components/common/header/NoticeHeader";
import Sidebar from "../../components/common/sidebar/Sidebar";
import NoticeListBody from "../../components/noticeList/NoticeListBody";

const NoticeListPage = () => {
  return (
    <div>
      <NoticeHeader />
      <div className="noticeList row">
        <Sidebar />
        <NoticeListBody />
      </div>
    </div>
  );
};

export default NoticeListPage;
