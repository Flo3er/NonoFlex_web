import React, { useRef } from 'react';
// import styled from 'styled-components';
// import { AiOutlineClose } from "react-icons/ai";

import useOutSideClick from '../../../hooks/useOutSideClick';
import ModalContainer from './ModalContainer';
import './Modal.css';

const Modal = ({ onClose, children }) => {
  const modalRef = useRef(null);
  const handleClose = () => {
    onClose ?.();
  };
  
  useOutSideClick(modalRef, handleClose);

  // useEffect(() => {
  //   const $body = document.querySelector("body");
  //   $body.style.overflow = "hidden";
  //   return () => ($body.style.overflow = "auto")
  // } ,[]);

  return (
    <ModalContainer>
      <div className="overlay">
        <div className="modalWrap" ref={modalRef}>
          <div className = "contents">{children}</div>
        </div>
      </div>
    </ModalContainer>
  );
}

export default Modal;