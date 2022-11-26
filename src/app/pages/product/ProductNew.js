import { ToastContainer } from "react-toastify";
import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"

const ProductNew = () => {
    return (
        <div>
            <ToastContainer />
            <div className="page">
            <Sidebar value="/product/new" />
                <div className="contentsPage">
                <Header title="새 물품 추가"
                desc="물품을 추가합니다." />
                    <div className="pageBody">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductNew;