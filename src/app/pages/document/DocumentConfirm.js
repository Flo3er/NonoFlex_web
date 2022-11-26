import { ToastContainer } from "react-toastify";
import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"

const DocumentConfirm = () => {
    return (
        <div>
            <ToastContainer />
            <div className="page">
                <Sidebar value="/document/confirm" />
                <div className="contentsPage">
                    <Header title="확인서 작성"
                        desc="입고/출고 확인 문서 입니다." />
                    <div className="pageBody">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocumentConfirm;