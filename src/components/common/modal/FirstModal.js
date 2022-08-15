import React from 'react';

import Modal from './Modal';
// import styled from 'styled-components';
import './Modal.css';
import {AiOutlineClose} from 'react-icons/ai';

const FirstModal = ({ onClose }) => {
  // return (
  //   <Modal onClose={onClose}>
  //     <h1>First Modal</h1>
  //     <button className="closeButton" onClick={onClose}>Close</button>
  //   </Modal>
    
  // );





    // const {close} = props;
    // const [checkedButtons, setCheckedButtons] = useState([]);
    // const [infoValue, setInfoValue] = useState('');

    // const [info, setInfo] = useState({
    //     title:'',
    //     content:''
    // });

    // const onTitleChange = (event) => {
    //     const {name, value} = event.target;
    //     setInfoValue({
    //         ...info,
    //         [name]:value
    //     })
    // };
    // const onContentChange = (event) => {
    //     const {name, value} = event.target;
    //     setInfoValue({
    //         ...info,
    //         [name]:value
    //     })
    // };
    // console.log(infoValue);

    // const changeHandler = (checked, id) => {
    //     if (checked) {
    //     setCheckedButtons([...checkedButtons, id]);
    //     console.log(`체크 반영 완료`);
    //     } else {
    //     setCheckedButtons(checkedButtons.filter(button => button !== id));
    //     console.log(`체크 해제 반영 완료`);
    //     }
    // };

    return ( 
        <Modal onClose={onClose}>
            <div className='modal'>
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

// const Button = styled.button`
//   font-size: 14px;
//   padding: 10px 20px;
//   border: none;
//   background-color: #ababab;
//   border-radius: 10px;
//   color: white;
//   font-style: italic;
//   font-weight: 200;
//   cursor: pointer;
//   &:hover {
//     background-color: #898989;
//   }
// `;

export default FirstModal;