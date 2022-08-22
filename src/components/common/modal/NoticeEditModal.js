import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { AiOutlineClose } from "react-icons/ai";
import "./Modal.css";
import { NoticeMethod } from "../../../apis/NoitceMethod";
import { useSelector } from "react-redux";
import NoticeModal from "../../common/modal/NoticeModal";

const NoticeEditModal = ({ onClose }) => {
  const [checkedButtons, setCheckedButtons] = useState([]);
  const inputData = useSelector(state => state.board.inputData);
  const lastId = useSelector(state => state.board.lastId);
  const [list, setList] = useState([]);

  // const handleTitle = event => {
  //   setTitle(event.target.value);
  // };
  // const handleContent = event => {
  //   setContent(event.target.value);
  // };

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedButtons([...checkedButtons, id]);
      console.log(`체크 반영 완료`);
    } else {
      setCheckedButtons(checkedButtons.filter(button => button !== id));
      console.log(`체크 해제 반영 완료`);
    }
  };

  useEffect(() => {
    const get = NoticeMethod.NoticeGet();
    const getData = () => {
      get.then(data => {
        setList(data);
      });
    };
    getData();
  }, []);

  return (
    <Modal>
      <div className="modal">
        <section>
          <form onSubmit>
            <header>
              <input
                type="text"
                name="title"
                // onChange={handleTitle}
                // value={title}
              />
              <button className="close" onClick={onClose}>
                <AiOutlineClose />
              </button>
            </header>
            <main>
              <textarea
                className="bR8"
                // onChange={handleContent}
                name="content"
                // value={content}
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
              <div className="btn">
                <button className="btnError error">공지사항 삭제</button>
                <button className="btnClose bR8">수정하기</button>
              </div>
            </footer>
          </form>
        </section>
      </div>
    </Modal>
  );
};

export default NoticeEditModal;
