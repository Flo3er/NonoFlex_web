import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"

const ProductNew = () => {
    return (
        <div>
            <Header title="새 물품 추가"
                desc="물품을 추가합니다." />
            <div>
                <Sidebar value="/product/new" />
            </div>
        </div>
    );
}

export default ProductNew;