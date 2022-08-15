import React from 'react';

import Header from '../../components/common/header/Header';
import Sidebar from '../../components/common/sidebar/Sidebar';
import SampleBody from '../../components/main/sample/SampleBody';

const SamplePage = () => {
    return (
        <div>
            <Header />
                <div className='container'>
                    <Sidebar />
                    <SampleBody />
                </div>
        </div>
    )
}


export default SamplePage;