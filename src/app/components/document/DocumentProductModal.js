import { useDispatch, useSelector } from "react-redux"
import "./DocumentProductModal.css"

import RoundMinusBlue from "../../../assets/images/roundMinusBlue.png"
import RoundPlusBlue from "../../../assets/images/roundPlusBlue.png"
import Close from "../../../assets/images/closeWhite.png"
import TextField from "../login/TextField";
import { useEffect, useState } from "react";
import PrimaryButton from "../common/button/PrimaryButton"
import { updateDocumentProduct, updateTempDocumentProduct } from "../../../features/document/DocumentProductSlice"
import NonoToast from "../common/toast/Toast"

const DocumentProductModal = (props) => {
    const selectedproduct = useSelector((state) => state.documentProduct.selectedItem);
    const selectedTempProduct = useSelector((state) => state.documentProduct.selectedTempItem);
    const [documentPrductPrice, setDocumentProductPrice] = useState("");
    const [documentProductCount, setDocumentProductCount] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if(props.isTemp) {
           if(props.type === "INPUT") {
            setDocumentProductPrice(selectedTempProduct.inputPrice);
           } else {
            setDocumentProductPrice(selectedTempProduct.outputPrice);
           }
        } else {
            if(props.type === "INPUT") {
                setDocumentProductPrice(selectedproduct.inputPrice);
               } else {
                setDocumentProductPrice(selectedproduct.outputPrice);
               }
        }
    }, [selectedproduct, selectedTempProduct])

    const onClickCloseButton = () => {
        //TOOD: set documentProduct.
        setDocumentProductCount(0);
        setDocumentProductPrice("");
        props.onClickClose();
    }

    const onChangePriceText = (event) => {
        setDocumentProductPrice(event);
        console.log(event);
    }

    const onClickMinusButton = () => {
        var updateValue = documentProductCount - 1;
        if (updateValue <= 0) {
            var updateValue = 0;
        }

        setDocumentProductCount(updateValue);
    }

    const onClickPlusButton = () => {
        var updateValue = documentProductCount + 1;
        if (updateValue >= 1000) {
            var updateValue = 999;
        }

        setDocumentProductCount(updateValue);
    }

    const onClickSaveButton = () => {
        if (documentPrductPrice.length === 0) {
            NonoToast.error("가격을 입력해 주세요.");
            return;
        }

        if(props.isTemp) {
             const resultData = {
                productId: selectedTempProduct.productId,
                productName: selectedTempProduct.name,
                productCode: selectedTempProduct.productCode,
                price: documentPrductPrice,
                count: documentProductCount
            }
            dispatch(updateTempDocumentProduct(resultData));
        } else {
            const resultData = {
                productId: selectedproduct.productId,
                productName: selectedproduct.name,
                productCode: selectedproduct.productCode,
                price: documentPrductPrice,
                count: documentProductCount
            }
            dispatch(updateDocumentProduct(resultData));
        }
        
        setDocumentProductCount(0);
        setDocumentProductPrice("");
        props.onClickClose();
    }
    return (
        <div className="documentProductModalBody">
            <div className="documentProductTitleSection">
                <span>{selectedproduct.name ?? selectedTempProduct.name}</span>
                <div className="emptySpace" />
                <div className="documentProductModalCloseButton"
                    onClick={onClickCloseButton} >
                    <img src={Close} />
                </div>
            </div>
            <div className="documentProductBodySection">
                <div className="documentProductPriceSection">
                    <span className="documentProductPriceTitle">거래 금액</span>
                    <div className="documentProductPriceValueBox">
                        <TextField
                            placeholder="금액을 입력해 주세요."
                            value={documentPrductPrice}
                            isValidData={true}
                            type="number"
                            onChange={onChangePriceText}
                        />
                    </div>
                </div>
                <div className="documentProductCountSection">
                    <span className="documentProductCountTitle">거래 항목 수</span>
                    <div className="documentProductCountButton" onClick={onClickMinusButton}>
                        <img src={RoundMinusBlue} />
                    </div>
                    <div className="documentProductCountValueBox">
                        <span>{documentProductCount}</span>
                    </div>
                    <div className="documentProductCountButton" onClick={onClickPlusButton} >
                        <img src={RoundPlusBlue} />
                    </div>
                </div>
                <div className="documentProductSaveButton">
                    <PrimaryButton value="추가하기" onClick={onClickSaveButton}/>
                </div>
            </div>
        </div>
    )
}

export default DocumentProductModal