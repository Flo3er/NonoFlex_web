import React, { useState } from "react";

import Header from "../../components/common/header/Header";
import Sidebar from "../../components/common/sidebar/Sidebar";
import NoticeListBody from "../../components/noticeList/NoticeListBody";

const NoticeListPage = props => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div>
      <Header
        name="공지사항 목록"
        text="공지사항을 관리할 수 있어요!"
        setSearchValue={setSearchValue}
      />
      <div className="noticeList row">
        <Sidebar index="1" />
        <NoticeListBody searchValue={searchValue} />
      </div>
    </div>
  );
};

export default NoticeListPage;
