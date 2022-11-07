import "./Sidebar.css";
import { Link } from "react-router-dom";

import logo from "../../../../assets/images/logo.png";
import homeBlue from "../../../../assets/images/homeBlue.png";
import productBlue from "../../../../assets/images/productBlue.png";
import descriptionBlue from "../../../../assets/images/descriptionBlue.png";
import settingsBlue from "../../../../assets/images/settingsBlue.png";
import rightArrow from "../../../../assets/images/arrowRight.png";


const SideBar = () => {
    return (
        <div className="sidebar">
          <div>
            <h1>
              <Link to="/">
                <img src={logo}></img>
                <div>
                  <h2>화성시니어클럽</h2>
                  <p>노노유통</p>
                </div>
              </Link>
            </h1>
            <div>
              <h3>OOO님(작업)</h3>
              <Link to="/" >
                마이페이지
              </Link>
            </div>
            <div>
              <ul>
                <li onClick={() => null }>
                  <Link to="/">
                    <img src={homeBlue} />
                    <p>메인 페이지</p>
                  </Link>
                </li>
                <li onClick={() => null} >
                  <Link to="">
                    <img src={productBlue} />
                    <p >물품 관리</p>
                  </Link>
                </li>
                <li onClick={() => null} >
                  <Link to="">
                    <img src={descriptionBlue} />
                    <p >문서 관리</p>
                  </Link>
                </li>
                <li onClick={() => null}>
                  <Link to="" >
                  <img src={settingsBlue} />
                    <p>관리자 설정</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    
}

export default SideBar;