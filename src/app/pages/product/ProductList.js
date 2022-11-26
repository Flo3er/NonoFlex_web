import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"
import { ToastContainer } from "react-toastify";

const ProductList = () => {
    return (
        <div>
            <ToastContainer />
            <div className="page">
                <Sidebar value="/product/list" />
                <div className="contentsPage">
                    <Header title="물품 목록"
                        desc="물품 관리는 중요합니다!" />
                    <div className="pageBody">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;