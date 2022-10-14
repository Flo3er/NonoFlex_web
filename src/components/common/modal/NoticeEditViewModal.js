import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import "./NoticeModal.css";
import { NoticeMethod } from "../../../apis/NoitceMethod";
import { useDispatch } from "react-redux";
import { edit } from "../../../features/BoardSlice";

import { toast, ToastContainer } from "react-toastify";

const NoticeEditModal = props => {
  const { noticeId, onCloseModal, disableValue } = props;
  console.log(noticeId);
  // const inputData = useSelector(state => state.board.inputData);
  const [IndexData, setIndexData] = useState({});

  // onChange 핸들러 데이터
  const [title, setTitle] = useState(noticeId.title);
  const [content, setContent] = useState(noticeId.content);
  const [focus, setFocus] = useState(noticeId.focus);
  const [createdAt, setCreatedAt] = useState(noticeId.cretedAt);
  const [updatedAt, setUpdatedAt] = useState(noticeId.updatedAt);
  // useState = state의 초기값을 정할 수 있고, return 값으로 state, setState를 돌려주는 hook

  // 수정 버튼 클릭 시 처리할 데이터
  const [editData, setEditData] = useState([title, content, focus]);

  const dispatch = useDispatch();

  // 수정버튼 누르고나면 작업
  const [disable, setDisable] = useState(true);

  // 핸들러
  const handleTitle = event => {
    setTitle(event.target.value);
    console.log(`title: ${title}`);
  };
  const handleContent = event => {
    setContent(event.target.value);
    console.log(`내용: ${content}`);
  };

  const changeHandler = checked => {
    if (checked) {
      console.log(`체크 반영 완료`);
      setFocus(true);
    } else {
      console.log(`체크 해제 반영 완료`);
      setFocus(false);
    }
  };

  // noticeId를 받아서 get/~~~/noticeId로 해당 데이터만 불러오게하는 것
  useEffect(() => {
    const get = NoticeMethod.NoticeGetIndex(noticeId);
    const getData = () => {
      get.then(data => {
        setIndexData(data);
        setTitle(data.title);
        setContent(data.content);
        setFocus(data.focus);
        setCreatedAt(data.createdAt);
        setUpdatedAt(data.updatedAt);
      });
    };
    getData();
  }, []);

  function updateNotice(a, b, c, noticeId) {
    setEditData({
      // set에 데이터값 들어가기 전에 먼저 찍혀서 값을 읽을 수 없다고 뜨기 때문에
      // 값이 있을 때 읽어들이라는 의미로 && 처리함.
      title: a && a,
      content: b && b,
      focus: c && c,
      noticeId: noticeId,
    });
  }

  // 수정하기 버튼 클릭 시 수정할 수 있게 바꾸기 (input에 disable 풀어줌)
  const changeData = e => {
    console.log("수정하기 버튼 클릭함");
    setDisable(false);
  };

  const saveChange = e => {
    if (title === "" || title === null) {
      toast("제목을 입력해주세요.");
      console.log(title.target.value);
      e.preventDefault();
    }
    if (content === "") {
      toast("내용을 입력해주세요.");
      e.preventDefault();
    }
    if (title !== "" && content !== "") {
      NoticeMethod.NoticePut(title, content, focus, noticeId);
      updateNotice(title, content, focus, noticeId);
      // setEditData(updateNotice(title, content, onFocused, noticeId));
      dispatch(edit(editData));
      setTitle("");
      setContent("");
      setFocus("");
      onCloseModal();
      window.location.reload();
      // window.location.replace("/");
      // listpage에서 모달불러서 수정한 후에도 /로 갈수잇기때문에 다른 방법으로 해결 필요
    }
  };

  const noticeDel = noticeId => {
    NoticeMethod.NoticeDelete(noticeId);
  };
  const delling = e => {
    noticeDel(noticeId);
    // 화면 새로고침되게 설정
    // (history.push로는 작동되지않아 다른 방법으로 진행함)
    window.location.replace("/");
  };

  // 날짜 데이터 수정 후 사용

  // console.log(createdAt, updatedAt);
  const createda = (createdAt || "").split("T");
  //input value가 undefined 값이 들어갈 수도 있으면 발생하는 에러
  // 초기값이 undefined였다가 렌더링 후에 값이 들어와 바뀌면서 발생한 에러
  const updateda = (updatedAt || "").split("T");
  const createda0 = createda[0];
  const createda1 = createda[1];
  const updateda0 = updateda[0];
  const updateda1 = updateda[1];
  const createDa = createda0
    .replace(/-/, "년 ")
    .replace(/-/, "월 ")
    .concat("일");
  const updateDa = updateda0
    .replace(/-/, "년 ")
    .replace(/-/, "월 ")
    .concat("일");
  // console.log(createDa, updateDa);
  const createda1C = (createda1 || "").slice(0, -3);
  const updateda1C = (updateda1 || "").slice(0, -3);

  return (
    <div className="for_toast">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        style={{ zIndex: "999999" }}
      />
      <Modal onClose={onCloseModal}>
        <div className="modal">
          <section>
            <form>
              <header>
                {disableValue === true ? (
                  <input
                    name="title"
                    onChange={handleTitle}
                    // value 속성이 변하는 값일 때 defaultValue를 사용함
                    // react에서 value 값이 read 전용이라 수정이 안되므로 defaultValue를 사용
                    defaultValue={title || ""}
                    disabled={disable}
                  />
                ) : (
                  <input
                    name="title"
                    onChange={handleTitle}
                    // value 속성이 변하는 값일 때 defaultValue를 사용함
                    // react에서 value 값이 read 전용이라 수정이 안되므로 defaultValue를 사용
                    defaultValue={title || ""}
                    disabled={disableValue}
                  />
                )}

                <button
                  className="close btnCloseImg"
                  onClose={onCloseModal}
                ></button>
              </header>
              {/* header,body - figma 이해 잘못했던 부분 
            (바로 수정가능이 아니라 우선 값만 불러오기) */}
              <main>
                {disableValue === true ? (
                  <textarea
                    className="bR8"
                    onChange={handleContent}
                    name="content"
                    defaultValue={content}
                    disabled={disable}
                    style={disable === true ? { border: "none" } : null}
                  />
                ) : (
                  <textarea
                    className="bR8"
                    onChange={handleContent}
                    name="content"
                    defaultValue={content}
                    disabled={disableValue}
                    style={disable === false ? { border: "none" } : null}
                  />
                )}
                <div
                  className="dateData textHint fs12"
                  style={disable === false ? { display: "none" } : null}
                >
                  {createda[0] === updateda[0] &&
                  createda[1] === updateda[1] ? (
                    <div>
                      <p>
                        {createDa} {createda1C}
                      </p>
                      <p></p>
                    </div>
                  ) : createda[0] === updateda[0] &&
                    createda[1] !== updateda[1] ? (
                    <p>
                      {updateDa} {updateda1C} (수정됨)
                    </p>
                  ) : (
                    <p>
                      {updateDa} {updateda1C} (수정됨)
                    </p>
                  )}
                </div>
              </main>
              <footer>
                <div className="checking">
                  {disable === false || disableValue === false ? (
                    <input
                      type="checkbox"
                      id="check"
                      onChange={e => {
                        changeHandler(e.currentTarget.checked, "check");
                      }}
                      checked={focus}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      id="check"
                      checked={focus}
                      disabled={disable}
                    />
                  )}
                  <label id="check" htmlFor="check"></label>
                  <p className="mL10 fs14">주요 공지사항</p>
                </div>
                {disable === true && disableValue === true ? (
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
                      onClick={changeData}
                    >
                      수정하기
                    </button>
                  </div>
                ) : (
                  <div className="btn">
                    <button
                      className="btnClose bR8"
                      type="button"
                      onClick={saveChange}
                    >
                      저장하기
                    </button>
                  </div>
                )}
              </footer>
            </form>
          </section>
        </div>
      </Modal>
    </div>
  );
};

export default NoticeEditModal;
