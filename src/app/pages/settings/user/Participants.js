import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Utils from "../../../../features/utils/Utils";
import RoundButton from "../../../components/common/button/RoundButton";
import Header from "../../../components/common/header/Header";
import SideBar from "../../../components/common/sidebar/Sidebar";
import NonoToast from "../../../components/common/toast/Toast";
import "./Participants.css"

import Plus from "../../../../assets/images/addBlue.png"
import { removeSearchValue } from "../../../../features/main/SearchSlice";
import UserAPI from "../../../../apis/user/user";
import { clearSelectedUser, clearUserList, selectedUser, updateUserList } from "../../../../features/settings/userSlice";

import Delete from "../../../../assets/images/delete.png"
import Edit from "../../../../assets/images/edit.png"
import Info from "../../../../assets/images/info.png"
import Modal from "../../../components/common/modal/Modal";
import CompanyDeleteModal from "../../../components/settings/company/CompanyDeleteModal";
import UserDeleteModal from "../../../components/settings/user/UserDeleteModal";
import UserEditModal from "../../../components/settings/user/UserEditModal";
import UserNewModal from "../../../components/settings/user/UserNewModal";
import UserInfoModal from "../../../components/settings/user/UserInfoModal";

const Participants = () => {
    const [isLoading, updateLoading] = useState(false);
    const [isOpenUserDeleteDialog, updateUserDeleteDialog] = useState(false);
    const [isOpenUserEditDialog, updateUserEditDialog] = useState(false);
    const [isOpenUserItemInfoDialog, updateUserItemInfoDialog] = useState(false);
    const [isOpenCreateUserItemDialog, updateOpenCreateUserDialog] = useState(false);

    const dispatch = useDispatch();
    const searchData = useSelector((state) => state.search.value);
    const userMetaData = useSelector((state) => state.user.metaData);
    const userList = useSelector((state) => {
        const userList = state.user.itemList;
        return userList.filter((item, index) => item.role === "ROLE_PARTICIPANT");
    });
    const selectedUserItem = useSelector((state) => state.user.selectedItem);

    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken")
        if (accessToken === "" || accessToken === null) {
            window.location.replace("/login");
        } else {
            const fetchData = async () => {
                if (await Utils.checkToken()) {
                    dispatch(removeSearchValue());
                    // dispatch(clearSelectedUser());
                    // dispatch(clearUserList());
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
            await getUserList(searchData, 1);
        }
        fetchData();
    }, [searchData])

    async function getUserList(searchData, page) {
        updateLoading(true);
        const response = await UserAPI.getUserList(searchData, page);
        if (response.isSuccess) {
            console.log(response.data);
            dispatch(updateUserList(response.data));
        }
        updateLoading(false);
    }

    const onScrollUserList = async (event) => {
        const scrollY = event.target.scrollTop;

        if (scrollY >= (100 * (userList.length - 8))) {
            if (!userMetaData.lastPage && !isLoading) {
                await getUserList(searchData, (userMetaData.page + 1));
            }
        }
    }

    async function refreshUserList() {
        dispatch(clearUserList());
        getUserList(searchData, 1);
    }

    const onClickDeleteUserItem = (item) => {
        dispatch(selectedUser(item))
        updateUserDeleteDialog(true);
    }
    const onCloseUserDeleteItemDialog = () => {
        updateUserDeleteDialog(false);
    }
    const onConfirmDeleteUserItemDialog = async () => {
        const response = await UserAPI.deleteUserItem(selectedUserItem.userId);
        if (response.isSuccess) {
            NonoToast.success("해당 참여자를 삭제했습니다.");
            dispatch(clearSelectedUser());
            onCloseUserDeleteItemDialog()
        }
    }
    const onClickEditUserItem = (item) => {
        console.log(item);
        dispatch(selectedUser(item))
        updateUserEditDialog(true);
    }
    const onCloseEditUserItem = () => {
        updateUserEditDialog(false);
        refreshUserList();
    }

    const onClickUserItemInfo = (item) => {
        dispatch(selectedUser(item))
        updateUserItemInfoDialog(true);
    }
    const onCloseUserItemInfo = () => {
        updateUserItemInfoDialog(false);
    }

    const onClickCreateNewUserItem = () => {
        updateOpenCreateUserDialog(true);
    }
    const onCloseCreateUserItemDialog = () => {
        updateOpenCreateUserDialog(false);
        refreshUserList();
    }

    return (
        <div>
            <Modal isOpen={isOpenUserDeleteDialog} onClose={onCloseUserDeleteItemDialog}>
                <UserDeleteModal
                    warning={true}
                    userName={selectedUserItem.userName}
                    onCancel={onCloseUserDeleteItemDialog}
                    confirm={onConfirmDeleteUserItemDialog} />
            </Modal>
            <Modal isOpen={isOpenUserEditDialog} onClose={onCloseEditUserItem}>
                <UserEditModal onClose={onCloseEditUserItem} />
            </Modal>
            <Modal isOpen={isOpenCreateUserItemDialog} onClose={onCloseCreateUserItemDialog}>
                <UserNewModal onClose={onCloseCreateUserItemDialog} />
            </Modal>
            <Modal isOpen={isOpenUserItemInfoDialog} onClose={onCloseUserItemInfo}>
                <UserInfoModal onClose={onCloseUserItemInfo} />
            </Modal>
            <ToastContainer />
            <div className="page">
                <SideBar value="/settings/participant" />
                <div className="contentsPage">
                    <Header title="참여자 관리"
                        desc="참여자 정보를 관리하는 화면입니다."
                        isSearch={true} />
                    <div className="pageBody">
                        <div className="userListPage">
                            <div className="userListSection">
                                <div className="userListTopButtonSection">
                                    <div className="addUserButtonBox">
                                        <RoundButton
                                            onClick={onClickCreateNewUserItem}
                                            value={
                                                <div className="addUserButtonContents">
                                                    <img src={Plus} className="addUserButtonPlusIcon" />
                                                    <span>사용자 추가하기</span>
                                                </div>
                                            } />
                                    </div>
                                </div>
                                <div className="userListContentsSection" onScroll={onScrollUserList}>
                                    {
                                        (userList.length === 0 && searchData !== "") ?
                                            <div className="emptyUserListSection">
                                                <p>검색 결과가 존재하지 않습니다.</p>
                                            </div>
                                            :
                                            <ul>
                                                {
                                                    userList.map((item, index) => {
                                                        return (
                                                            <li key={"userList" + item.userId + index}
                                                                className={item.active ? "userListItem" : "inactiveUserListItem"}>
                                                                <span className="userListItemUserName">{item.userName}</span>
                                                                <div className="emptySection" />
                                                                <img className="participantListItemButton" src={Info} onClick={() => { onClickUserItemInfo(item) }} />
                                                                <img className="participantListItemButton" src={Edit} onClick={() => { onClickEditUserItem(item) }} />
                                                                <img className="participantListItemButton" src={Delete} onClick={() => { onClickDeleteUserItem(item) }} />
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

export default Participants;