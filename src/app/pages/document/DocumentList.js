import "./DocumentList.css"
import { ToastContainer } from "react-toastify";

import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"

import Sort from "../../../assets/images/sorting.png"
import AddBlue from "../../../assets/images/addBlue.png"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { clearSelectedDocument, selectedDocument, updateDocumentList } from "../../../features/document/DocumentSlice";
import NonoToast from "../../components/common/toast/Toast";
import Utils from "../../../features/utils/Utils";
import { removeSearchValue } from "../../../features/main/SearchSlice";

import DocumentAPI from "../../../apis/document/Document.js"
import Modal from "../../components/common/modal/Modal";
import ChangePasswordModal from "../../components/login/ChangePasswordModal";
import { changePassword } from "../../../features/login/LoginSlice";


const DocumentList = () => {
    const [isLoading, updateLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchData = useSelector((state) => state.search.value);
    const documentList = useSelector((state) => state.document.itemList);
    const selectedDocumentItem = useSelector((state) => state.document.selectedItem);
    const changePasswordModalFlag = useSelector((state) => state.login.changePasswordModalFlag);

    const orderCategory = [
        { value: "생성 일자  ↑", type: "createdAt", order: "desc" },
        { value: "생성 일자  ↓", type: "createdAt", order: "asc" },
    ];

    const [selectedSort, setSelectedSort] = useState(orderCategory[0]);

    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken")
        if (accessToken === "" || accessToken === null) {
            window.location.replace("/login");
        } else {
            const fetchData = async () => {
                if (await Utils.checkToken()) {
                    dispatch(removeSearchValue());
                    dispatch(clearSelectedDocument());
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
            await getDocumentList(searchData, null, selectedSort.type, selectedSort.order);
        }
        fetchData();
    }, [searchData, selectedSort]);

    async function getDocumentList(query, page, type, order) {
        updateLoading(true);
        const response = await DocumentAPI.getDocumentList(query, type, order, page)
        if (response.isSuccess) {
            dispatch(updateDocumentList(response.data))
        } else {
            NonoToast.error("데이터를 가져오는데 실패했습니다.");
        }
        updateLoading(false);
    }

    const onClickSortButton = (event) => {
        setSelectedSort(orderCategory[event.target.value]);
    }

    const onClickProductAddButton = () => {
        navigate("/document/ready")
    }

    const onClickDocumentItem = (item) => {
        const fetchData = async () => {
            if (item.documentId !== undefined) {
                const response = await DocumentAPI.getDocument(item.documentId);
                if (response.isSuccess) {
                    dispatch(selectedDocument(response.data));
                } else {
                    NonoToast.error("문서 상세 정보를 가져오는데 실패했습니다.");
                }
            }
        }

        fetchData();
        console.log(item)
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
                <Sidebar value="/document/list" />
                <div className="contentsPage">
                    <Header title="문서 목록"
                        desc="입고/출고 문서의 목록입니다."
                        isSearch={false} />
                    <div className="pageBody">
                        <div className="documentListPage">
                            <div className="documentListSection">
                                <div className="documentTopButtonSection">
                                    <div className="emptySection" />
                                    {/* <img src={Sort} alt="sort"
                                        className="documentListSortButton"
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
                                                        <option key={"documentSortCategory" + index} value={index}>{item.value}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="documentListTitle">
                                    <span className="documentListInfoTitle">거래 정보</span>
                                    <div className="emptySection" />
                                    <span className="documentListTypeTitle">문서 종류</span>
                                </div>
                                <div className="documentList">
                                    {
                                        (documentList.length === 0 && searchData !== "") ?
                                            <div className="emptyDocumentList">
                                                <p>검색 결과가 존재하지 않습니다.</p>
                                            </div>
                                            :
                                            <ul>
                                                {
                                                    documentList.map((item, index) => {
                                                        const createDate = new Date(item.createdAt)
                                                        return (
                                                            <li key={"documentList" + item.documentId + index}
                                                                onClick={() => onClickDocumentItem(item)}
                                                                className={item.documentId === selectedDocumentItem.documentId ?
                                                                    "selectedDocumentListItem" :
                                                                    (item.active ?? true) ? "documentListItem" : "inactiveDocumentListItem"}
                                                            >
                                                                <div className="documentListItemFrontInfo">
                                                                    <span className="documentListCompanyName">{item.companyName ?? "삭제된 거래처"}</span>
                                                                    <span className="documentListDate">{createDate.toDateString()}</span>
                                                                </div>

                                                                <div className="emptySection" />
                                                                <div className={(item.type === "INPUT") ? "documentItemIntputInfo" : "documentItemOutputInfo"}>
                                                                    <span>{(item.type === "INPUT") ? "입고서" : "출고서"}</span>
                                                                    <span>{item.recordCount} 개 품목</span>
                                                                </div>

                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                    }
                                </div>
                            </div>

                            <div className="documentContentsSection">
                                <div className="documentTopButtonSection">
                                    <div className="emptySection" />
                                    <img src={AddBlue} alt="add"
                                        className="productAddButton"
                                        onClick={onClickProductAddButton} />
                                </div>
                                {
                                    selectedDocumentItem.documentId === undefined ?
                                        <div className="emptyDocumentContentsSelection">
                                            <p>문서를 선택해 주세요.</p>
                                        </div>
                                        :
                                        <div className="documentContentDetailSection">
                                            <div className="documentContentInfoSection">
                                                <div className="documentContentSummerySection">
                                                    <span className="documentContentDetailTitle">{(selectedDocumentItem.type === "INPUT") ? "입고서" : "출고서"}</span>
                                                </div>
                                                <div className="documentContentSummerySection">
                                                    <span className="documentCOntentSummeryTitle">문서 정보</span>
                                                    <div className="documentContentSummeryInfo">
                                                        <div className="documentDetailRowBox">
                                                            <div className="documentDetailRowTitleBox">
                                                                <span>문서코드</span>
                                                            </div>
                                                            <span>{selectedDocumentItem.documentId}</span>
                                                        </div>
                                                        <div className="documentDetailRowBox">
                                                            <div className="documentDetailRowTitleBox">
                                                                <span>거래처</span>
                                                            </div>
                                                            <span>{selectedDocumentItem.companyName}</span>
                                                        </div>
                                                        <div className="documentDetailRowBox">
                                                            <div className="documentDetailRowTitleBox">
                                                                <span>작성자</span>
                                                            </div>
                                                            <span>{selectedDocumentItem.writer}</span>
                                                        </div>
                                                        <div className="documentDetailRowBox">
                                                            <div className="documentDetailRowTitleBox">
                                                                <span>작성일자</span>
                                                            </div>
                                                            <span>{(new Date(selectedDocumentItem.createdAt)).toDateString()}</span>
                                                        </div>
                                                        <div className="documentDetailRowBox">
                                                            <div className="documentDetailRowTitleBox">
                                                                <span>금액</span>
                                                            </div>
                                                            <span>{selectedDocumentItem.totalPrice}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="documentContentProductSection">
                                                <div>
                                                    <span>입고 품목</span>
                                                </div>
                                                <div className="documentListTitle">
                                                    <span className="documentRecordListInfoTitle">물품 정보</span>
                                                    <div className="emptySection" />
                                                    <span className="documentRecordListPriceTitle">금액</span>
                                                    <span className="documentRecordListStockTitle">재고</span>
                                                </div>
                                                <div className="documentRecordList">
                                                    {
                                                        (selectedDocumentItem.recordList === undefined || selectedDocumentItem.recordList.length === 0) ?
                                                            <div className="emptyDocumentListSection">
                                                                <p>내역이 존재하지 않습니다.</p>
                                                            </div>
                                                            :
                                                            <ul>
                                                                {
                                                                    selectedDocumentItem.recordList.map((item, index) => {
                                                                        return (
                                                                            <li key={"documentRecordList" + item.documentId + index}>
                                                                                <span className="recordProductName">{item.product.name}</span>
                                                                                <div className="emptySection" />
                                                                                <div className="recordPriceBox">
                                                                                    <span className="documentRecordTotalPriceLabel">{item.price * item.quantity}</span>
                                                                                    <span className="documentRecordPriceLabel">{item.price}</span>
                                                                                </div>
                                                                                <div className="recordStockBox">
                                                                                    <span className={selectedDocumentItem.type === "INPUT" ? "documentRecordInputStock" : "documentRecordOutputStock"} >{selectedDocumentItem.type === "INPUT" ? "+" : "-"}{item.quantity}</span>
                                                                                    <span className="documentRecordStock">{item.stock}</span>
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
        </div>
    );
}

export default DocumentList;