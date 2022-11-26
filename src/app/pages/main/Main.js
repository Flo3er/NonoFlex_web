import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"

import ListBlue from "../../../assets/images/listBlue.png"
import AddBlue from "../../../assets/images/addBlue.png"
import noticeAlert from "../../../assets/images/noticeAlert.png"

import { ToastContainer } from "react-toastify";
import "./Main.css"
import { useState } from "react"
import { useEffect } from "react"
import NoticeAPI from "../../../apis/notice/Notice.js"
import NonoToast from "../../components/common/toast/Toast.js"
import Modal from "../../components/common/modal/Modal.js"
import NoticeAddModal from "../../components/main/notice/NoticeAddModal.js"
import Utils from "../../../features/utils/Utils.js"
import AuthenticationAPI from "../../../apis/login/Authentication.js"
import NoticeContentsModal from "../../components/main/notice/NoticeContentsModal.js"
import { useDispatch, useSelector } from "react-redux"
import { recentNotice } from "../../../features/main/NoticeSlice.js"

const Main = () => {
    const [isEmptyNotice, updateEmptyNotice] = useState(true);
    const [isOpenNoticeAddModal, updateOpenNoticAddeModal] = useState(false);
    const [isOpenNoticeContentsModal, updateOpenNoticeContentsModal] = useState(false);

    const dispatch = useDispatch();

    const recentNoticeData = useSelector((state) => state.notice.recentItem);

    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken")
        if (accessToken === "" || accessToken === null) {
            window.location.replace("./login");
        } else {
            const fetchData = async () => {
                if (await Utils.checkToken()) {
                    console.log("test")
                    await updateRecentNotice();
                } else {
                    console.log("token expired");
                    NonoToast.error("로그인 유효기간이 만료되었습니다.");
                    await Utils.timeout(2000);
                    window.location.replace("./login");
                }
            }

            fetchData();
        }
    }, []);

    async function updateRecentNotice() {
        const response = await NoticeAPI.getRecentNotice();
        if (response.isSuccess) {
            dispatch(recentNotice(response.data));
            updateEmptyNotice(false);
        } else {
            updateEmptyNotice(true);
            console.log(recentNotice.errorMessage);
        }
    }

    const onclickListButton = () => {
        window.location.replace("./notice/list")
    }

    const onCLickNoticeAddButton = () => {
        updateOpenNoticAddeModal(true);
    }

    const onCloseNoticeAddModal = () => {
        updateOpenNoticAddeModal(false);
        updateRecentNotice()
    }
    const onCLickNoticeContentsButton = () => {
        updateOpenNoticeContentsModal(true);
    }

    const onCloseNoticeContentsModal = () => {
        updateOpenNoticeContentsModal(false);
        updateRecentNotice()
    }


    return (
        <div>
            <ToastContainer />
            <Modal isOpen={isOpenNoticeAddModal}>
                <NoticeAddModal onClickClose={onCloseNoticeAddModal} />
            </Modal>
            <Modal isOpen={isOpenNoticeContentsModal}>
                <NoticeContentsModal
                    onClickClose={onCloseNoticeContentsModal}
                />
            </Modal>
            <div className="page">
                <Sidebar value="/main" />
                <div className="contentsPage">
                    <Header title="노노유통"
                        desc="환영합니다! 현재 유통 상황을 알 수 있어요!" />
                    <div className="pageBody">
                        <div className="MainNotice">
                            <div className="mainNoticeTitle">
                                <p className="mainNoticeTitleText" >공지사항</p>
                                <img src={ListBlue} alt="list" className="mainIconButton" onClick={onclickListButton} />
                                <img src={AddBlue} alt="add" className="mainIconButton" onClick={onCLickNoticeAddButton} />

                            </div>
                            {!isEmptyNotice ?
                                <div className="mainNoticeBody" onClick={onCLickNoticeContentsButton}>
                                    <div className="mainNoticeBodyTitle">
                                        <span>{recentNoticeData.title}</span>
                                        {recentNoticeData.focus ? <img src={noticeAlert} alt="alert" /> : <p></p>}
                                    </div>
                                    <div className="mainNoticeBodyData">
                                        <span>{recentNoticeData.content}</span>
                                    </div>
                                    <div className="mainNoticeBodyTail">
                                        <p className="mainNoticeBodyTailDate">{recentNoticeData.updatedAt}</p>
                                        <p className="mainNoticeBodyTailAuthor">&nbsp;&nbsp;{recentNoticeData.writer}</p>
                                    </div>
                                </div>
                                :
                                <div className="mainNoticeBody" onClick={onCLickNoticeAddButton}>
                                    <span className="mainNoticeEmptyString"> 새로운 공지 사항을 입력해 보세요! </span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;