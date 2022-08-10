import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import { AiOutlineClose } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import "./Modal.css";
import { edit } from "../../../features/BoardSlice";

const NoticeEditModal = ({ onClose }) => {
  const [checkedButtons, setCheckedButtons] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // selectRowData useSelector를 이용해 조회한 state내에 있는 selectRowData 저장한다.
  //   const selectRowData = useSelector(state => state.board.selectRowData);
  //   // title 초기값은 현재 저장되어 있는 selectRowData의 title을 가져와 보여준다.
  //   const [title, setTitle] = useState(selectRowData.title);
  //   console.log();
  //   // content 초기값은 현재 저장되어 있는 selectRowData의 content를 가져와 보여준다.
  //   const [content, setContent] = useState(selectRowData.content);

  //   const dispatch = useDispatch();
  //   const history = useHistory();

  //   const onEdit = () => {
  //     const inputData = {
  //       id: selectRowData.id,
  //       title: title,
  //       content: content,
  //     };
  //     console.log(inputData);
  //     // console.log("clickSave :: ", inputData);
  //     dispatch(edit(inputData));
  //     setTitle("");
  //     setContent("");
  //     history.push("/");
  //   };

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
    } else {
      setCheckedButtons(checkedButtons.filter(button => button !== id));
      console.log(`체크 해제 반영 완료`);
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
                name="title"
                onChange={handleTitle}
                value={title}
              />
              <button className="close">
                <AiOutlineClose />
              </button>
            </header>
            <main>
              <textarea
                className="bR8"
                onChange={handleContent}
                name="content"
                value={content}
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
              <button className="close bR8">수정하기</button>
            </footer>
          </form>
        </section>
      </div>
    </Modal>
  );
};

export default NoticeEditModal;
