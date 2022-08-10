import React, { useEffect, useState } from "react";
import "./NoticeListBody.css";
import { NoticeMethod } from "../../apis/NoitceMethod";
import { useSelector, useDispatch } from "react-redux";
// import ViewList from './ViewList.js';
import { select } from "../../features/BoardSlice";

const NoticeListBody = () => {
  const [list, setList] = useState([]);
  const [viewList, setViewList] = useState([]);

  useEffect(() => {
    const get = NoticeMethod.NoticeGet();
    // console.log(get)
    const getData = () => {
      get.then(data => {
        setList(data);
      });
    };
    getData();
  }, []);

  function onClickList(index) {
    const listA = list[index];
    console.log(listA);
    // setViewList(listA);
  }

  return (
    <div className="noticeListBody">
      <div className="full-list">
        <ul className="depth1">
          {list &&
            list.map((list, index) => (
              <li className="depth1Li" key={index} onClick={onClickList(index)}>
                <div className="list-left">
                  <p className="list-data">{list.title}</p>
                </div>
                <div className="list-right fs10 primaryDark">
                  <p className="list-data">{list.write}</p>
                  <p>{list.createAt}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="choice-notice">
        <div>{/* <p>{checkNoticeId}</p> */}</div>
      </div>
    </div>
  );
};

export default NoticeListBody;
