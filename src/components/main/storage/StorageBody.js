import React from 'react';

import LocalStorage from './LocalStorage';
import './Storage.css';

const StorageBody = () => {
    return (
        <div className='storageSection'>
            <LocalStorage />
        </div>
    );
};

export default StorageBody;