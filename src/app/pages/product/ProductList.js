import "./ProductList.css"
import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"
import AddBlue from "../../../assets/images/addBlue.png"
import Sort from "../../../assets/images/sorting.png"
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux"
import Utils from "../../../features/utils/Utils.js"
import NonoToast from "../../components/common/toast/Toast.js"
import { useEffect, useState } from "react"
import { removeSearchValue } from "../../../features/main/SearchSlice.js"
import ProductAPI from "../../../apis/product/product"
import { selectedProduct, updateProductList } from "../../../features/product/productSlice"

const ProductList = () => {
    const [isLoading, updateLoading] = useState(false);

    const dispatch = useDispatch();
    const searchData = useSelector((state) => state.search.value);
    const productList = useSelector((state) => state.product.itemList);
    const selectedProductItem = useSelector((state) => state.product.selectedItem);

    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken")
        if (accessToken === "" || accessToken === null) {
            window.location.replace("/login");
        } else {
            const fetchData = async () => {
                if (await Utils.checkToken()) {
                    dispatch(removeSearchValue());
                    // await getNoticeList("");
                } else {
                    console.log("token expired");
                    NonoToast.error("로그인 유효기간이 만료되었습니다.");
                    await Utils.timeout(2000);
                    window.location.replace("/login");
                }
            }
            fetchData();
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await getProductList(searchData);
        }
        fetchData();
    }, [searchData]);

    async function getProductList(query, page) {
        updateLoading(true);
        const response = await ProductAPI.getProductList(query, "name", "desc", page)
        if (response.isSuccess) {
            dispatch(updateProductList(response.data))
        }
        updateLoading(false);
    }

    const onClickProductAddButton = () => {
        window.location.replace("/product/new")
    }

    const onClickSortButton = () => {
        console.log("clicked sort button");
    }

    const onClickProductItem = (product) => {
        dispatch(selectedProduct(product));
    }


    return (
        <div>
            <ToastContainer />
            <div className="page">
                <Sidebar value="/product/list" />
                <div className="contentsPage">
                    <Header title="물품 목록"
                        desc="물품 관리는 중요합니다!"
                        isSearch={true} />
                    <div className="pageBody">
                        <div className="productListPage">
                            <div className="productListSection">
                                <div className="productTopButtonSection">
                                    <div className="emptySection" />
                                    <img src={Sort} alt="sort"
                                        className="productSortButton"
                                        onClick={onClickSortButton} />
                                </div>

                                <div className="productListTitle">
                                    <span className="productListItemPictureTitle">사진</span>
                                    <span className="productListItemNameTitle">물품 이름</span>
                                    <div className="emptySection" />
                                    <span className="productListItemCountTitle">재고</span>
                                </div>
                                <div className="productListSection">
                                    {
                                        (productList.length === 0 && searchData !== "") ?
                                            <div className="emptyProductListSection">
                                                <p>검색 결과가 존재하지 않습니다.</p>
                                            </div>
                                            :
                                            <ul>
                                                {
                                                    productList.map((item, index) => {
                                                        return (
                                                            <li key={"productList" + item.productId + index}
                                                                className={item.productId === selectedProductItem.productId ?
                                                                    "selectedProductListItem" :
                                                                    item.active ? "prouctListItem" : "inactiveProductListItem"}
                                                                onClick={() => onClickProductItem(item)}
                                                            >
                                                                <img src="https://th-bucket-s3.s3.ap-northeast-2.amazonaws.com/74ea3bca-a03b-4fd1-a995-9939e801da41-th.png" className="productListItemImage" />
                                                                <span className="productListItemName">{item.name}</span>
                                                                <div className="emptySection" />
                                                                <span className="productListItemCount">{item.stock} {item.unit}</span>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                    }
                                </div>
                            </div>

                            <div className="productContentsSection">
                                <div className="productTopButtonSection">
                                    <div className="emptySection" />
                                    <img src={AddBlue} alt="add"
                                        className="productAddButton"
                                        onClick={onClickProductAddButton} />
                                </div>

                                <div className="productContentSection">
                                    <div className="productContentInfoSection">
                                        <div className="productContentsummary">
                                            <span className="productContentName">{selectedProductItem.name}</span>
                                            <span className="productContentCount">{selectedProductItem.stock} {selectedProductItem.unit}</span>
                                            <img src="https://th-bucket-s3.s3.ap-northeast-2.amazonaws.com/74ea3bca-a03b-4fd1-a995-9939e801da41-th.png" className="productContentItemImage" />
                                        </div>
                                        <div className="productContentDetailInfo">
                                            <div className="productContentDetailTitle">
                                                <span>상세정보</span>
                                                <div className="emptySection" />
                                                <img src={AddBlue} alt="add"
                                                    className="productEditButton"
                                                    onClick={onClickProductAddButton} />
                                            </div>
                                            <div className="productContentDetailContentsBox">
                                                <div className="productDetailRowBox">
                                                    <div className="productDetailRowTitleBox">
                                                    <span>제품명</span>
                                                    </div> 
                                                    <span>{selectedProductItem.name}</span>
                                                </div>
                                                <div className="productDetailRowBox">
                                                    <div className="productDetailRowTitleBox">
                                                    <span>제품코드</span>
                                                    </div> 
                                                    <span>{selectedProductItem.productCode}</span>
                                                </div>
                                                <div className="productDetailRowBox">
                                                    <div className="productDetailRowTitleBox">
                                                    <span>분류</span>
                                                    </div> 
                                                    <span>{selectedProductItem.category}</span>
                                                </div>
                                                <div className="productDetailRowBox">
                                                    <div className="productDetailRowTitleBox">
                                                    <span>보관방법</span>
                                                    </div> 
                                                    <span>{selectedProductItem.storageType}</span>
                                                </div>
                                                <div className="productDetailRowBox">
                                                    <div className="productDetailRowTitleBox">
                                                    <span>제조사</span>
                                                    </div> 
                                                    <span>{selectedProductItem.maker}</span>
                                                </div>
                                                <div className="productDetailRowBox">
                                                    <div className="productDetailRowTitleBox">
                                                    <span>규격</span>
                                                    </div> 
                                                    <span>{selectedProductItem.unit}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="productContentRecordSection">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;