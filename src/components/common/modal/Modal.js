import React, { useRef } from "react";
import useOutSideClick from "../../../hooks/useOutSideClick";
import ModalContainer from "./ModalContainer";
import "./Modal.css";

const Modal = ({ onClose, children }) => {
  const modalRef = useRef(null);
  const handleClose = () => {
    // onClose?.();
  };

  useOutSideClick(modalRef, handleClose);

  return (
    <ModalContainer>
      <div className="overlay">
        <div className="modalWrap bR8" ref={modalRef}>
          <div className="contents">{children}</div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default Modal;
