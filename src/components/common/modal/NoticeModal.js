import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { AiOutlineClose } from "react-icons/ai";
import { save } from "../../../features/BoardSlice";
import "./NoticeModal.css";
import NoticeMethod from "../../../apis/NoitceMethod";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoticeModal = ({ onClose }) => {
  const [checkedButtons, setCheckedButtons] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [focus, setFocus] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const dispatch = useDispatch();
  // const history = useHistory();

  const handleTitle = e => {
    // setTitle(event.target.value);
    // console.log(title);
    setTitle(e.target.value);
    console.log(e.target.value);
  };
  const handleContent = event => {
    setContent(event.target.value);
  };

  const onSave = e => {
    if (title === "") {
      toast("제목을 입력해주세요.");
      e.preventDefault();
    }
    if (content === "") {
      toast("내용을 입력해주세요.");
      e.preventDefault();
    }
    if (title !== "" && content !== "") {
      const newData = NoticeMethod.NoticePost(
        title,
        content,
        focus,
        createdAt,
        updatedAt
      );
      // 결과 받는 동작 만들기
      // 결과값을 inputData에 넣기

      const inputData = {
        title: newData.title,
        content: newData.content,
        focus: newData.focus,
        id: newData.noticeId,
        createdAt: newData.createdAt,
        updatedAt: newData.updatedAt,
        writer: newData.writer,
      };
      // dispatch = action을 찾고 만약 action이 존재하면 status를 action으로 바꿈
      // 메서드를 호출하는 것
      // ********************** dispatch study ***************************************
      dispatch(save(inputData));
      setTitle("");
      setContent("");
      setFocus("");
      setCreatedAt("");
      setUpdatedAt("");
      onClose();
      window.location.reload();
    }
  };

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedButtons([...checkedButtons, id]);
      console.log(`체크 반영 완료`);
      setFocus(true);
    } else {
      setCheckedButtons(checkedButtons.filter(button => button !== id));
      console.log(`체크 해제 반영 완료`);
      setFocus(false);
    }
  };

  return (
    <div className="for_toast">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        style={{ zIndex: "999999" }}
      />
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
                  // value={title}
                />
                <button
                  className="close btnCloseImg"
                  onClose={onClose}
                ></button>
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
          </section>
        </div>
      </Modal>
    </div>
  );
};

export default NoticeModal;
