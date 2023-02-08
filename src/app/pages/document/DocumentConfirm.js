import { ToastContainer } from "react-toastify";
import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"

import AssentialPoint from "../../../assets/images/assentialPoint.png"
import Calendar from "../../../assets/images/calendar.png";
import EmptyImage from "../../../assets/images/emptyImage.png"
import Info from "../../../assets/images/info.png"
import Add from "../../../assets/images/addItem.png"
import Close from "../../../assets/images/close.png"


import { useEffect, useState } from "react";
import PrimaryButton from "../../components/common/button/PrimaryButton.js";
import SearchField from "../../components/main/header/SearchField.js";
import { useDispatch, useSelector } from "react-redux";
import Utils from "../../../features/utils/Utils.js";
import NonoToast from "../../components/common/toast/Toast.js";
import ProductAPI from "../../../apis/product/Product.js";
import { removeSearchValue } from "../../../features/main/SearchSlice.js";
import { updateProductList } from "../../../features/product/productSlice.js";
import DocumentList from "./DocumentList.js";
import { clearDocumentProduct, selectDocumentProduct } from "../../../features/document/DocumentProductSlice.js";
import Modal from "../../components/common/modal/Modal.js";
import DocumentProductModal from "../../components/document/DocumentProductModal.js";
import { clearSelectedPartner } from "../../../features/document/DocumentPartnerSlice.js";
import DocumentAPI from "../../../apis/document/Document.js";
import ChooseDocumentPartnerModal from "../../components/document/ChooseDocumentPartnerModal.js";
import { changePassword } from "../../../features/login/LoginSlice.js";
import ChangePasswordModal from "../../components/login/ChangePasswordModal.js";


