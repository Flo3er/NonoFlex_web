import { ToastContainer } from "react-toastify";
import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"

const DocumentList = () => {
    return (
        <div>
            <ToastContainer />
            <div className="page">
                <Sidebar value="/document/list" />
                <div className="contentsPage">
                    <Header title="문서 목록"
                        desc="입고/출고 문서의 목록입니다." />
                    <div className="pageBody">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocumentList;