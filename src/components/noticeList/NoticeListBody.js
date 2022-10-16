import React, { useEffect, useState } from "react";
import "./NoticeListBody.css";
import { NoticeMethod } from "../../apis/NoitceMethod";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import NoticeModal from "../common/modal/NoticeModal";
import NoticeEditViewModal from "../common/modal/NoticeEditViewModal";
import downArrow from "../../assets/image/arrow_downward_dark.png";
import upArrow from "../../assets/image/arrow_upward_dark.png";

const NoticeListBody = props => {
  const searchValue = props.searchValue;

  const [list, setList] = useState([]);
  const [viewList, setViewList] = useState([]);
  const [changedate, setChangeDate] = useState([]);

  const selectRowData = useSelector(state => state.board.selectRowData);
  // console.log(selectRowData);       //빈값
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noticeId, setNoticeId] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [display, setDisplay] = useState(false);
  const history = useHistory();

  // parameters
  const [column, setColumn] = useState("");
  const [order, setOrder] = useState("");
  const [size, setSize] = useState(10);

  // drop down menu category
  const dataCategory = [
    { text: "수정날짜", img: downArrow, fn: editDown },
    { text: "수정날짜", img: upArrow, fn: editUp },
    { text: "생성날짜", img: downArrow, fn: createDown },
    { text: "생성날짜", img: upArrow, fn: createUp },
  ];
  const [category, setCategory] = useState("생성 날짜");
  const [arrow, setArrow] = useState(false); //true일 때 오름차순, flase일 때 내림차순

  const [isIndex, setIsIndex] = useState(null);

  // scroll event 관련
  function handleScroll() {
    setSize(size + 10);
  }

  // get data를 불러오기 위한 useEffect
  useEffect(() => {
    // setQuery(searchValue);
    const get = NoticeMethod.NoticeGet(column, order, searchValue, size);
    // console.log(get);
    const getData = () => {
      get.then(data => {
        setList(data);
      });
    };
    getData();
  }, [column, order, searchValue, size]);
  // console.log(list);

  const onClickButton = () => {
    setIsOpen(true);
  };
  const onClickButton2 = () => {
    setIsOpen2(true);
  };

  const handleTitle = event => {
    setTitle(event.target.value);
  };
  const handleContent = event => {
    setContent(event.target.value);
  };
  console.log(isIndex);
  function onClickList(index) {
    const listIndex = list[index];
    // console.log(listIndex);
    setIsIndex(index);
    console.log(index);
    setViewList(listIndex);

    // 날짜 YYYY-MM-DD를 YYYY년 MM월 DD일로 변경하기
    const date = listIndex.updatedAt;
    const update =
      date.substr(0, 4) +
      "년 " +
      date.substr(5, 2) +
      "월 " +
      date.substr(8, 2) +
      "일";
    setChangeDate(update);

    setNoticeId(listIndex.noticeId);
    setTitle(listIndex.title);
    setContent(listIndex.content);
    history.push("/noticeList");
  }

  const noticeDel = noticeId => {
    NoticeMethod.NoticeDelete(noticeId);
  };

  const delling = e => {
    noticeDel(noticeId);
    // 화면 새로고침되게 설정
    // (history.push로는 작동되지않아 다른 방법으로 진행함)
    window.location.replace("/noticeList");
  };

  function editDown() {
    const res = NoticeMethod.NoticeGet("updatedAt", "desc");
    setColumn("updatedAt");
    setOrder("desc");
    setCategory("수정 날짜");
    setArrow(false);
    setDisplay(!display);

    // 주소창 업데이트를 위한 history
    // history.push({
    //   pathname: "/noticeList",
    //   search: "?column=updatedAt?order=desc",
    // });
  }

  function editUp() {
    const res = NoticeMethod.NoticeGet("updatedAt", "asc");
    setColumn("updatedAt");
    setOrder("asc");
    setCategory("수정 날짜");
    setArrow(true);
    setDisplay(!display);
  }
  function createDown() {
    const res = NoticeMethod.NoticeGet("createdAt", "desc");
    setColumn("createdAt");
    setOrder("desc");
    setCategory("생성 날짜");
    setArrow(false);
    setDisplay(!display);
  }
  function createUp() {
    const res = NoticeMethod.NoticeGet("createdAt", "asc");
    setColumn("createdAt");
    setOrder("asc");
    setCategory("생성 날짜");
    setArrow(true);
    setDisplay(!display);
  }

  return (
    <div className="noticeListBody">
      <div className="up-btn"></div>
      <div className="listFlex">
        <div className="position_change">
          <button
            className="upBtn primaryDark"
            onClick={e => setDisplay(!display)}
          >
            {category}
            {arrow == true ? (
              <img src={upArrow} className="imgStyle" />
            ) : (
              <img src={downArrow} className="imgStyle" />
            )}
          </button>
          {display && (
            <div className="display_menu">
              <ul className="bR8 textDark fs14">
                {dataCategory.map((data, index) => {
                  return (
                    <li onClick={data.fn} index={index}>
                      {data.text}
                      <img src={data.img} className="imgStyle arrow" />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <div className="full-list" id="full-list" onScroll={handleScroll}>
            <ul className="depth1">
              {list &&
                list.map((list, index) => (
                  <li
                    // className={
                    //   "depth1Li" + (index == listActive ? "active" : "")
                    //
                    className={
                      isIndex == index ? "depth1Li changeDepth1Li" : "depth1Li"
                    }
                    // className="depth1Li"
                    key={index}
                    // onClick={toggleActive}
                    onClick={() => {
                      onClickList(index);
                      // onShowList(false);
                    }}
                    // style={{ color: listStyle }}
                  >
                    <div className="list-left">
                      <p className="list-data">{list.title}</p>
                    </div>
                    <div className="list-right fs10 primaryDark">
                      <p>{list.writer}</p>
                      <p className="go-right">
                        {list.updatedAt
                          .slice(2)
                          .split("T")[0]
                          .replace(/-/, "년 ")
                          .replace(/-/, "월 ")
                          .concat("일")}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="position_change">
          <button
            className="btnaddBlue upBtn imgStyle"
            onClick={onClickButton}
          />
          {isOpen && (
            <NoticeModal
              onClose={() => {
                setIsOpen(false);
              }}
            />
          )}
          <div className="choice-notice bR8">
            {viewList.length !== 0 ? (
              <div className="viewList">
                <div className="list-up">
                  <input
                    type="text"
                    className="strong"
                    value={title}
                    onChange={handleTitle}
                    disabled
                  />
                  <div className="right-data">
                    <p className="fs10 primary">{viewList.writer}</p>
                    <p className="fs10 textHint">{changedate}</p>
                  </div>
                </div>
                <textarea
                  className="content"
                  value={content}
                  onChange={handleContent}
                  disabled
                />
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
                    onClick={onClickButton2}
                  >
                    수정하기
                  </button>
                  {isOpen2 && (
                    <NoticeEditViewModal
                      disableValue={false}
                      noticeId={noticeId}
                      onCloseModal={() => {
                        setIsOpen2(false);
                      }}
                    />
                  )}
                </div>
              </div>
            ) : (
              <p className="textHint fs20 nopage">공지사항을 선택해주세요.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeListBody;
