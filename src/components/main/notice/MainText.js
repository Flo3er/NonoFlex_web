import React, { useEffect } from "react";
import "./MainText.css";
import { Link } from "react-router-dom";
import { BsCircleFill } from "react-icons/bs";

import { useState } from "react";
import NoticeModal from "../../common/modal/NoticeModal";
import NoticeEditViewModal from "../../common/modal/NoticeEditViewModal";
import NoticeMethod from "../../../apis/NoitceMethod";
import { useDispatch } from "react-redux";
import { select } from "../../../features/BoardSlice";

function MainText() {
  const [recentData, setRecentData] = useState({});

  // const inputData = useSelector(state => state.board.inputData);
  // const lastId = useSelector(state => state.board.lastId);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [created, setCreated] = useState("");
  const [updated, setUpdated] = useState("");
  const [noticeId, setNoticeId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const get = NoticeMethod.NoticeGetRecent();
    const getData = () => {
      get.then(data => {
        setRecentData(data);
        setNoticeId(data.noticeId); //props로 보내주기위해 담음
        dispatch(select(data.noticeId));
        setCreated(data.createdAt);
        setUpdated(data.updatedAt);
      });
    };
    getData();
  }, [noticeId]);
  // useEffect(() => {}, [A])
  // A값이 변경되는 경우에 render라는 의미

  // notice modal open
  const onClickButton1 = () => {
    setIsOpen1(true);
  };
  // notice edit modal open
  const onClickBody = () => {
    setIsOpen2(true);
  };

  return (
    <div className="mainText">
      {recentData !== "" && (
        <div className="mainData">
          <div className="subData">
            <div className="topmenu">
              <h3>공지사항</h3>
              <div className="topmenu_icon">
                <Link to="/noticeList" className="btnListBlue imgStyle" />
                <button
                  className="btnaddBlue mL10 imgStyle"
                  onClick={onClickButton1}
                />
                {isOpen1 && (
                  <NoticeModal
                    onClose={() => {
                      setIsOpen1(false);
                    }}
                  />
                )}
              </div>
            </div>
            <div
              className="updateList bR8 back-secondary textHint fs12"
              onClick={onClickBody}
            >
              <div className="noticeTop">
                <h3 className="textDark">{recentData.title}</h3>
                {recentData.focus === true ? (
                  <BsCircleFill className="primaryDark" />
                ) : null}
              </div>
              <div className="noticeInfo">
                <p className="fs10 info-content textDark">{recentData.content}</p>
                <div className="info-detail">
                  {/*  처음엔 createAt이 , 수정 시 updateAt이 나오게 조건문 작성하기! */}
                  {/* p안에 p를 둬서 생기는 오류 ↓*/}
                  {/* validateDOMNesting(...): <p> cannot appear as a descendant of <p> */}
                  <div className="fs10">
                    {/* ↑ 오류 수정을 위해 div로 변경 */}
                    {created === updated && (
                      <p>
                        {(created || "")
                          .split("T")[0]
                          .replace(/-/, "년 ")
                          .replace(/-/, "월 ")
                          .concat("일")}
                      </p>
                    )}
                    {created !== updated && (
                      <p>
                        {(updated || "")
                          .split("T")[0]
                          .replace(/-/, "년 ")
                          .replace(/-/, "월 ")
                          .concat("일")}
                      </p>
                    )}
                  </div>
                  <p className="fs10 textColor">{recentData.writer}</p>
                </div>
              </div>
            </div>
            {isOpen2 && (
              <NoticeEditViewModal
                disableValue
                noticeId={noticeId}
                onCloseModal={() => {
                  setIsOpen2(false);
                }}
              />
            )}
          </div>
        </div>
      )}
      {recentData === "" && (
        <div className="mainData">
          <div className="subData">
            <div className="topmenu">
              <h3>공지사항</h3>
              <div className="topmenu_icon">
                <Link to="/noticeList" className="btnListBlue" />
                <button className="emo btnaddBlue" onClick={onClickButton1} />
                {isOpen1 && (
                  <NoticeModal
                    onClose={() => {
                      setIsOpen1(false);
                    }}
                  />
                )}
              </div>
            </div>
            <div className="infoList bR8 fs14 back-secondary textHint">
              <p>{"새로운 공지를 입력해보세요!"}</p>
            </div>
          </div>
        </div>
      )}
      {/* {inputData.length == inputData.length - 1 && <p>?</p>} */}
    </div>
  );
}
export default MainText;
