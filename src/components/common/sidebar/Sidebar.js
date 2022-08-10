import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import {AiFillAliwangwang} from 'react-icons/ai';

const Sidebar = () => {

    return(
        <div className='sidebar'>
            <div className='head'>
                <h1><Link to="/">Logo</Link></h1>
                <h3>userinfo</h3>
                <div className='mainNav'>
                    <ul className='depth1'>
                        <li className='depthLi'><Link to="/" className='liA'><AiFillAliwangwang className='emo' /><p className='liP'>메뉴1</p></Link></li>
                        <li className='depthLi'><Link to="/" className='liA'><AiFillAliwangwang className='emo' /><p className='liP'>메뉴2</p></Link></li>
                        <li className='depthLi'><Link to="/notice" className='liA'><AiFillAliwangwang className='emo' /><p className='liP'>메뉴3</p></Link></li>
                        <li><Link to="/" className='liA'><AiFillAliwangwang className='emo' /><p className='liP'>메뉴4</p></Link></li>
                    </ul>
                </div>
                {/* <div className='subNav'>
                    <ul className='depth1'>
                        <li><Link to=""><AiOutlineCaretRight className='emo' /></Link></li>
                        <li><Link to=""><AiOutlineCaretRight className='emo' /></Link></li>
                        <li><Link to=""><AiOutlineCaretRight className='emo' /></Link></li>
                        <li><Link to=""><AiOutlineCaretRight className='emo' /></Link></li>
                    </ul>
                </div> */}
            </div>
        </div>
    );
};

export default Sidebar;