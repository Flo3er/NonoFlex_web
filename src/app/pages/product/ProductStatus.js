import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"

const ProductStatus = () => {
    return (
        <div>
            <Header title="활성 물품 관리"
                desc="물품의 활성 상태를 관리할 수 있습니다.." />
            <div>
                <Sidebar value="/product/status" />
            </div>
        </div>
    );
}

export default ProductStatus;