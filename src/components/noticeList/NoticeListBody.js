import React, { useEffect, useState } from "react";
import "./NoticeListBody.css";
import { NoticeMethod } from "../../apis/NoitceMethod";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { edit, remove } from "../../features/BoardSlice";
// import { NotificationsPausedOutlined } from "@mui/icons-material";

const NoticeListBody = () => {
  const [list, setList] = useState([]);
  const [viewList, setViewList] = useState([]);
  const [date, setDate] = useState([]);

  const selectRowData = useSelector(state => state.board.selectRowData);
  const [title, setTitle] = useState(selectRowData.title);
  const [content, setContent] = useState(selectRowData.content);
  const [noticeId, setNoticeId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  // const onChange = () => {
  //   const inputData = {
  //     id: viewList.id,
  //     title: title,
  //     content: content,
  //   };
  //   console.log("clickSave ::", inputData);
  //   dispatch(edit(inputData));
  //   setTitle("");
  //   setContent("");
  //   history.push("/noticeList");
  // };

  // const onRemove = () => {
  //   dispatch(remove(selectRowData.noticeId));
  //   console.log("remove button");
  //   setTitle("");
  //   setContent("");
  //   history.push("/noticeList");
  // };

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
    history.push("/noticeList");
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

  const putting = e => {
    noticePut(title, content, noticeId);
  };

  const delling = e => {
    noticeDel(noticeId);
  };

  return (
    <div className="noticeListBody">
      {/* <div className="up-btn">
        <button className="btnList upBtn" />
        <button className="btnadd upBtn" />
      </div> */}
      <div className="listFlex">
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
          {viewList.length !== 0 ? (
            <div className="viewList">
              <div className="list-up">
                <input
                  type="text"
                  className="strong"
                  value={title}
                  onChange={handleTitle}
                >
                  {/* {viewList.title} */}
                </input>
                <div className="right-data">
                  <p className="fs10 primary">{viewList.writer}</p>
                  <p className="fs10 texthint">{date}</p>
                </div>
              </div>
              <textarea
                className="content"
                value={content}
                onChange={handleContent}
              >
                {/* {viewList.content} */}
              </textarea>
              <div className="btn">
                <button
                  className="btnError error"
                  type="button"
                  onClick={delling}
                >
                  공지사항 삭제
                </button>
                <button
                  className="btnClose bR8"
                  type="button"
                  onClick={putting}
                >
                  수정하기
                </button>
              </div>
            </div>
          ) : (
            <p className="texthint fs20 nopage">공지사항을 선택해주세요.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeListBody;
