import React from 'react';

import Header from '../../components/common/header/Header';
import Sidebar from '../../components/common/sidebar/Sidebar';
import StorageBody from '../../components/main/storage/StorageBody';


const StoragePage = () => {
    return (
        <div>
            <Header />
            <div className = "container">
                <Sidebar />
                <StorageBody />
            </div>
        </div>
    )
}

export default StoragePage;
