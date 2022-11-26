import { ToastContainer } from "react-toastify";
import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"

const DocumentReady = () => {

    return (
        <div>
            <ToastContainer />
            <div className="page">
                <Sidebar value="/document/ready" />
                <div className="contentsPage">
                    <Header title="예정서 작성"
                        desc="입고/출고 예정 문서 입니다. 해당 문서는 실제 재고에 영향을 주지 않습니다." />
                    <div className="pageBody">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocumentReady;