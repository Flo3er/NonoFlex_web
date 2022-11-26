import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"

const DocumentConfirm = () => {
    return (
        <div>
            <Header title="확인서 작성"
                desc="입고/출고 확인 문서 입니다." />
            <div>
                <Sidebar value="/document/confirm" />
            </div>
        </div>
    );
}

export default DocumentConfirm;