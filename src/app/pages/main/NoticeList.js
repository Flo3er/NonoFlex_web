import "./NoticeList.css"
import { ToastContainer } from "react-toastify";
import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"

const NoticeList = () => {
    return (
        <div>
            <ToastContainer />
            <div className="page">
                <Sidebar value="/notice/list" />
                <div className="contentsPage">
                    <Header title="공지사항 목록"
                        desc="공지사항을 관리할 수 있어요!" />
                    <div className="pageBody">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoticeList;