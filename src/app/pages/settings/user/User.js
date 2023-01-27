import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer } from "react-toastify"
import UserAPI from "../../../../apis/user/user"
import { changePassword } from "../../../../features/login/LoginSlice"
import { removeSearchValue } from "../../../../features/main/SearchSlice"
import { clearSelectedUser, clearUserList, updateUserList } from "../../../../features/settings/userSlice"
import Utils from "../../../../features/utils/Utils"
import RoundButton from "../../../components/common/button/RoundButton"
import Header from "../../../components/common/header/Header"
import Modal from "../../../components/common/modal/Modal"
import SideBar from "../../../components/common/sidebar/Sidebar"
import NonoToast from "../../../components/common/toast/Toast"
import ChangePasswordModal from "../../../components/login/ChangePasswordModal"
import "./User.css"

const User = () => {
    const [isLoading, updateLoading] = useState(false);

    const dispatch = useDispatch();
    const searchData = useSelector((state) => state.search.value);
    const userMetaData = useSelector((state) => state.user.metaData);
    const userList = useSelector((state) => {
        const userList = state.user.itemList;
        const filterUserList = userList.filter((item, index) => item.role == "ROLE_ADMIN");
        console.log(filterUserList)
        return filterUserList
    });
    const selectedUserItem = useSelector((state) => state.user.selectedItem);
    const changePasswordModalFlag = useSelector((state) => state.login.changePasswordModalFlag);

    const activeTypeList = [
        { value: "활성", code: true },
        { value: "비활성", code: false }
    ]

    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken")
        if (accessToken === "" || accessToken === null) {
            window.location.replace("/login");
        } else {
            const fetchData = async () => {
                if (await Utils.checkToken()) {
                    dispatch(removeSearchValue());
                    dispatch(clearSelectedUser());
                    dispatch(clearUserList());
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

    const onChangeActiveTypeSelection = async (item, event) => {
        const response = await UserAPI.updateUserItem(item.userId, item.userName, event.target.value);
        console.log(response)
        if (response.isSuccess) {
            NonoToast.success(item.userName + "님의 활성 상태를 변경 하였습니다.")
            refreshUserList();
        } else {
            NonoToast.error("사용자를 활성화 하는데 실패하였습니다.");
        }
    }

    async function refreshUserList() {
        dispatch(clearUserList());
        getUserList(searchData, 1);
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
                <SideBar value="/settings/user" />
                <div className="contentsPage">
                    <Header title="사용자 관리"
                        desc="사용자 정보를 관리하는 화면입니다."
                        isSearch={true} />
                    <div className="pageBody">
                        <div className="userListPage">
                            <div className="userListSection">
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
                                                                <div className="activeTypeSelectBox">
                                                                    <select className="activeTypeSelect"
                                                                        value={item.active ?? true}
                                                                        onChange={(event) => onChangeActiveTypeSelection(item, event)} >
                                                                        {
                                                                            activeTypeList.map((item, index) => {
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default User;