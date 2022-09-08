import React from 'react';
import { createPortal } from 'react-dom';

// createPortal(컴포넌트, 컴포넌트를 넣어줄 DOM)
const ModalContainer = ({ children }) => {
    return createPortal(<>{children}</>, document.getElementById('modal'));
}
// Document.getElementById(): 주어진 문자열과 일치하는 id 속성을 가진 요소를 찾고,
//                            이를 나타내는 Element 객체를 반환

export default ModalContainer;