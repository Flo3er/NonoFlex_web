import "./Company.css"

import { ToastContainer } from "react-toastify"
import Sort from "../../../../assets/images/sorting.png"
import AddBlue from "../../../../assets/images/addBlue.png"
import Delete from "../../../../assets/images/delete.png"
import Edit from "../../../../assets/images/edit.png"
import SideBar from "../../../components/common/sidebar/Sidebar"
import Header from "../../../components/common/header/Header"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearCompanyList, clearSelectedCompany, selectedCompany, updateCompanyItem, updateCompanyList } from "../../../../features/settings/companySlice"
import CompanyAPI from "../../../../apis/company/company"
import Utils from "../../../../features/utils/Utils"
import { removeSearchValue } from "../../../../features/main/SearchSlice"
import NonoToast from "../../../components/common/toast/Toast"
import Modal from "../../../components/common/modal/Modal"
import CompanyDeleteModal from "../../../components/common/modal/DeleteConfirmModal"
import CompanyNewModal from "../../../components/settings/company/CompanyNewModal"
import CompanyEditModal from "../../../components/settings/company/CompanyEditModal"
import DeleteConfirmModal from "../../../components/common/modal/DeleteConfirmModal"
import { changePassword } from "../../../../features/login/LoginSlice"
import ChangePasswordModal from "../../../components/login/ChangePasswordModal"


