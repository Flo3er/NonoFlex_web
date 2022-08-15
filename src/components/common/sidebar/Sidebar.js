// import React from 'react';
// import './Sidebar.css';
// import { Link } from 'react-router-dom';
// import {AiFillAliwangwang} from 'react-icons/ai';
import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { CgHome } from "react-icons/cg";
import { BiBox, BiFile } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import logo from "../../../assets/image/logo.png";
import $ from "jquery";

const Sidebar = () => {
  const [click, setClick] = useState(0);

  const tabClickkHandler = index => {
    setClick(index);
  };

  $(".depth2 > li ").on("click", function (e) {
    e.preventDefault();
    $(this).css({ color: "red" });
  });

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
              onClick={() => tabClickkHandler(0)}
              className={click === 0 ? "on" : ""}
            >
              <Link to="/" className="liA">
                <CgHome className="emo" />
                <p className="liP">메인 페이지</p>
              </Link>
              <ul className="depth2">
                <li>
                  <Link to="/noticeList">
                    <IoIosArrowForward className="arrow" />
                    <p>공지사항 목록</p>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <IoIosArrowForward className="arrow" />
                    <p>참여자 작업 현황</p>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <IoIosArrowForward className="arrow" />
                    <p>입&#47;출고 현황</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              onClick={() => tabClickkHandler(1)}
              className={click === 1 ? "on" : ""}
            >
              <Link to="" className="liA">
                <BiBox className="emo" />
                <p className="liP">물품 관리</p>
              </Link>
              <ul className="depth2">
                <li>
                  <Link to="">
                    <IoIosArrowForward className="arrow" />
                    <p>물품 목록</p>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <IoIosArrowForward className="arrow" />
                    <p>새 물품 추가</p>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <IoIosArrowForward className="arrow" />
                    <p>물품 상태 관리</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              onClick={() => tabClickkHandler(2)}
              className={click === 2 ? "on" : ""}
            >
              <Link to="" className="liA">
                <BiFile className="emo" />
                <p className="liP">문서 관리</p>
              </Link>
              <ul className="depth2">
                <li>
                  <Link to="/busList">
                    <IoIosArrowForward className="arrow" />
                    <p>1</p>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <IoIosArrowForward className="arrow" />
                    <p>2</p>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <IoIosArrowForward className="arrow" />
                    <p>3</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              onClick={() => tabClickkHandler(3)}
              className={click === 3 ? "on" : ""}
            >
              <Link to="" className="liA">
                <AiOutlineSetting className="emo" />
                <p className="liP">관리자 설정</p>
              </Link>
              <ul className="depth2">
                <li>
                  <Link to="/busList">
                    <IoIosArrowForward className="arrow" />
                    <p>1</p>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <IoIosArrowForward className="arrow" />
                    <p>2</p>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <IoIosArrowForward className="arrow" />
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
