import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {AiOutlineClose} from 'react-icons/ai';

import { save } from '../../../features/notice/NoticeSlice';
import Modal from '../../common/modal/Modal';
import './Notice.css';

const NoticeModal = (onClose) => {

    const [checkedButtons, setCheckedButtons] = useState([]);
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const dispatch = useDispatch();

    const onSave = () => {
        const inputData = {
            id: '',
            title: title,
            content: content
        }
        dispatch(save(inputData))
        setTitle('')
        setContent('')
    }

    const onTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const onContentChange = (event) => {
        setContent(event.target.value);
    };

    const changeHandler = (checked, id) => {
        if (checked) {
        setCheckedButtons([...checkedButtons, id]);
        console.log(`체크 반영 완료`);
        } else {
        setCheckedButtons(checkedButtons.filter(button => button !== id));
        console.log(`체크 해제 반영 완료`);
        }
    };

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
                            // value={TitleValue} 
                            onChange={onTitleChange} 
                        />
                        <button className="close" onClick={onClose}>
                            <AiOutlineClose />
                        </button>
                    </header>
                    <main>
                        {/* <input type='text' placeholder='내용을 입력하세요' className='bR8' /> */}
                        <textarea 
                            placeholder='내용을 입력하세요 ' 
                            className='bR8' 
                            onChange={onContentChange}
                            // value={ContentValue} 
                            name="content"
                        />
                    </main>
                    <footer>
                        <div className='checking'>
                            <input type="checkbox" id="check" 
                                onChange={e => {
                                    changeHandler(e.currentTarget.checked, 'check');
                                }}
                                checked={checkedButtons.includes('check') ? true : false} /> 
                            {/* 보통 체크박스를 스타일링할 때는 기존의 checkbox input을 display:none으로 없앤 후
                            디자인하기 때문에 label을 사용한다고 함 - 스타일 수정 시 살려서 쓰기 */}
                            <label id="check" htmlFor='check'></label>
                            <p className='mL10 fs14'>주요 공지사항</p>
                        </div>
                        <button 
                            className="close bR8" 
                            onClick={onSave}
                        >
                            저장하기
                        </button>
                    </footer>
                </form>
            </section>
        </div>
        </Modal>
    );
};

export default NoticeModal;