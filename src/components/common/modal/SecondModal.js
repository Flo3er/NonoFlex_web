import React from 'react';

import Modal from './Modal';
// import styled from 'styled-components';
import './Modal.css';
import {AiOutlineClose} from 'react-icons/ai';

const SecondModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      {/* <h1>Second Modal</h1>
      <button className="closeButton" onClick={onClose}>Close</button> */}
      <div>
      <section>
                    <form onSubmit>
                        <header>
                            <input 
                                type='text'
                                placeholder='제목을 입력하세요' 
                                name="title"
                                // onChange={onTitleChange} 
                            />
                            <button className="close" >
                                <AiOutlineClose />
                            </button>
                        </header>
                        <main>
                            <textarea 
                                placeholder='내용을 입력하세요 ' 
                                className='bR8' 
                                // onChange={onContentChange}
                                // value={ContentValue} 
                                name="content"
                            />
                        </main>
                        <footer>
                            <div className='checking'>
                                <input type="checkbox" id="check" 
                                     /> 
                                    {/* 보통 체크박스를 스타일링할 때는 기존의 checkbox input을 display:none으로 없앤 후
                                    디자인하기 때문에 label을 사용한다고 함 - 스타일 수정 시 살려서 쓰기 */}
                                <label id="check" htmlFor='check'></label>
                                <p className='mL10 fs14'>주요 공지사항</p>
                            </div>
                            <button 
                                className="close bR8" 
                                // onClick={onClose}
                            >
                            저장하기
                            </button>
                        </footer>
      </form>
      </section>
      </div>
    </Modal>
  );
}


export default SecondModal;
