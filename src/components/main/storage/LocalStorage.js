import React, { useState } from "react";

const LocalStorage = () => {
  const [userName, setUserName] = useState("");
  const [check, setCheck] = useState(false);

  // 입력한 이름을 저장하는 함수 생성(setItem을 사용)
  // session에 저장하고 싶으면 sessionStorage, local에 저장하고 싶으면 localStorage만 변경해주면 됨.
  const saveData = () => {
    const userObj = { name: userName };
    sessionStorage.setItem("userName", JSON.stringify(userObj));
    localStorage.setItem("userName", JSON.stringify(userObj));
  };

  // 불러오기를 눌렀을 경우 callData함수로 인해 작성한 이름이 페이지에 보여지게 됨.
  const callData = () => {
    setCheck(true);
  };

  const onChange = (event) => {
    setUserName(event.target.value);
    setCheck(false);
  };

  return (
    // 불러오기를 눌렀을 경우 callData함수로 인해 작성한 이름이 페이지에 보여지게 됨.
    // check가 true일 경우 sessionStorage.getItem("userName")가 실행
    // 여기서 sessionStorage과 localStorage는 저장하고 싶은 위치에 따라 사용하면 됨.
    <div>
      <input name="userName" value={userName} onChange={onChange} placeholder="이름을 입력하세요" />
      <button onClick={saveData}>저장하기</button>
      <button onClick={callData}> 불러오기</button>
      {check ? <p>{localStorage.getItem("userName")}</p> : <> </>}
      {check ? <p>{sessionStorage.getItem("userName")}</p> : <> </>}
    </div>
  );
};

export default LocalStorage;