import React from "react";

import Header from "../../components/common/header/Header";
import Sidebar from "../../components/common/sidebar/Sidebar";
import MainBody from "../../components/main/notice/MainBody";

const MainPage = () => {
  return (
    <div id="wrap">
      <Header
        name="노노유통"
        text="환영합니다! 현재 유통 상황을 알 수 있어요!"
      />
      <div className="container row">
        <Sidebar index="0" />
        <MainBody />
      </div>
    </div>
  );
};

export default MainPage;
