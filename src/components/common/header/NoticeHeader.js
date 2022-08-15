import React from "react";

const NoticeHeader = () => {
  return (
    <div className="header row">
      <div className="notice-main">
        <div className="mainTop">
          <h2>공지사항 목록</h2>
          <p>공지사항을 관리할 수 있어요!</p>
        </div>
        <div className="searchBox bR8">
          <input placeholder="검색어를 입력하세요."></input>
          <div>
            <button className="close" />
            <button className="search" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeHeader;
