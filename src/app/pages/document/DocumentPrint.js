import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import DocumentAPI from "../../../apis/document/Document";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import Header from "../../components/common/header/Header";
import SideBar from "../../components/common/sidebar/Sidebar";
import NonoToast from "../../components/common/toast/Toast";
import "./DocumentPrint.css"

const DocumentPrint = () => {
    const dispatch = useDispatch();
    const [selectedRecordYear, setSelectedRecordYear] = useState(new Date().getFullYear());
    const [selectedRecordMonth, selSelectedRecordMonth] = useState((new Date().getMonth() + 1));
    const searchYearArray = () => {
        const currentYear = new Date().getFullYear();
        const result = [];
        for (let year = 2021; year < (currentYear + 1); year++) {
            result.push(<option key={"yearSelection" + year} value={year}>{year + "년"}</option>);
        }
        return result;
    };
    const searchMonthArray = () => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        console.log(currentYear)
        console.log(currentMonth)
        const result = [];
        if(selectedRecordYear == currentYear) {
            for (let month = 1; month < (currentMonth + 1); month++) {
                result.push(<option key={"monthSelection" + month} value={month}>{month + "월"}</option>);
            }
        } else {
            for (let month = 1; month < 13; month++) {
                result.push(<option key={"monthSelection" + month} value={month}>{month + "월"}</option>);
            }
        }

        console.log(result);
        return result;
    }

    const onChangeRecordYearSelection = (event) => {
        setSelectedRecordYear(event.target.value);
    }
    const onChangeRecordMonthSelection = (event) => {
        selSelectedRecordMonth(event.target.value);
    }

    const onClickMakeDocumentButton = async () => {
        const response = await DocumentAPI.extractDocument(selectedRecordYear, selectedRecordMonth);
        if(response.isSuccess) {
            NonoToast.success("요청에 성공하였습니다. 이메일을 확인해 주세요.");
        } else {
            NonoToast.error("요청에 실패하였습니다." + response.errorMessage);
        }
    }
    return (
        <div>
            <ToastContainer />
            <div className="page">
                <SideBar value="/document/print" />
                <div className="contentsPage">
                    <Header title="문서 내보내기."
                        desc="입 / 출고서 내용을 엑셀 파일로 추출하여 메일로 전송합니다."
                        isSearch={false} />
                    <div className="pageBody">
                        <div className="documentPrintPage">
                            <div className="documentPrintDescriptionBox">
                                <p className="documentPrintDescriptionTitle">입/출고서 내보내기</p>
                                <p className="documentPrintDescription">입/출고 데이터 엑셀 파일을 이메일로 전송합니다.</p>
                                <p className="documentPrintDescription">원하시는 연 / 월 데이터를 선택 후 [자료만들기] 버튼을 클릭해 주세요. </p>
                                <p className="documentPrintDescription">요청 후 파일 생성까지 최소 몇초에서 최대 10분의 시간이 소요될 수 있습니다.</p>

                                <p className="documentPrintDescription">이점 참고하시어 확인 부탁드립니다.</p>

                                <div className="selectedMakeDateBox" >
                                    <span> 연도 선택</span>
                                    <div className="documentPrintSelectYear">
                                        <select className="recordYearSelect"
                                            value={selectedRecordYear}
                                            onChange={onChangeRecordYearSelection}>
                                            {
                                                searchYearArray()
                                            }
                                        </select>
                                    </div>
                                    <span> 월 선택</span>
                                    <div className="documentPrintSelectMonth">
                                        <select className="recordMonthSelect"
                                            value={selectedRecordMonth}
                                            onChange={onChangeRecordMonthSelection}>
                                            {
                                                searchMonthArray()
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="sendButtonBox">
                                    <PrimaryButton value="자료 만들기" onClick={onClickMakeDocumentButton} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocumentPrint;