import React, { useEffect, useState } from "react";
import "./NoticeListBody.css";
import { NoticeMethod } from "../../apis/NoitceMethod";

const NoticeListBody = () => {
  const [list, setList] = useState([]);
  const [viewList, setViewList] = useState([]);
  const [date, setDate] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noticeId, setNoticeId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  // const [newData, setNewData] = useState([]);

  const onClickButton = () => {
    setIsOpen(true);
  };

  const handleTitle = event => {
    setTitle(event.target.value);
  };
  const handleContent = event => {
    setContent(event.target.value);
  };

  function onClickList(index) {
    const listIndex = list[index];

    setViewList(listIndex);

    // 날짜 YYYY-MM-DD를 YYYY년 MM월 DD일로 변경하기
    const date = listIndex.updateAt;
    // console.log(date);
    const update =
      date.substr(0, 4) +
      "년 " +
      date.substr(5, 2) +
      "월 " +
      date.substr(8, 2) +
      "일";
    setDate(update);

    setNoticeId(listIndex.noticeId);
    setTitle(listIndex.title);
    setContent(listIndex.content);
    onClickButton();
  }

  useEffect(() => {
    const get = NoticeMethod.NoticeGet();
    const getData = () => {
      get.then(data => {
        setList(data);
      });
    };
    getData();
  }, []);

  const noticePut = (title, content, noticeid) => {
    NoticeMethod.NoticePut(title, content, noticeid);
  };
  const noticeDel = noticeId => {
    NoticeMethod.NoticeDelete(noticeId);
  };

  const noticeInfo = () => {
    if (setIsOpen) {
      return (
        <div className="viewList">
          <div className="list-up">
            <input
              className="strong"
              value={title}
              type="text"
              onChange={handleTitle}
            />
            <div className="right-data">
              <p className="fs10 primary">{viewList.writer}</p>
              <p className="fs10 texthint">{date}</p>
            </div>
          </div>
          <textarea
            className="content"
            value={content}
            onChange={handleContent}
          />
          <div className="btn">
            <button
              className="btnError error"
              type="button"
              onClick={e => noticeDel(noticeId)}
            >
              공지사항 삭제
            </button>
            <button
              className="btnClose bR8"
              type="button"
              onClick={e => noticePut(title, content, noticeId)}
            >
              수정하기
            </button>
          </div>
        </div>
      );
    }
  };

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
                  <p className="go-right">{list.updateAt}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="choice-notice bR8">
        <div>{isOpen && noticeInfo()}</div>
      </div>
    </div>
  );
};

export default NoticeListBody;
