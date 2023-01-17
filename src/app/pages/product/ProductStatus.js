import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import ProductAPI from "../../../apis/product/Product.js";
import { removeSearchValue } from "../../../features/main/SearchSlice.js";
import { clearSelectedProduct, selectedProduct, updateProductItem, updateProductList, updateProductRecordList } from "../../../features/product/productSlice.js";
import Utils from "../../../features/utils/Utils.js";
import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"
import NonoToast from "../../components/common/toast/Toast.js";
import Sort from "../../../assets/images/sorting.png"
import EmptyImage from "../../../assets/images/emptyImage.png"
import ArrowBackward from "../../../assets/images/arrowBackward.png"
import ArrowForward from "../../../assets/images/arrowForward.png"
import "./ProductStatus.css"
import Delete from "../../../assets/images/delete.png"

const ProductStatus = () => {
    const [isLoading, updateLoading] = useState(false);
    const dispatch = useDispatch();
    const productMetaData = useSelector((state) => state.product.metaData);
    const productList = useSelector((state) => state.product.itemList);
    const searchData = useSelector((state) => state.search.value);

    const productActiveTypeList = [
        { value: "활성", code: true },
        { value: "비활성", code: false }
    ]

    const orderCategory = [
        { value: "물품 코드  ↓", type: "productCode", order: "asc" },
        { value: "물품 코드  ↑", type: "productCode", order: "desc" },
        { value: "물품 이름  ↓", type: "name", order: "asc" },
        { value: "물품 이름  ↑", type: "name", order: "desc" },
        { value: "재고  ↓", type: "stock", order: "asc" },
        { value: "재고  ↑", type: "stock", order: "desc" },
    ];
    const [selectedSort, setSelectedSort] = useState(orderCategory[0]);
    const [isHiddenSortDialog, updateHiddenSortDialog] = useState(true);


    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken")
        if (accessToken === "" || accessToken === null) {
            window.location.replace("/login");
        } else {
            const fetchData = async () => {
                if (await Utils.checkToken()) {
                    dispatch(removeSearchValue());
                    dispatch(clearSelectedProduct());
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
            await getProductList(searchData, null, selectedSort.type, selectedSort.order);
        }
        fetchData();
    }, [searchData, selectedSort]);

    async function getProductList(query, page, type, order ) {
        updateLoading(true);
        const response = await ProductAPI.getProductList(query, type, order, page)
        if (response.isSuccess) {
            dispatch(updateProductList(response.data))
        }
        updateLoading(false);
    }

    const onClickSortButton = (event) => {
        updateHiddenSortDialog(!isHiddenSortDialog);
        setSelectedSort(orderCategory[event.target.value]);
    }

    async function onChangeProductSaveTypeSelection(item) {
        console.log(item);
        var newItem = {
            active: !(item.active),
            barcode: item.barcode,
            category: item.category,
            description: item.description,
            image: item.image,
            inputPrice: item.inputPrice,
            maker: item.maker,
            margin: item.argin,
            name: item.name,
            outputPrice: item.outputPrice,
            productCode: item.productCode,
            productId: item.productId,
            stock: item.stock,
            storageType: item.storageType,
            unit: item.unit
        }

        const response = await ProductAPI.updateProduct(
            newItem.productId,
            newItem.productCode,
            newItem.name,
            newItem.description,
            newItem.category,
            newItem.maker,
            newItem.unit,
            newItem.storageType,
            newItem.stock,
            newItem.price,
            newItem.active,
            newItem.barcode,
            newItem.image.fileId
        );

        if (response.isSuccess) {
            dispatch(updateProductItem(newItem));
        }
    }

    const onClickDeleteItem = (item) => {
        console.log(item);
    }

    const onScrollProductStatusList = (event) => {
        const scrollY = event.target.scrollTop;
        console.log(event.target.scrollTop);

        if (scrollY >= 600 * productMetaData.page) {
            if (!productMetaData.lastPage && !isLoading) {
                getProductList(searchData, (productMetaData.page + 1), selectedSort.type, selectedSort.order);
            }
        }
    }

    return (
        <div>
            <ToastContainer />
            <div className="page">
                <Sidebar value="/product/status" />
                <div className="contentsPage">
                    <Header title="활성 물품 관리"
                        desc="물품의 활성 상태를 관리할 수 있습니다."
                        isSearch={true} />
                    <div className="pageBody">
                        <div className="productListPage">
                            <div className="productStatusListSection">
                                <div className="productTopButtonSection">
                                    <div className="emptySection" />
                                    {/* <img src={Sort} alt="sort"
                                        className="productSortButton"
                                        id="productSortSetting"
                                        aria-expanded="true"
                                        aria-haspopup="true"
                                        aira-controls="popupSortList"
                                        onClick={onClickSortButton} /> */}
                                    <div className="productSortButtonBox">
                                        <select className="productSortButton"
                                            onChange={onClickSortButton}>
                                            {
                                                orderCategory.map((item, index) => {
                                                    return (
                                                        <option key={"productSortCategory" + index} value={index}>{item.value}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="productListTitle">
                                    <span className="productListItemPictureTitle">사진</span>
                                    <span className="productListItemNameTitle">물품 이름</span>
                                    <div className="emptySection" />
                                    <span className="productListItemCountTitle">상태</span>
                                </div>
                                <div className="productStatusList" onScroll={onScrollProductStatusList}>
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
                                                                className={item.active ? "prouctStatusListItem" : "inactiveProductStatusListItem"} >
                                                                <img src={item.imageId ?? EmptyImage} className="productListItemImage" />
                                                                <span className="productListItemName">{item.name}</span>
                                                                <div className="emptySection" />
                                                                <div className="deleteButtonBox">
                                                                    <img src={Delete} onClick={() => onClickDeleteItem(item)} />
                                                                </div>
                                                                <div className="productStatusSelectBox">
                                                                    <select className="productStatusSelect"
                                                                        value={item.active ?? true}
                                                                        onChange={() => onChangeProductSaveTypeSelection(item)}>
                                                                        {
                                                                            productActiveTypeList.map((item, index) => {
                                                                                return (
                                                                                    <option key={"productActiveType" + index} value={item.code}>{item.value}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                    }
                                </div>
                            </div>
                            <div className="productStatusEmptySection">
                                <div className="productTopButtonSection">
                                    <div className="emptySection" />
                                </div>
                                <div className="emptyProductContentsSection" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ProductStatus;