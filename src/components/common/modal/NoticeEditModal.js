import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { AiOutlineClose } from "react-icons/ai";
import "./NoticeModal.css";
import { useSelector } from "react-redux";
import { NoticeMethod } from "../../../apis/NoitceMethod";
import { useDispatch } from "react-redux";
import { edit } from "../../../features/BoardSlice";

const NoticeEditModal = ({ onClose }) => {
  // const [checkedButtons, setCheckedButtons] = useState([]);
  const inputData = useSelector(state => state.board.inputData);
  const [list, setList] = useState([]);

  // onChange 핸들러 데이터
  const [title, setTitle] = useState(inputData[inputData.length - 1].title);
  const [content, setContent] = useState(
    inputData[inputData.length - 1].content
  );
  const [onFocused, setOnFocused] = useState(
    inputData[inputData.length - 1].onFocused
  );
  const [noticeId, setNoticeId] = useState(
    inputData[inputData.length - 1].noticeId
  );
  // useState = state의 초기값을 정할 수 있고, return 값으로 state, setState를 돌려주는 hook

  // 수정 버튼 클릭 시 처리할 데이터
  const [editData, setEditData] = useState([title, content, onFocused]);

  // 넘겨줄 아이디값 담을 변수
  let id = null;

  const dispatch = useDispatch();

  // 핸들러
  const handleTitle = event => {
    setTitle(event.target.value);
    console.log(`title: ${title}`);
  };
  const handleContent = event => {
    setContent(event.target.value);
    console.log(`내용: ${content}`);
  };

  const changeHandler = (checked, id) => {
    if (checked) {
      // setCheckedButtons([...checkedButtons, id]);
      console.log(`체크 반영 완료`);
      setOnFocused(true);
    } else {
      // setCheckedButtons(checkedButtons.filter(button => button !== id));
      console.log(`체크 해제 반영 완료`);
      setOnFocused(false);
    }
  };

  useEffect(() => {
    const get = NoticeMethod.NoticeGet();
    const getData = () => {
      get.then(data => {
        setList(data[data.length - 1]);
        id = data[data.length - 1].noticeId;
        console.log(id);
        console.log(data[data.length - 1].onFocused);
        setOnFocused(data[data.length - 1].onFocused);
        setNoticeId(id);

        setEditData({
          title: data[data.length - 1].title,
          content: data[data.length - 1].content,
          onFocused: data[data.length - 1].onFocused,
          noticeId: data[data.length - 1].noticeId,
        });
      });
    };
    getData();
  }, []);

  function updateNotice(a, b, c) {
    setEditData({
      // set에 데이터값 들어가기 전에 먼저 찍혀서 값을 읽을 수 없다고 뜨기 때문에
      // 값이 있을 때 읽어들이라는 의미로 && 처리함.
      title: a && a,
      content: b && b,
      onFocused: c && c,
      noticeId: noticeId,
    });
  }

  const changeData = e => {
    if (title === "") {
      alert("title 비어있음");
      // 토스트창 구현하기
      e.preventDefault();
    }
    if (content === "") {
      alert("content 비어있음");
      e.preventDefault();
    }
    if (title !== "" && content !== "") {
      updateNotice(title, content, onFocused);
      // setEditData(updateNotice(title, content, onFocused, noticeId));
      dispatch(edit(editData));
      NoticeMethod.NoticePut(title, content, onFocused, noticeId);
      alert("ready");
      onClose();
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

  return (
    <Modal onClose={onClose}>
      <div className="modal">
        <section>
          <form>
            <header>
              <input
                type="text"
                name="title"
                onChange={handleTitle}
                // value 속성이 변하는 값일 때 defaultValue를 사용함
                // react에서 value 값이 read 전용이라 수정이 안되므로 defaultValue를 사용
                defaultValue={list && list.title}
              />
              <button className="close" onClick={onClose}>
                <AiOutlineClose />
              </button>
            </header>
            <main>
              <textarea
                className="bR8"
                onChange={handleContent}
                name="content"
                defaultValue={list && list.content}
              />
            </main>
            <footer>
              <div className="checking">
                <input
                  type="checkbox"
                  id="check"
                  onChange={e => {
                    changeHandler(e.currentTarget.checked, "check");
                  }}
                  checked={onFocused}
                />
                <label id="check" htmlFor="check"></label>
                <p className="mL10 fs14">주요 공지사항</p>
              </div>
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
                  onClick={onClose}
                >
                  수정하기
                </button>

                {/* 나중에 제거 */}
                <button
                  className="btnClose"
                  type="button"
                  onClick={() => {
                    updateNotice(title, content, onFocused, noticeId);
                  }}
                >
                  공지 수정 버튼
                </button>
                <button type="button" onClick={() => console.log(editData)}>
                  수정내용 콘솔보기
                </button>
              </div>
            </footer>
          </form>
        </section>
      </div>
    </Modal>
  );
};

export default NoticeEditModal;
