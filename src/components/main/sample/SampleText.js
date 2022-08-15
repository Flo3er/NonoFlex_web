import React from 'react';

import Toastify from '../../common/toast/Toastify';
import ModalButton from '../../common/modal/ModalButton'
import './SampleText.css';

const SampleText = () => {
    const toastText = 'sample text';

    // Toastify.js로 text값 전달
    return (
        <div className='listApi'>
            <Toastify text={toastText}/>
            <ModalButton />
        </div>
    );
};

export default SampleText;