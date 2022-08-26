import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { AiOutlineClose } from "react-icons/ai";
import { save } from "../../../features/BoardSlice";
import { useHistory } from "react-router-dom";
import "./NoticeModal.css";
import NoticeMethod from "../../../apis/NoitceMethod";

// import Toastify from "../toast/Toastify";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoticeModal = ({ onClose }) => {
  const [checkedButtons, setCheckedButtons] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [onFocused, setOnFocused] = useState(false);
  const [createAt, setCreateAt] = useState("");
  const [updateAt, setUpdateAt] = useState("");
  const dispatch = useDispatch();
  // const history = useHistory();

  const onSave = e => {
    if (title === "") {
      alert("title 비어있음");
      // 토스트창 구현하기
      // toast.error(`title가 비어있습니다`, {
      //   position: toast.POSITION.BOTTOM_CENTER,
      //   autoClose: 3000,
      // });
      title.focus();
      e.preventDefault();
    }
    if (content === "") {
      alert("content 비어있음");
      content.focus();
      e.preventDefault();
    }
    if (title !== "" && content !== "") {
      const inputData = {
        id: "",
        title: title,
        content: content,
        onFocused: onFocused,
        createAt: createAt,
        updateAt: updateAt,
      };
      // dispatch = action을 찾고 만약 action이 존재하면 status를 action으로 바꿈
      // 메서드를 호출하는 것
      dispatch(save(inputData));
      NoticeMethod.NoticePost(title, content, onFocused, createAt, updateAt);
      setTitle("");
      setContent("");
      setOnFocused("");
      setCreateAt("");
      setUpdateAt("");
      // history.push("/");
      onClose();
    }
  };

  const handleTitle = event => {
    setTitle(event.target.value);
  };
  const handleContent = event => {
    setContent(event.target.value);
  };

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedButtons([...checkedButtons, id]);
      console.log(`체크 반영 완료`);
      setOnFocused(true);
    } else {
      setCheckedButtons(checkedButtons.filter(button => button !== id));
      console.log(`체크 해제 반영 완료`);
      setOnFocused(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="modal">
        <section>
          <form>
            <header>
              <input
                type="text"
                placeholder="제목을 입력하세요"
                name="title"
                onChange={handleTitle}
              />
              <button className="close" onClick={onClose}>
                <AiOutlineClose />
              </button>
            </header>
            <main>
              <textarea
                placeholder="내용을 입력하세요 "
                className="bR8"
                onChange={handleContent}
                name="content"
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
                  checked={checkedButtons.includes("check") ? true : false}
                />
                <label id="check" htmlFor="check"></label>
                <p className="mL10 fs14">주요 공지사항</p>
              </div>
              <button className="btnClose bR8" onClick={onSave}>
                저장하기
              </button>
            </footer>
          </form>
          <ToastContainer />
        </section>
      </div>
    </Modal>
  );
};

export default NoticeModal;
