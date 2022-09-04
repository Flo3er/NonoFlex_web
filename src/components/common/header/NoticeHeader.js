import React, { useState } from "react";
import "./Header.css";

const NoticeHeader = () => {
  const [text, setText] = useState("");
  const onChange = e => {
    setText(e.target.value);
  };
  const onReset = () => {
    setText("");
  };

  return (
    <div className="notice-header row">
      <div className="notice-main">
        <div className="mainTop">
          <h2>공지사항 목록</h2>
          <p>공지사항을 관리할 수 있어요!</p>
        </div>
        <div className="searchBox bR8">
          <input
            placeholder="검색어를 입력하세요."
            onChange={onChange}
            value={text}
          ></input>
          <div>
            <button className="close" onClick={onReset} />
            <button className="search" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeHeader;
