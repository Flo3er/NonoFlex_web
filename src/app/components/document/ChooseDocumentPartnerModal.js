import "./ChooseDocumentPartnerModal.css"

import Close from "../../../assets/images/closeWhite.png"
import CloseBlack from "../../../assets/images/close.png"
import Search from "../../../assets/images/search.png"

import { useEffect, useState } from "react";
import CompanyAPI from "../../../apis/company/company";
import { useDispatch, useSelector } from "react-redux";
import { clearPartnerList, selectedPartner, updatePartnerList } from "../../../features/document/DocumentPartnerSlice";
import NonoToast from "../common/toast/Toast";

const ChooseDocumentPartnerModal = (props) => {
    const [searchData, updateSearchData] = useState("")
    // const [partnerList, setPartnerList] = useState([]);
    const [metaData, updateMetaData] = useState({});
    const [isLoading, updateLoading] = useState(false);

    const dispatch = useDispatch();
    const partnerList = useSelector((state) => state.documentPartner.partnerList);
    useEffect(() => {
        updateSearchData("");
        dispatch(clearPartnerList());
        if (props.type === "input") {
            const fetchData = async () => {
                updateLoading(true);
                const companyListInfo = await CompanyAPI.getCompanyList("input", "", "name", "asc", 1);
                updateMetaData(companyListInfo.data.meta);
                dispatch(updatePartnerList(companyListInfo.data.companyList));
                updateLoading(false);
            }
            fetchData();
        } else {
            const fetchData = async () => {
                updateLoading(true);
                const companyListInfo = await CompanyAPI.getCompanyList("output", "", "name", "asc", 1);
                updateMetaData(companyListInfo.data.meta);
                dispatch(updatePartnerList(companyListInfo.data.companyList));
                updateLoading(false);
            }
            fetchData();
        }
    }, [props.type]);

    const onClickCloseButton = () => {
        props.onClickClose();
        updateSearchData("");
    }

    const onChangeSearchField = (value) => {
        updateSearchData(value)
    }

    const onClickRemoveButton = () => {
        updateSearchData("");

    }

    const onClickSearchButton = () => {
        console.log(searchData);
        dispatch(clearPartnerList());
        getPartnerList(searchData, 1);
    }

    const pressKey = () => {
        if (window.event.keyCode == 13) {
            onClickSearchButton();
        }
    }

    const onClickPartnerItem = (item) => {
        if (item.active == false) {
            NonoToast.error("비활성화 된 거래처 입니다.");
            return;
        }

        dispatch(selectedPartner(item));
        props.onClickClose();
        updateSearchData("");
    }

    const onScrollPartnerList = (event) => {
        const scrollY = event.target.scrollTop;
        // console.log(70 * (productList.length - 8) + "||" + scrollY);

        if (scrollY >= (80 * (partnerList.length - 8))) {
            // console.log(productMetaData.lastPage)
            if (!metaData.lastPage && !isLoading) {
                getPartnerList(searchData, (metaData.page + 1));
            }
        }
    }

    async function getPartnerList(query, page) {
        const type = props.type === "input" ? "input" : "output";
        updateLoading(true);
        const response = await CompanyAPI.getCompanyList(type, query, "name", "asc", page);
        if (response.isSuccess) {
            dispatch(updatePartnerList(response.data.companyList));
            updateMetaData(response.data.meta);
        }
        updateLoading(false);
    }

    return (
        <div className="chooseDocumentPartnerModalBody" >
            <div className="chooseDocumentPartnerTitleSection">
                <span>거래처 선택</span>
                <div className="emptySpace" />
                <div className="documentProductModalCloseButton"
                    onClick={onClickCloseButton} >
                    <img src={Close} />
                </div>
            </div>
            <div className="chooseDocumentPartnerBodySection">
                <div className="chooseDocPartnerSearchField">
                    <div className="normalInputBox">
                        <input type="text"
                            value={searchData}
                            className='searchInputBox'
                            onChange={({ target: { value } }) => onChangeSearchField(value)}
                            placeholder="검색어를 입력하세요."
                            onKeyUp={pressKey}
                        />

                        {
                            searchData === "" ? null :
                                <img src={CloseBlack}
                                    alt='remove'
                                    className='removeButton'
                                    onClick={onClickRemoveButton} />
                        }

                        <img src={Search}
                            alt='search'
                            className='searchButton'
                            onClick={onClickSearchButton} />
                    </div>
                </div>
                <div className="chooseDocPartnerListSection">
                    {
                        (partnerList.length == 0) ?
                            <div className="emptyDocumentPartnerListSection">
                                <p>검색 결과가 존재하지 않습니다.</p>
                            </div>
                            :
                            <ul onScroll={onScrollPartnerList}>
                                {
                                    partnerList.map((item, index) => {
                                        return (
                                            <li key={"docPartner" + item.companyId + index}
                                                className={item.active ? "chooseDocPartnerListItem" : "chooseDocPartnerListDisabledItem"}
                                                onClick={() => onClickPartnerItem(item)}>
                                                {item.type == "INPUT" ?
                                                    <p className="docPartnerInputTag">입고처</p>
                                                    : <p className="docPartnerOutputTag">출고처</p>
                                                }
                                                <span className="docPartnerName">{item.name}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                    }
                </div>
            </div>
        </div>
    );

}

export default ChooseDocumentPartnerModal;