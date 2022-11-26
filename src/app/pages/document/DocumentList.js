import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"

const DocumentList = () => {
    return (
        <div>
            <Header title="문서 목록"
                desc="입고/출고 문서의 목록입니다." />
            <div>
                <Sidebar value="/document/list" />
            </div>
        </div>
    );
}

export default DocumentList;