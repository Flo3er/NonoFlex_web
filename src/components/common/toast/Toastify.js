// 모듈 불러오기
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// SampleText.js에서 text를 받아와 toast창에 출력
const Toastify = ({ text }) => {
  // tostify 알람 실행 함수 생성
  const notify = () => {
    toast.success(text, {
      // 상단 가운데 위치
      position: toast.POSITION.TOP_CENTER,
      // 2초 후 toast off
      autoClose: 2000,
      // 진행 시간 바 숨김
      hideProgressBar: true
    });
  };

  // 버튼 클릭시 toast 함수 실행
  return (
    <div>
      <button onClick={notify}>toast</button>
      <ToastContainer />
    </div>
  );
};

export default Toastify;
