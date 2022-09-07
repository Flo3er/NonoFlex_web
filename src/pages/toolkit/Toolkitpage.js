import React from 'react';

import Header from '../../components/common/header/Header';
import Sidebar from '../../components/common/sidebar/Sidebar';
import ToolkitBody from '../../components/main/toolkit/ToolkitBody';

const ToolkitPage = () => {
    return (
        <div>
            <Header />
            <div className = "container">
                <Sidebar />
                <ToolkitBody />
            </div>
        </div>
    )
}

export default ToolkitPage;
