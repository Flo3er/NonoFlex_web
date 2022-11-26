import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"

const ProductList = () => {
    return (
        <div>
            <Header title="물품 목록"
                desc="물품 관리는 중요합니다!" />
            <div>
                <Sidebar value="/product/list" />
            </div>
        </div>
    );
}

export default ProductList;