const DocumentConfirm = () => {
    const [isSelectedDocumentInputType, updateDocumentType] = useState(true);
    const [documentDate, setDocumentDate] = useState(new Date());
    const [isOpenChooseDocumentPartner, updateOpenChooseDocumentPartner] = useState(false);
    const [documentProduct, setDocumentProduct] = useState([]);
    const [isOpenDocumentProductModal, updateDocumentProductModal] = useState(false);
    const [isLoading, updateLoading] = useState(false);

    const dispatch = useDispatch();
    const searchData = useSelector((state) => state.search.value);
    const productMetaData = useSelector((state) => state.product.metaData);
    const productList = useSelector((state) => {
        const filteredList = state.product.itemList.filter((item) => {
            const findData = documentProduct.find(element => element.productId === item.productId);
            return findData === undefined;
        });
        return filteredList;
    });
    const documentProductItem = useSelector((state) => state.documentProduct.documentProductItem);
    const documentPartner = useSelector((state) => state.documentPartner.selectedItem);
    const changePasswordModalFlag = useSelector((state) => state.login.changePasswordModalFlag);

    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken")
        if (accessToken === "" || accessToken === null) {
            window.location.replace("/login");
        } else {
            const fetchData = async () => {
                if (await Utils.checkToken()) {
                    dispatch(removeSearchValue());
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
            await getProductList(searchData, null);
        }
        fetchData();
    }, [searchData]);

    useEffect(() => {
        console.log(documentProductItem);
        console.log(documentProduct);
        if (documentProductItem.productId !== undefined) {
            var updateDocumentProductList = documentProduct.copyWithin();
            updateDocumentProductList.push(documentProductItem);
            setDocumentProduct(updateDocumentProductList);

            dispatch(clearDocumentProduct());
        }

    }, [documentProductItem])

    async function getProductList(query, page) {
        updateLoading(true);
        const response = await ProductAPI.getProductList(query, "productCode", "asc", page)
        if (response.isSuccess) {
            dispatch(updateProductList(response.data))
        }
        updateLoading(false);
    }

    const onClickDocumentInputButton = () => {
        if (isSelectedDocumentInputType == false) {
            dispatch(clearSelectedPartner());
        }
        updateDocumentType(true);
    }
    const onClickDocumentOutputButton = () => {
        if (isSelectedDocumentInputType == true) {
            dispatch(clearSelectedPartner());
        }

        updateDocumentType(false);
    }
    const onChangeDateInputData = (event) => {
        setDocumentDate(event.target.valueAsDate);
    }
    const onClickChooseDocumentPartner = () => {
        updateOpenChooseDocumentPartner(true);
    }
    const onCloseChooseDocumentPartner = () => {
        updateOpenChooseDocumentPartner(false);
    }
    const onCloseChangePasswordModal = () => {
        dispatch(changePassword(false));
    }

    const onClickSaveDocumentButton = async () => {
        if (documentPartner.companyId == undefined) {
            NonoToast.error("거래처 정보를 입력해 주세요.");
            return;
        }

        if (documentProduct.length == 0) {
            NonoToast.error("거래 물품을 선택해 주세요.");
            return;
        }

        const documentType = isSelectedDocumentInputType ? "INPUT" : "OUTPUT";
        const recordList = documentProduct.map((item) => {
            return {
                productId: item.productId,
                price: item.price,
                quantity: item.count
            }
        })
        console.log(recordList);
        const response = await DocumentAPI.createDocument(documentDate, documentType, documentPartner.companyId, recordList);
        const documentTypeText = isSelectedDocumentInputType ? "입고" : "출고"
        if (response.isSuccess) {
            NonoToast.success("작성된 " + documentTypeText + " 확인서가 저장되었습니다.");
            window.location.href = "/document/list"
            dispatch(clearSelectedPartner);
            dispatch(clearDocumentProduct);
        } else {
            NonoToast.error("작성된 " + documentTypeText + " 확인서 저장에 실패하였습니다.");
        }
    }

    const onScrollDocumentProductList = async (event) => {
        const scrollY = event.target.scrollTop;
        // console.log(70 * (productList.length - 8) + "||" + scrollY);

        if (scrollY >= (70 * (productList.length - 8))) {
            // console.log(productMetaData.lastPage)
            if (!productMetaData.lastPage && !isLoading) {
                await getProductList(searchData, (productMetaData.page + 1));
            }
        }
    }

    const onClickProductInfoButton = (item) => {
        console.log(item);
    }

    const onClickProductAddButton = (item) => {
        console.log(item);
        dispatch(selectDocumentProduct(item));
        updateDocumentProductModal(true);
    }

    const onClickRemoveDocumentProduct = (item) => {
        console.log(item)
        var updateDocumentProductList = documentProduct.copyWithin();
        updateDocumentProductList = updateDocumentProductList.filter(product => {
            console.log(product)
            console.log(item)
            console.log(product.productId === item.productId)
            return product.productId !== item.productId
        });
        setDocumentProduct(updateDocumentProductList);
    }

    const onCloseDocumentProductModal = () => {
        updateDocumentProductModal(false);
    }

    const getCurrentDate = () => {
        const month = new Date().getMonth() + 1;
        var strMonth = ""
        if (month < 10) {
            strMonth = "0"+month;
        } else {
            strMonth = month;
        }

        const date = new Date().getDate()
        var strDate = ""
        if (date < 10) {
            strDate = "0"+date
        } else {
            strDate = date
        }

         return new Date().getFullYear()+"-"+strMonth+"-"+strDate
    }

    const getMaxDate = () => {
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1 + 3;
        if(month > 12) {
            month = month - 12;
            year = year + 1;
        }

        var strMonth = ""
        if (month < 10) {
            strMonth = "0"+month;
        } else {
            strMonth = month;
        }

        const date = new Date().getDate()
        var strDate = ""
        if (date < 10) {
            strDate = "0"+date
        } else {
            strDate = date
        }
        return year+"-"+strMonth+"-"+strDate
    }

    return (
        <div>
            <ToastContainer />
            <Modal isOpen={isOpenDocumentProductModal} onClose={onCloseDocumentProductModal}>
                <DocumentProductModal onClickClose={onCloseDocumentProductModal} type={isSelectedDocumentInputType ? "INPUT" : "OUTPUT"} />
            </Modal>
            <Modal isOpen={isOpenChooseDocumentPartner} onClose={onCloseChooseDocumentPartner}>
                <ChooseDocumentPartnerModal onClickClose={onCloseChooseDocumentPartner} type={isSelectedDocumentInputType ? "input" : "output"} />
            </Modal>
            <Modal isOpen={changePasswordModalFlag} onClose={onCloseChangePasswordModal}>
                <ChangePasswordModal
                    onClickClose={onCloseChangePasswordModal} />
            </Modal>
            <div className="page">
                <Sidebar value="/document/confirm" />
                <div className="contentsPage">
                    <Header title="문서 작성"
                        desc=" 입고/출고 문서를 작성 해 보세요. 작성한 문서는 문서 목록에서 확인하실 수 있습니다." />
                    <div className="pageBody">
                        <div className="documentReadyPage">
                            <div className="documentReadyInfoSection">
                                <ul className="documentReadyForm">
                                    <li>
                                        <div className="documnetReadyInfoTitleBox">
                                            <img src={AssentialPoint} className="assentialPointImage" />
                                            <span>문서 종류</span>
                                        </div>
                                        <div className={isSelectedDocumentInputType ? "selectedDocumentTypeBox" : "documentTypeBox"}
                                            onClick={onClickDocumentInputButton}>
                                            <span>입고서</span>
                                        </div>
                                        <div className={isSelectedDocumentInputType ? "outputDocumentTypeBox" : "selectedOutputDocumentTypeBox"}
                                            onClick={onClickDocumentOutputButton}>
                                            <span>출고서</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="documnetReadyInfoTitleBox">
                                            <div className="assentialPointImage" />
                                            <span>거래 날짜</span>
                                        </div>
                                        <div className="documentDateInputBox">
                                            <span>{documentDate.toDateString()}</span>
                                            <div className="emptySpace" />
                                            <div className="documentDateInputButtonBox">
                                                <input type="date"
                                                    min={getCurrentDate()}
                                                    max={getMaxDate()}
                                                    className="documentDateInputButton"
                                                    onChange={onChangeDateInputData} />
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="documnetReadyInfoTitleBox">
                                            <img src={AssentialPoint} className="assentialPointImage" />
                                            <span>거래처</span>
                                        </div>
                                        <div className={documentPartner.companyId === undefined ? "documentPartnerInputEmptyBox" : "documentPartnerInputBox"} onClick={onClickChooseDocumentPartner}>
                                            <span>{documentPartner.companyId === undefined ? "거래처 정보를 입력해 주세요." : documentPartner.name}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="documnetReadyInfoTitleBox">
                                            <img src={AssentialPoint} className="assentialPointImage" />
                                            <span>거래 물품</span>
                                        </div>
                                        <div className="documentProductInputBox">
                                            {
                                                documentProduct.length === 0 ?
                                                    <div>
                                                        <p className="emptyDocumentProductPlaceHolder">선택된 물품이 없습니다.</p>
                                                        <p className="emptyDocumentProductPlaceHolder">우측 물품 목록에서 거래 물품을 추가 해 보세요.</p>
                                                    </div>
                                                    :
                                                    <ul>
                                                        {
                                                            documentProduct.map((item, index) => {
                                                                return (
                                                                    <li key={"documentProduct" + item.productId + index}
                                                                        className="settedDocumentProductList">
                                                                        <img src={Close} className="removeDocumentProduct" onClick={() => onClickRemoveDocumentProduct(item)} />
                                                                        <div className="documentProductItemSection">
                                                                            <span className="documentProductName">{item.productName}</span>
                                                                            <span className="documentProductCode">{item.productCode}</span>
                                                                        </div>
                                                                        <div className="emptySpace" />
                                                                        <div className="documentProductItemSection">
                                                                            <span className={isSelectedDocumentInputType ? "documentProductInputCount" : "documentProductOutputCount"}>{isSelectedDocumentInputType ? "+" : "-"}{item.count}</span>
                                                                            <span className="documentProductPrice">{item.price + "원"}</span>
                                                                        </div>

                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <div className="saveDocumentButtonBox">
                                            <div className="saveDocumentButton">
                                                <PrimaryButton value="저장하기" onClick={onClickSaveDocumentButton} />
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                            </div>

                            <div className="documentReadyDetailSection">
                                <div className="documentProductSearchBox">
                                    <SearchField />
                                </div>
                                <div className="documentProductListSection"  >
                                    {
                                        (DocumentList.length === 0 && searchData !== "") ?
                                            <div className="emptyProductListSection">
                                                <p>검색 결과가 존재하지 않습니다.</p>
                                            </div>
                                            :
                                            <ul onScroll={onScrollDocumentProductList}>
                                                {
                                                    productList.map((item, index) => {
                                                        return (
                                                            <li key={"productList" + item.productId + index} className="documentProductListItem" onClick={() => onClickProductAddButton(item)} >
                                                                {
                                                                    item.image == null ?
                                                                        <div className="productListItemEmptyImage" />
                                                                        :
                                                                        <img src={item.image.thumbnailUrl} className="documentProductListItemImage" />
                                                                }

                                                                <span className="documentProductListItemName">{item.name}</span>
                                                                <div className="emptySpace" />

                                                                {/* <img src={Info} className="documentProductListItemInfoButton" onClick={() => onClickProductInfoButton(item)} /> */}
                                                                <img src={Add} className="documentProductListItemAddButton" />
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocumentConfirm;