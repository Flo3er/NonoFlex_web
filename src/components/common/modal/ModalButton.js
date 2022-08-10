import React from 'react';
import { useState } from 'react';
import './Modal.css';
import NoticeModal from './NoticeModal';

const ModalButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onClickButton = () => {
        setIsOpen(true);
    };

    return (
        <div className='buttonWrap'>
            <button type='button' className='blue btnadd' onClick={onClickButton}>
                {isOpen && ( 
                    <NoticeModal
                        onClose={() => {
                            setIsOpen(false);
                    }}
                />)}
            </button>
        </div>
    );
};

export default ModalButton;