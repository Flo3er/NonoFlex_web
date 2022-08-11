import React, { useEffect, useState } from "react";
import "./NoticeListBody.css";
import { NoticeMethod } from "../../apis/NoitceMethod";
import { useSelector, useDispatch } from "react-redux";
// import ViewList from './ViewList.js';
import { select } from "../../features/BoardSlice";

const NoticeListBody = index => {
  const [list, setList] = useState([]);
  const [viewList, setViewList] = useState([]);
  const [date, setDate] = useState([]);
  const [date2, setDate2] = useState([]);

  function onClickList(index) {
    setViewList(list[index]);
    console.log(list[index]);

    // 날짜 YYYY-MM-DD를 YYYY년 MM월 DD일로 변경하기
    const date = list[index].updateAt;
    console.log(date);
    const update =
      date.substr(0, 4) +
      "년 " +
      date.substr(5, 2) +
      "월 " +
      date.substr(8, 2) +
      "일";
    const update2 =
      date.substr(2, 2) +
      "년 " +
      date.substr(5, 2) +
      "월 " +
      date.substr(8, 2) +
      "일";
    console.log(update, update2);
    setDate(update);
    setDate2(update2);
  }

  useEffect(() => {
    const get = NoticeMethod.NoticeGet();
    // console.log(get)
    const getData = () => {
      get.then(data => {
        setList(data);
      });
    };
    getData();
  }, []);

  return (
    <div className="noticeListBody">
      <div className="full-list">
        <ul className="depth1">
          {list &&
            list.map((list, index) => (
              <li
                className="depth1Li"
                key={index}
                onClick={() => {
                  onClickList(index);
                }}
              >
                <div className="list-left">
                  <p className="list-data">{list.title}</p>
                </div>
                <div className="list-right fs10 primaryDark">
                  <p>{list.writer}</p>
                  <p>{date2}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="choice-notice bR8">
        {viewList.length !== 0 ? (
          <div className="viewList">
            <div className="list-up">
              <p className="strong">{viewList.title}</p>
              <div className="right-data">
                <p className="fs10 primary">{viewList.writer}</p>
                <p className="fs10 texthint">{date}</p>
              </div>
            </div>
            <p className="content">{viewList.content}</p>
            <div className="btn">
              <button className="btnError error">공지사항 삭제</button>
              <button className="btnClose bR8">수정하기</button>
            </div>
          </div>
        ) : (
          <p className="texthint fs20">공지사항을 선택해주세요.</p>
        )}
      </div>
    </div>
  );
};

export default NoticeListBody;
