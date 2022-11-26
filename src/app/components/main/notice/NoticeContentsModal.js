import "./NoticeContentsModal.css"
import closeIcon from "../../../../assets/images/close.png"
import PrimaryButton from "../../../components/common/button/PrimaryButton.js"
import { useEffect, useState } from "react"
import NonoToast from "../../common/toast/Toast"
import NoticeAPI from "../../../../apis/notice/Notice"
import { useSelector } from "react-redux"
import Modal from "../../common/modal/Modal"
import TextButton from "../../common/button/TextButton"
import Dialog from "../../common/modal/Dialog.js"

const NoticeContentsModal = (props) => {
    const [isReadOnly, updateReadOnly] = useState(true);
    const [isCheckedFocus, updateCheckedFocus] = useState(false);
    const [noticeTitle, setNoticeTitle] = useState("");
    const [noticeBody, setNoticeBody] = useState("");
    const [isOpenRemoveModal, updateOpenRemoveModal] = useState(false);

    const recentNoticeData = useSelector((state) => state.notice.recentItem);

    useEffect(() => {
        updateReadOnly(true);
        setNoticeTitle(recentNoticeData.title ?? "");
        setNoticeBody(recentNoticeData.content ?? "");
        updateCheckedFocus(recentNoticeData.focus ?? false);

    }, [recentNoticeData]);

    const onClickClose = () => {
        updateReadOnly(true);
        props.onClickClose();
    }

    const onChangeTitle = (value) => {
        setNoticeTitle(value);
    }

    const onChangeBody = (value) => {
        setNoticeBody(value);
    }

    const onClickRemoveNoticeModal = () => {
        updateOpenRemoveModal(true);
    }

    const onCloseRemoveNoticeDialog = () => {
        updateOpenRemoveModal(false);
    }

    const confirmRemoveNoticeDialog = async () => {
        console.log(recentNoticeData);
        const response = await NoticeAPI.removeNotice(recentNoticeData.noticeId);
        if (response.isSuccess) {
            NonoToast.success("공지사항을 삭제헸습니다.");
            updateOpenRemoveModal(false);
            onClickClose();
        } else {
            NonoToast.error(response.errorMessage ?? "공지사항 삭제에 실패했습니다.");
            updateOpenRemoveModal(false);
        }
    }

    const onClickSaveButton = async () => {
        if (isReadOnly) {
            updateReadOnly(false);
            return;
        } else {
            if (noticeTitle === "") {
                NonoToast.error("제목을 입력해 주세요")
                return;
            }
            if (noticeBody === "") {
                NonoToast.error("내용을 입력해 주세요")
                return;
            }

            const response = await NoticeAPI.editNotice(recentNoticeData.noticeId, noticeTitle, noticeBody, isCheckedFocus);
            if (response.isSuccess) {
                NonoToast.success("새로운 공지사항이 등록되었습니다.");
                updateCheckedFocus(false);
                setNoticeTitle("");
                setNoticeBody("");
                onClickClose();
            } else {
                NonoToast.error(response.errorMessage ?? "공지사항 등록에 실패했습니다.");
            }
        }
    }
    return (
        <div className="noticeAddModalBody">
            <Modal isOpen={isOpenRemoveModal} >
                <Dialog title="공지사항 삭제"
                    contents="해당 공지사항을 삭제하시겠습니까?"
                    warning={true}
                    onCancel={onCloseRemoveNoticeDialog}
                    confirm={confirmRemoveNoticeDialog} />
            </Modal>
            <div className="noticeTitleBox">
                <input type="text"
                    value={noticeTitle}
                    readOnly={isReadOnly}
                    onChange={({ target: { value } }) => onChangeTitle(value)}
                    placeholder="제목을 입력하세요." />
                <img src={closeIcon} alt="close"
                    onClick={onClickClose} />
            </div>
            <div className="noticeBodyBox">
                <textarea
                    value={noticeBody}
                    readOnly={isReadOnly}
                    onChange={({ target: { value } }) => onChangeBody(value)}
                    placeholder="내용을 입력하세요." />
            </div>
            <div className="noticeBodyTail">
                <div className="checkBoxBlock">
                    <div className={isCheckedFocus ? "checkedCheckBox" : "checkBox"} />
                    <span className="checkBoxText">주요 공지사항 여부</span>
                </div>
                <div className="emptySpace" />
                {isReadOnly ?
                    <TextButton value="공지사항 삭제"
                        warning={true}
                        onclick={onClickRemoveNoticeModal} /> : null
                }
                <div className="noticeAddModalSaveButton">
                    <PrimaryButton value={isReadOnly ? "수정하기" : "저장하기"} onClick={onClickSaveButton} />
                </div>
            </div>
        </div>
    );
}

export default NoticeContentsModal;