const Company = () => {
    const [isLoading, updateLoading] = useState(false);
    const [isOpenCompanyDeleteItem, updateOpenCompanyDeleteItem] = useState(false);
    const [isOpenCompanyNew, updateOpenCompanyNew] = useState(false);
    const [isOpenCpmpanyEdit, updateOpenCompanyEdit] = useState(false);
    const dispatch = useDispatch();
    const companyMetaData = useSelector((state) => state.company.metaData);
    const companyList = useSelector((state) => state.company.itemList);
    const searchData = useSelector((state) => state.search.value);
    const selectedCompanyItem = useSelector((state) => state.company.selectedItem);
    const changePasswordModalFlag = useSelector((state) => state.login.changePasswordModalFlag);

    const orderCategory = [
        { value: "거래처 이름  ↓", type: "name", order: "asc" },
        { value: "거래처 이름  ↑", type: "name", order: "desc" }
    ]; const [selectedSort, setSelectedSort] = useState(orderCategory[0]);

    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken")
        if (accessToken === "" || accessToken === null) {
            window.location.replace("/login");
        } else {
            const fetchData = async () => {
                if (await Utils.checkToken()) {
                    dispatch(removeSearchValue());
                    dispatch(clearSelectedCompany());
                    dispatch(clearCompanyList());
                    // await getNoticeList("");
                } else {
                    console.log("token expired");
                    NonoToast.error("로그인 유효기간이 만료되었습니다.");
                    await Utils.timeout(1500);
                    window.location.replace("/login");
                }
            }

            fetchData();
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await getCompanyList(searchData, 1, selectedSort.type, selectedSort.order);
        }
        fetchData();
    }, [searchData, selectedSort]);

    async function getCompanyList(query, page, type, order) {
        updateLoading(true);
        const response = await CompanyAPI.getCompanyList("all", query, type, order, page);
        if (response.isSuccess) {
            dispatch(updateCompanyList(response.data));
        }
        updateLoading(false);
    }

    const onClickSortButton = (event) => {
        setSelectedSort(orderCategory[event.target.value]);
    }

    const onClickAddButton = () => {
        updateOpenCompanyNew(true);
    }

    const onScrollCompanyList = async (event) => {
        const scrollY = event.target.scrollTop;

        if (scrollY >= (70 * (companyList.length - 8))) {
            if (!companyMetaData.lastPage && !isLoading) {
                await getCompanyList(searchData, (companyMetaData.page + 1));
            }
        }
    }

    const onClickDeleteItem = (item) => {
        dispatch(selectedCompany(item));
        updateOpenCompanyDeleteItem(true);

    }
    // const onChangeProductSaveTypeSelection = async (item) => {
    //     const response = await CompanyAPI.updateCompanyInfo(
    //         item.companyId,
    //         item.name,
    //         item.type,
    //         item.category,
    //         !item.active);
    //     if (response.isSuccess) {
    //         dispatch(updateCompanyItem(response.data))
    //     } else {
    //         NonoToast.error("거래처 정보 변경에 실패했습니다. 새로고침 후 다시 시도해 주세요.");
    //     }
    // }

    const onClickCompanyInfoEditButton = (item) => {
        dispatch(selectedCompany(item));
        updateOpenCompanyEdit(true);

    }
    const onCloseRemoveCompanyItemDialog = async () => {
        updateOpenCompanyDeleteItem(false);
        await refreshCompanyList();
    }

    const confirmRemoveCompanyItemDialog = async () => {
        const response = await CompanyAPI.deleteCompanyItem(selectedCompanyItem.companyId);
        if (response.isSuccess) {
            NonoToast.success("거래처 정보를 삭제했습니다.");
            updateOpenCompanyDeleteItem(false);
        } else {
            NonoToast.error("거래처 정보 삭제 중 에러가 발생하였습니다.");
        }
        await refreshCompanyList();
    }

    const onCloseCompanyNewDialog = async () => {
        updateOpenCompanyNew(false);
        await refreshCompanyList();
    }

    async function refreshCompanyList() {
        dispatch(clearCompanyList());
        getCompanyList(searchData, 1);
    }

    const onCloseCompanyEditDialog = async () => {
        updateOpenCompanyEdit(false);
        await refreshCompanyList();
    }

    const onCloseChangePasswordModal = () => {
        dispatch(changePassword(false));
    }

    return (
        <div>
            <Modal isOpen={isOpenCompanyDeleteItem} onClose={onCloseRemoveCompanyItemDialog}>
                <DeleteConfirmModal
                    title="거래처 삭제"
                    name={selectedCompanyItem.name}
                    warning={true}
                    onCancel={onCloseRemoveCompanyItemDialog}
                    confirm={confirmRemoveCompanyItemDialog} />
            </Modal>
            <Modal isOpen={changePasswordModalFlag} onClose={onCloseChangePasswordModal}>
                <ChangePasswordModal
                 onClickClose={onCloseChangePasswordModal} />
            </Modal>
            <Modal isOpen={isOpenCompanyNew} onClose={onCloseCompanyNewDialog}>
                <CompanyNewModal onClose={onCloseCompanyNewDialog} />
            </Modal>
            <Modal isOpen={isOpenCpmpanyEdit} onClose={onCloseCompanyEditDialog}>
                <CompanyEditModal onClose={onCloseCompanyEditDialog} />
            </Modal>
            <ToastContainer />
            <div className="page">
                <SideBar value="/settings/company" />
                <div className="contentsPage">
                    <Header title="거래처 관리"
                        desc="입고 / 출고 문서 생성시 사용되는 거래처를 관리하는 화면입니다."
                        isSearch={true} />
                    <div className="pageBody">
                        <div className="companyListPage">
                            <div className="companyListSection">
                                <div className="companyListTopButtonSection">
                                    <div className="emptySection" />
                                    <img src={AddBlue} alt="add"
                                        className="companyAddButton"
                                        onClick={onClickAddButton} />
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

                                <div className="companyListTitle">
                                    <span className="companyListItemNameTitle">거래처 정보</span>
                                    <div className="emptySection" />
                                    <span className="companyListItemStatusTitle">거래처 종류</span>
                                </div>
                                <div className="companyList" onScroll={onScrollCompanyList}>
                                    {
                                        (companyList.length === 0 && searchData !== "") ?
                                            <div className="emptyCompanyListSection">
                                                <p>검색 결과가 존재하지 않습니다.</p>
                                            </div>
                                            :
                                            <ul>
                                                {
                                                    companyList.map((item, index) => {
                                                        return (
                                                            <li key={"productList" + item.productId + index}
                                                                className={item.active ? "companyListItem" : "inactiveCompanyListItem"} >
                                                                <div className="companyListItemInfoSection">
                                                                    <span className="companyListItemName">{item.name}</span>
                                                                    <span className="companyListItemDesc">{item.category}</span>
                                                                </div>
                                                                <div className="emptySection" />
                                                                <img src={Edit} className="companyItemInfoButton" onClick={() => onClickCompanyInfoEditButton(item)} />

                                                                <img src={Delete} className="companyItemDeleteButton" onClick={() => onClickDeleteItem(item)} />

                                                                {
                                                                    (item.type === "INPUT") ?
                                                                        <p className="companyListInputItemCategory">입고처</p> :
                                                                        <p className="companyListOutputItemCategory">출고처</p>
                                                                }


                                                                {/*  */}
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
    )
}

export default Company;