import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/image/logo.png";
import homeBlue from "../../../assets/image/homeBlue.png";
import productBlue from "../../../assets/image/productBlue.png";
import descriptionBlue from "../../../assets/image/descriptionBlue.png";
import settingsBlue from "../../../assets/image/settingsBlue.png";
import rightArrow from "../../../assets/image/arrowRight.png";

const Sidebar = props => {
  const [click, setClick] = useState(0);
  const [btnActive, setBtnActive] = useState(props.index);

  const main = [
    { page: "/", title: "홈" },
    { page: "/noticeList", title: "공지사항 목록" },
    { page: "/", title: "입/출고 현황" },
  ];
  const product = [
    { page: "/", title: "물품 목록" },
    { page: "/", title: "새 물품 추가" },
    { page: "/", title: "물품 상태 관리" },
  ];

  const toggleActive = e => {
    setBtnActive(() => {
      return e.target.value;
    });
  };

  const tabClickHandler = index => {
    setClick(index);
  };

  return (
    <div className="sidebar">
      <div className="head">
        <h1>
          <Link to="/">
            <img src={logo} alt="로고"></img>
            <div className="title">
              <h2>화성시니어클럽</h2>
              <p className="fs14">노노유통</p>
            </div>
          </Link>
        </h1>
        <div className="userinfo">
          <h3>OOO님(작업)</h3>
          <Link to="/" className="bR8 primary">
            마이페이지
          </Link>
        </div>
        <div className="mainNav">
          <ul className="depth1">
            <li
              onClick={() => tabClickHandler(0)}
              className={click === 0 ? "on" : ""}
            >
              <Link to="/" className="liA">
                <img src={homeBlue} className="imgStyle emo" />
                <p className="liP">메인 페이지</p>
              </Link>
              <ul className="depth2">
                {main.map((item, index) => {
                  return (
                    <div>
                      <li value={index} onClick={toggleActive}>
                        <Link
                          to={item.page}
                          className={
                            "btn" + (index == btnActive ? "active" : "")
                          }
                        >
                          <img
                            src={rightArrow}
                            className={
                              index == btnActive
                                ? "show_arrow imgStyle"
                                : "noShow"
                            }
                          />
                          <p>{item.title}</p>
                        </Link>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </li>
            <li
              onClick={() => tabClickHandler(1)}
              className={click === 1 ? "on" : ""}
            >
              <Link to="" className="liA">
                <img src={productBlue} className="imgStyle emo" />
                <p className="liP">물품 관리</p>
              </Link>
              <ul className="depth2">
                {product.map((item, index) => {
                  return (
                    <div>
                      <li value={index} onClick={toggleActive}>
                        <Link
                          to={item.page}
                          className={
                            "btn" + (index == btnActive ? "active" : "")
                          }
                        >
                          <img
                            src={rightArrow}
                            className={
                              index == btnActive
                                ? "show_arrow imgStyle"
                                : "noShow"
                            }
                          />
                          <p>{item.title}</p>
                        </Link>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </li>
            <li
              onClick={() => tabClickHandler(2)}
              className={click === 2 ? "on" : ""}
            >
              <Link to="" className="liA">
                <img src={descriptionBlue} className="imgStyle emo" />
                <p className="liP">문서 관리</p>
              </Link>
              <ul className="depth2">
                <li>
                  <Link to="/busList">
                    <p>1</p>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <p>2</p>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <p>3</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              onClick={() => tabClickHandler(3)}
              className={click === 3 ? "on" : ""}
            >
              <Link to="" className="liA">
                <img src={settingsBlue} className="imgStyle emo" />
                <p className="liP">관리자 설정</p>
              </Link>
              <ul className="depth2">
                <li>
                  <Link to="/busList">
                    <p>1</p>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <p>2</p>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <p>3</p>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
