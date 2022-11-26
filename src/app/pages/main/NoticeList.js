import "./NoticeList.css"

import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"

const NoticeList = () => {
    return (
        <div>
            <Header title="공지사항 목록"
                desc="공지사항을 관리할 수 있어요!" />
            <div>
                <Sidebar value="/notice/list" />
            </div>
        </div>
    );
}

export default NoticeList;