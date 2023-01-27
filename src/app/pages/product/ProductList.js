import "./ProductList.css"
import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"
import AddBlue from "../../../assets/images/addBlue.png"
import Sort from "../../../assets/images/sorting.png"
import EditBlue from "../../../assets/images/edit.png"
import EmptyImage from "../../../assets/images/emptyImage.png"
import ArrowBackward from "../../../assets/images/arrowBackward.png"
import ArrowForward from "../../../assets/images/arrowForward.png"
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux"
import Utils from "../../../features/utils/Utils.js"
import NonoToast from "../../components/common/toast/Toast.js"
import { useEffect, useState } from "react"
import { removeSearchValue } from "../../../features/main/SearchSlice.js"
import ProductAPI from "../../../apis/product/Product"
import { clearSelectedProduct, selectedProduct, updateProductList, updateProductRecordList } from "../../../features/product/productSlice"
import PopupBox from "../../components/common/modal/PopupBox"
import { useNavigate } from "react-router-dom"
import { changePassword } from "../../../features/login/LoginSlice"
import ChangePasswordModal from "../../components/login/ChangePasswordModal"
import Modal from "../../components/common/modal/Modal"

const ProductList = () => {
    const [isLoading, updateLoading] = useState(false);
    const [selectedRecordMonth, setSelectedRecordMonth] = useState(new Date().getMonth() + 1);
    const [selectedRecordYear, setSelectedRecordYear] = useState(new Date().getFullYear());

    const searchYearArray = () => {
        const currentYear = new Date().getFullYear();
        const result = [];
        for (let year = 2021; year < (currentYear + 1); year++) {
            result.push(<option key={"yearSelection" + year} value={year}>{year + "년"}</option>);
        }
        return result;
    };

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

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchData = useSelector((state) => state.search.value);
    const productList = useSelector((state) => state.product.itemList);
    const selectedProductItem = useSelector((state) => state.product.selectedItem);
    const recordList = useSelector((state) => state.product.selectedItemRecordList.recordList);
    const productMetaData = useSelector((state) => state.product.metaData);
    const changePasswordModalFlag = useSelector((state) => state.login.changePasswordModalFlag);

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

    useEffect(() => {
        const fetchData = async () => {
            if (selectedProductItem.productId !== undefined && selectedProductItem.productId !== null) {
                await getRecordList(selectedRecordYear, selectedRecordMonth);
            }
        }
        fetchData();
    }, [selectedProductItem]);

    async function getProductList(query, page, type, order) {
        updateLoading(true);
        const response = await ProductAPI.getProductList(query, type, order, page)
        if (response.isSuccess) {
            dispatch(updateProductList(response.data))
        }
        updateLoading(false);
    }

    async function getRecordList(year, month) {
        updateLoading(true);
        const response = await ProductAPI.getRecordList(selectedProductItem.productId, year, month);
        if (response.isSuccess) {
            dispatch(updateProductRecordList(response.data));
        }
        updateLoading(false);
    }

    const onClickProductAddButton = () => {
        navigate("/product/new");
    }

    const onClickProductEditButton = () => {
        console.log(selectedProductItem);
        navigate("/product/edit");
    }

    const onClickSortButton = (event) => {
        updateHiddenSortDialog(!isHiddenSortDialog);
        setSelectedSort(orderCategory[event.target.value]);
    }

    const onClickProductItem = (product) => {
        setSelectedRecordMonth(new Date().getMonth() + 1);
        // sessionStorage.setItem("selectedProductId", product.productId);
        dispatch(selectedProduct(product));
    }

    const onClickRecordBackwardButton = () => {
        const backwardMonth = selectedRecordMonth - 1;
        if (backwardMonth < 1) {
            return
        }
        getRecordList(selectedRecordYear, backwardMonth);
        setSelectedRecordMonth(backwardMonth);
    }

    const onClickRecordForwardButton = () => {
        const forwardMonth = selectedRecordMonth + 1;
        if (forwardMonth > 12) {
            return
        }
        getRecordList(selectedRecordYear, forwardMonth);
        setSelectedRecordMonth(forwardMonth);
    }

    const onScrollProductList = (event) => {
        const scrollY = event.target.scrollTop;
        console.log(event.target.scrollTop);

        if (scrollY >= 600 * productMetaData.page) {
            if (!productMetaData.lastPage && !isLoading) {
                getProductList(searchData, (productMetaData.page + 1), selectedSort.type, selectedSort.order);
            }
        }
    }

    const onChangeRecordYearSelection = (event) => {
        console.log(event.target.value);
        getRecordList(event.target.value, selectedRecordMonth);
        setSelectedRecordYear(event.target.value);
    }

    const onCloseChangePasswordModal = () => {
        dispatch(changePassword(false));
    }

    return (
        <div>
            <ToastContainer />
            <Modal isOpen={changePasswordModalFlag} onClose={onCloseChangePasswordModal}>
                <ChangePasswordModal
                 onClickClose={onCloseChangePasswordModal} />
            </Modal>
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
                                    <span className="productListItemCountTitle">재고</span>
                                </div>
                                <div className="productItemListSection">
                                    {
                                        (productList.length === 0 && searchData !== "") ?
                                            <div className="emptyProductListSection">
                                                <p>검색 결과가 존재하지 않습니다.</p>
                                            </div>
                                            :
                                            <ul onScroll={onScrollProductList}>
                                                {
                                                    productList.map((item, index) => {
                                                        return (
                                                            <li key={"productList" + item.productId + index}
                                                                className={item.productId === selectedProductItem.productId ?
                                                                    "selectedProductListItem" :
                                                                    item.active ? "prouctListItem" : "inactiveProductListItem"}
                                                                onClick={() => onClickProductItem(item)}
                                                            >
                                                                <img src={item.image == null ? EmptyImage : item.image.thumbnailUrl} className="productListItemImage" />
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

                                {
                                    selectedProductItem.productId === undefined ?
                                        <div className="emptyProductContentsSection">
                                            <p>물품을 선택해 주세요.</p>
                                        </div>
                                        :
                                        <div className="productContentSection">
                                            <div className="productContentInfoSection">
                                                <div className="productContentsummary">
                                                    <span className="productContentName">{selectedProductItem.name}</span>
                                                    <span className="productContentCount">{selectedProductItem.stock} {selectedProductItem.unit}</span>
                                                    <img src={selectedProductItem.image == null ? EmptyImage : selectedProductItem.image.thumbnailUrl} className="productContentItemImage" />
                                                </div>
                                                <div className="productContentDetailInfo">
                                                    <div className="productContentDetailTitle">
                                                        <span>상세정보</span>
                                                        <div className="emptySection" />
                                                        <img src={EditBlue} alt="edit"
                                                            onClick={onClickProductEditButton} />
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
                                                <div className="productContentRecordTitle">
                                                    <span>상세정보</span>
                                                    <div className="emptySection" />
                                                    <div className="recordYearSelectBox">
                                                        <select className="recordYearSelect"
                                                            value={selectedRecordYear}
                                                            onChange={onChangeRecordYearSelection}>
                                                            {
                                                                searchYearArray()
                                                            }
                                                        </select>
                                                    </div>
                                                    <img src={ArrowBackward} alt="backward"
                                                        onClick={onClickRecordBackwardButton} />
                                                    <span className="productRecordCurrentMonth"> {selectedRecordMonth}월</span>
                                                    <img src={ArrowForward} alt="forward"
                                                        onClick={onClickRecordForwardButton} />
                                                </div>
                                                <div className="productListTitle">
                                                    <span className="productRecordListDateTitle">날짜</span>
                                                    <div className="emptySection" />
                                                    <span className="productRecordListWriterTitle">작성자</span>
                                                    <span className="productRecordListQuantityTitle">변화량</span>
                                                    <span className="productRecordListStockTitle">재고</span>
                                                </div>
                                                <div className="productRecordList">
                                                    {
                                                        (recordList === undefined || recordList.length === 0) ?
                                                            <div className="emptyProductListSection">
                                                                <p>내역이 존재하지 않습니다.</p>
                                                            </div>
                                                            :
                                                            <ul>
                                                                {
                                                                    recordList.map((item, index) => {
                                                                        return (
                                                                            <li key={"recordList" + item.recordId + index}>
                                                                                <div className="productRecordListItemBox">
                                                                                    <span className="recordItemDate">{item.date}</span>
                                                                                    <div className="emptySection" />
                                                                                    <span className="recordItemWriter">{item.writer}</span>
                                                                                    <span className={item.type === "OUTPUT" ? "recordItemQuantityOutput" : "recordItemQuantityInput"} >
                                                                                        {item.type === "OUTPUT" ? "-" : "+"}{item.quantity}
                                                                                    </span>
                                                                                    <span className="recordItemStock">{item.stock} {selectedProductItem.unit}</span>

                                                                                </div>
                                                                            </li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        // </div>
    );
}

export default ProductList;