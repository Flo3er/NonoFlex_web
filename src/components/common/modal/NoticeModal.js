import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { AiOutlineClose } from "react-icons/ai";
import { save } from "../../../features/BoardSlice";
import { useHistory } from "react-router-dom";
import "./NoticeModal.css";
import NoticeMethod from "../../../apis/NoitceMethod";

const NoticeModal = ({ onClose }) => {
  const [checkedButtons, setCheckedButtons] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [onFocused, setOnFocused] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSave = () => {
    const inputData = {
      id: "",
      title: title,
      content: content,
      onFocused: onFocused,
    };
    dispatch(save(inputData));
    NoticeMethod.NoticePost(title, content, onFocused);
    setTitle("");
    setContent("");
    setOnFocused("");
    history.push("/");
    onClose();
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
    <Modal>
      <div className="modal">
        <section>
          <form onSubmit>
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
        </section>
      </div>
    </Modal>
  );
};

export default NoticeModal;
