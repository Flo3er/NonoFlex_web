import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { save } from '../modules/boardSlice';
 
function BoardNew() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const dispatch = useDispatch();
    const history = useHistory();
 
    const onSave = () => {
        const inputData = {
            id: '',
            title: title,
            content: content
        }
        
        dispatch(save(inputData))
        setTitle('')
        setContent('')
        history.push('/')
        // dispatch(uriSave('/'))
    }

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }
    const handleContent = (event) => {
        setContent(event.target.value)
    }
 
    return(
        <div>
            <h2>글 작성</h2>
            <div>
                <div>
                    <input type='text' className='inputTitle' placeholder='제목을 입력하세요' onChange={handleTitle} value={title} />
                </div>
                <div>
                    <textarea className='inputContent' placeholder='내용을 입력하세요' onChange={handleContent} value={content} />
                </div>
                <div>
                    <button type='button' onClick={onSave}>submit</button>
                </div>
            </div>
        </div>
    )
}
 
export default BoardNew;