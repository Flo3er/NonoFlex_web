import "./Sidebar.css";
import { Link } from "react-router-dom";

import logo from "../../../../assets/images/logo.png";
import homeBlue from "../../../../assets/images/homeBlue.png";
import productBlue from "../../../../assets/images/productBlue.png";
import descriptionBlue from "../../../../assets/images/descriptionBlue.png";
import settingsBlue from "../../../../assets/images/settingsBlue.png";
import rightArrow from "../../../../assets/images/arrowRight.png";
import RoundButton from "../button/RoundButton";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Utils from "../../../../features/utils/Utils";


const SideBar = props => {
  const [userName, updateUserName] = useState("이름");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // 사용자 이름 설정
    const accessToken = sessionStorage.getItem("accessToken");
    const tokenData = Utils.parseJwt(accessToken);
    updateUserName(tokenData.username);
    // 페이지 당 선택한 인덱스 설정.
    updateInitialSelectedIndex();
  }, []);

  const main = [
    { page: "/main", title: "홈" },
    { page: "/notice/list", title: "공지사항 목록" },
    { page: "/status", title: "입/출고 현황" },
  ];
  const product = [
    { page: "/product/list", title: "물품 목록" },
    { page: "/product/new", title: "새 물품 추가" },
    { page: "/product/status", title: "물품 상태 관리" },
  ];
  const document = [
    { page: "/document/list", title: "문서 목록" },
    { page: "/document/ready", title: "예정서 작성" },
    { page: "/document/confirm", title: "확인서 작성" },
    { page: "/document/print", title: "문서 출력" }
  ];
  const setting = [
    { page: "/settings/user", title: "사용자 설정" }
  ];

  const onClickMainMenu = (index) => {
    setSelectedIndex(index);
  }

  function updateInitialSelectedIndex() {
    main.map((item) => {
      if (item.page == props.value) {
        setSelectedIndex(0);
      }
    });

    product.map((item) => {
      if (item.page == props.value) {
        setSelectedIndex(1);
      }
    });
    document.map((item) => {
      if (item.page == props.value) {
        setSelectedIndex(2);
      }
    });
    setting.map((item) => {
      if (item.page == props.value) {
        setSelectedIndex(3);
      }
    });
  }

  return (
    <div className="sidebar">
      <div className="company">
        <Link to="/">
          <img src={logo} className="companyLogo"></img>
          <div className="companyInfo">
            <p className="companyName">화성시니어클럽</p>
            <hr />
            <p className="productName">노노유통</p>
          </div>
        </Link>
      </div>
      <div className="user">
        <p className="userName">{userName}</p>
        <p className="userNameSufix">님</p>
        <div className="myPageButton">
          <RoundButton value="마이페이지" />
        </div>
      </div>
      <div className="menu">
        <ul>
          <li
            onClick={() => onClickMainMenu(0)}
            className={selectedIndex == 0 ? "selectedMenuBox" : "menuBox"}>
            <div className="menuImage" >
              <img src={homeBlue} />
            </div>
            <p className={selectedIndex == 0 ? "selectedMenuText" : "menuText"}>메인 페이지</p>
            <div hidden={selectedIndex !== 0}>
              <ul
                className="subMenu">
                {
                  main.map((item, index) => {
                    return (
                      <li>
                        <Link to={item.page}>
                          <div className="subMenuImage" >
                            <img src={rightArrow} hidden={props.value !== item.page} />
                          </div>
                          <p className={props.value == item.page ? "selectedSubMenuText" : "subMenuText"}>{item.title}</p>
                        </Link>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </li>
          <li onClick={() => onClickMainMenu(1)}
            className={selectedIndex == 1 ? "selectedMenuBox" : "menuBox"}>
            <div>
              <div className="menuImage" >
                <img src={productBlue} />
              </div>
              <p className={selectedIndex == 1 ? "selectedMenuText" : "menuText"}>물품 관리</p>
            </div>
          </li>
          <li onClick={() => onClickMainMenu(2)}
            className={selectedIndex == 2 ? "selectedMenuBox" : "menuBox"}>
            <div>
              <div className="menuImage" >
                <img src={descriptionBlue} />
              </div>
              <p className={selectedIndex == 2 ? "selectedMenuText" : "menuText"}>문서 관리</p>
            </div>
          </li>
          <li onClick={() => onClickMainMenu(3)}
            className={selectedIndex == 3 ? "selectedMenuBox" : "menuBox"}>
            <div >
              <div className="menuImage" >
                <img src={settingsBlue} />
              </div>
              <p className={selectedIndex == 3 ? "selectedMenuText" : "menuText"}>관리자 설정</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );

}



export default SideBar;