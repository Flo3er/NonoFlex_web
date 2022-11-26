import "./NoticeAddModal.css"
import closeIcon from "../../../../assets/images/close.png"
import PrimaryButton from "../../../components/common/button/PrimaryButton.js"
import { useState } from "react"
import NonoToast from "../../common/toast/Toast"
import NoticeAPI from "../../../../apis/notice/Notice"

const NoticeAddModal = (props) => {
    const [isCheckedFocus, updateCheckedFocus] = useState(false);
    const [noticeTitle, setNoticeTitle] = useState("");
    const [noticeBody, setNoticeBody] = useState("");

    const onClickClose = () => {
        // updateCheckedFocus(false);
        // setNoticeTitle("");
        // setNoticeBody("");
        props.onClickClose();
    }

    const onChangeTitle = (value) => {
        setNoticeTitle(value);
    }

    const onChangeBody = (value) => {
        setNoticeBody(value);
    }

    const onClickCheckBox = () => {
        updateCheckedFocus(!isCheckedFocus);
    }

    const onClickSaveButton = async () => {
        if (noticeTitle === "") {
            NonoToast.error("제목을 입력해 주세요")
            return;
        }
        if (noticeBody === "") {
            NonoToast.error("내용을 입력해 주세요")
            return;
        }

        const response = await NoticeAPI.addNewNotice(noticeTitle, noticeBody, isCheckedFocus);
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
    return (
        <div className="noticeAddModalBody">
            <div className="noticeTitleBox">
                <input type="text"
                    value={noticeTitle}
                    onChange={({ target: { value } }) => onChangeTitle(value)}
                    placeholder="제목을 입력하세요." />
                <img src={closeIcon} alt="close"
                    onClick={onClickClose} />
            </div>
            <div className="noticeBodyBox">
                <textarea
                    value={noticeBody}
                    onChange={({ target: { value } }) => onChangeBody(value)}
                    placeholder="내용을 입력하세요." />
            </div>
            <div className="noticeBodyTail">
                <div className="checkBoxBlock">
                    <div className={isCheckedFocus ? "checkedCheckBox" : "checkBox"} onClick={onClickCheckBox} />
                    <span className="checkBoxText">주요 공지사항 여부</span>
                </div>
                <div className="emptySpace" />
                <div className="noticeAddModalSaveButton">
                    <PrimaryButton value="저장하기" onClick={onClickSaveButton} />
                </div>
            </div>
        </div>
    );
}

export default NoticeAddModal;