import React, { useState } from "react";
import "./Header.css";

const Header = props => {
  const [search, setSearch] = useState("");

  const onChange = e => {
    setSearch(e.target.value);
    console.log(e.target.value);
    e.preventDefault();
  };

  const onReset = () => {
    setSearch("");
    props.setSearchValue("");
  };

  // 값이 없을 때도 setSearchValue 보여줘야함 (props.setSearchValue("")으로 해결)
  const onSearch = e => {
    e.preventDefault();
    if (search === null || search === "") {
      props.setSearchValue("");
    } else {
      props.setSearchValue(search);
    }
  };

  return (
    <div className="header row">
      <div className="main">
        <div className="mainTop padding">
          <h2>{props.name}</h2>
          <p className="fs14">{props.text}</p>
        </div>

        {props.name !== "노노유통" && (
          <div className="searchBox bR8">
            <input
              placeholder="검색어를 입력하세요."
              onChange={onChange}
              value={search}
            ></input>
            <div>
              <button
                className="close imgStyle"
                onClick={onReset}
                style={
                  search !== ""
                    ? { display: "inline-block" }
                    : { display: "none" }
                }
              />
              <button className="search imgStyle" onClick={onSearch} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
