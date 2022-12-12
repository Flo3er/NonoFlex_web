import "./ProductNew.css"
import { ToastContainer } from "react-toastify";
import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"
import AssentialPoint from "../../../assets/images/assentialPoint.png"
import EmptyImage from "../../../assets/images/emptyImage.png"
import TextField from "../../components/login/TextField.js";
import { useState } from "react";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import NonoToast from "../../components/common/toast/Toast";

const ProductNew = () => {
    const [productName, setProductName] = useState("");
    const [isValidProductName, updateValidProductName] = useState(true);
    const [productImageName, setProductImageName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productCode, setProductCode] = useState("");
    const [isValidProductCode, updateValidProductCode] = useState(true);
    const [productCategory, setProductCategorySelection] = useState("");
    const [isValidProductCategory, updateValidProductCategory] = useState(false)
    const [productSaveType, setProductSaveTypeSelection] = useState("");
    const [isValidProductSaveType, updateValidProductSaveType] = useState(false)
    const [productUnit, setProductUnit] = useState("");
    const [isValidProductUnit, updateValidProductUnit] = useState(true);
    const [productMaker, setProductMaker] = useState("");
    const [isValidProductMaker, updateValidProductMaker] = useState(true);
    const [productPrice, setProductPrice] = useState(0);
    const [isEnableSaveButton, updateEnableSaveButton] = useState(false);

    const productSaveTypeList = [
        "선택",
        "실온",
        "냉장",
        "냉동"
    ]

    const productCategoryList = [
        "선택",
        "운영 물품",
        "식료품",
        "화성용",
        "본부 물품",
        "소모품",
        "기타"
    ]


    const onChangeProductName = (value) => {
        setProductName(value);
        productNameValidation(value);
    }
    function productNameValidation(value) {
        const isInValidProductName = (value === undefined || value === "" || value === null)
        updateValidProductName(!isInValidProductName);
    }

    const onChangeProductDescription = (value) => {
        setProductDescription(value);
    }

    const onChangeProductCode = (value) => {
        setProductCode(value);
        productCodeValidation(value);
    }
    function productCodeValidation(value) {
        const isInValidProductCode = (value === undefined || value === "" || value === null)
        updateValidProductCode(!isInValidProductCode);
    }
    const onChangeProductCategorySelection = (event) => {
        setProductCategorySelection(event.target.value);
        productCategoryValidation(event.target.value);
    }
    function productCategoryValidation(value) {
        const isInvalidProductCategory = (value === "" || value === "선택")
        updateValidProductCategory(!isInvalidProductCategory);
    }

    const onChangeProductSaveTypeSelection = (event) => {
        setProductSaveTypeSelection(event.target.value);
        productSaveTypeValidation(event.target.value);
    }
    function productSaveTypeValidation(value) {
        const isInvalidProductSaveType = (value === "" || value === "선택")
        updateValidProductSaveType(!isInvalidProductSaveType);
    }

    const onChangeProductUnit = (value) => {
        setProductUnit(value);
        productUnitValidation(value);
    }
    function productUnitValidation(value) {
        const isInvalidProductUnit = (value === undefined || value === "" || value === null)
        updateValidProductUnit(!isInvalidProductUnit);
    }
    const onChangeProductMaker = (value) => {
        setProductMaker(value);
        productMakerValidation(value);
    }
    function productMakerValidation(value) {
        const isInvalidProductMaker = (value === undefined || value === "" || value === null)
        updateValidProductMaker(!isInvalidProductMaker);
    }

    const onChangeProductPrice = (value) => {
        const price = Number(value)
        setProductPrice(price)
    }
    const updateSaveButtonValidation = () => {
        const isValidSaveButton = isValidProductName && isValidProductCode && isValidProductUnit && isValidProductCategory && isValidProductSaveType && isValidProductMaker
        console.log(isValidProductName);
        console.log(isValidProductCode);
        console.log(isValidProductUnit);
        console.log(isValidProductCategory);
        console.log(isValidProductSaveType);
        console.log(isValidProductMaker);
        console.log(isValidSaveButton);
        
        updateEnableSaveButton(isValidSaveButton);
    }
    function checkValidation() {
        productNameValidation(productName)
        productCodeValidation(productCode)
        productUnitValidation(productUnit)
        productCategoryValidation(productCategory)
        productSaveTypeValidation(productSaveType)
        productMakerValidation(productMaker)
    }
    const onCLickSaveButton = () => {
        const isInValidProductName = (productName === undefined || productName === "" || productName === null)
        const isInValidProductCode = (productCode === undefined || productCode === "" || productCode === null)
        const isInvalidProductUnit = (productUnit === undefined || productUnit === "" || productUnit === null)
        const isInvalidProductCategory = (productCategory === "" || productCategory === "선택")
        const isInavlidProductSaveType = (productSaveType === "" || productSaveType ==="선택")
        const isInvalidProductMaker = (productMaker === undefined || productMaker === "" || productMaker === null)
       
        if (isInValidProductName) {
            NonoToast.error("물품 이름을 입력해 주세요!");
            checkValidation();
            return
        } else if (isInValidProductCode) {
            NonoToast.error("물품 코드를 입력해 주세요!");
            checkValidation();
            return
        } else if (isInvalidProductUnit) {
            NonoToast.error("물품 규격을 입력해 주세요!");
            checkValidation();
            return
        } else if (isInvalidProductCategory) {
            NonoToast.error("물품 분류를 선택해 주세요!");
            checkValidation();
            return
        } else if (isInavlidProductSaveType) {
            NonoToast.error("물품 보관 방법을 선택해 주세요!");
            checkValidation();
            return
        } else if (isInvalidProductMaker) {
            NonoToast.error("제조사를 입력해 주세요!");
            return
        }

        NonoToast.success("물품 검증이 완료되었습니다.");
    }
    const onUpdatedImageFile = (file) => {
        if (file.length === 1 && file[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('productImage').src = e.target.result;
                setProductImageName(file[0].name);
            };
            console.log(file[0]);
            reader.readAsDataURL(file[0]);
        }
    }

    return (
        <div>
            <ToastContainer />
            <div className="page">
                <Sidebar value="/product/new" />
                <div className="contentsPage">
                    <Header title="새 물품 추가"
                        desc="물품을 추가합니다." />
                    <div className="pageBody">
                        <ul className="newProductItemForm">
                            <li>
                                <div className="productImagetitleBox">
                                    <div className="assentialPointImage" />
                                    <span>물품 이미지</span>
                                </div>
                                <div className="productImageDescription">
                                    <span>*png 이미지 형식</span>
                                    <span>이미지는 1:1 사이즈로 입력해야 이쁘게 나와요.</span>
                                    <span>*500kb 이상 파일을 업로드 해주세요.</span>
                                    <div className="emptySpace" />
                                    {/* <div className="loadProductImageButton"
                                        onClick={onClickLoadProductImageButton}>
                                        <span>불러오기</span>
                                    </div> */}
                                    <div className="loadProductImageButton">
                                        <label className="loadProductImageButtonLabel"
                                            htmlFor="loadProductImage">불러오기</label>
                                        <input type="file"
                                            accept="image/*"
                                            id="loadProductImage"
                                            onChange={({ target: { files } }) => {
                                                onUpdatedImageFile(files)
                                            }} />
                                        <span className="loadProductImageFileNameLabel">{productImageName}</span>
                                    </div>

                                </div>
                                <img src={EmptyImage} className="productImageItem" id="productImage" />
                            </li>
                            <li>
                                <div className="productNameTitleBox">
                                    <img src={AssentialPoint} className="assentialPointImage" />
                                    <span>물품 이름</span>
                                </div>
                                <div className="productNameTextField">
                                    <TextField
                                        type="text"
                                        isValidData={isValidProductName}
                                        onChange={value => {
                                            onChangeProductName(value);
                                        }}
                                        onFocusOut={updateSaveButtonValidation}
                                        placeholder="물품 이름을 입력해 주세요!" />
                                </div>
                            </li>
                            <li>
                                <div className="productDescriptionTitleBox">
                                    <div className="assentialPointImage" />
                                    <span>물품 설명</span>
                                </div>
                                <div className="productDescriptionTextField">
                                    <textarea
                                        onChange={(value) => onChangeProductDescription(value)}
                                        placeholder="물품 설명이 필요한 경우, 여기에 입력해 주세요!" />
                                </div>
                            </li>
                            <li>
                                <div className="productCodeTitleBox">
                                    <img src={AssentialPoint} className="assentialPointImage" />
                                    <span>물품 코드</span>
                                </div>
                                <div className="productCodeTextField">
                                    <TextField
                                        isValidData={isValidProductCode}
                                        type="text"
                                        onChange={value => {
                                            onChangeProductCode(value);
                                        }}
                                        onFocusOut={updateSaveButtonValidation}
                                        placeholder="물품 코드를 입력해 주세요!" />
                                </div>
                            </li>
                            <li>
                                <div className="productBarCodeTitleBox">
                                    <div className="assentialPointImage" />
                                    <span>바코드</span>
                                </div>
                                <div className="productBarCodeTextField">
                                    <span>바코드는 모바일 앱을 통해 추가가 가능합니다.</span>
                                </div>
                            </li>
                            <li>
                                <div className="productCategoryTitleBox">
                                    <img src={AssentialPoint} className="assentialPointImage" />
                                    <span>물품 분류</span>
                                </div>
                                <div className="productCategorySelectBox">
                                    <select className="productCategorySelect" 
                                    onChange={onChangeProductCategorySelection}
                                    onBlur={updateSaveButtonValidation}>
                                        {
                                            productCategoryList.map((item, index) => {
                                                return (
                                                    <option key={"productCategory" + index} value={item}>{item}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </li>
                            <li>
                                <div className="productSaveTypeTitleBox">
                                    <img src={AssentialPoint} className="assentialPointImage" />
                                    <span>보관 방법</span>
                                </div>
                                <div className="productSaveTypeSelectBox">
                                    <select className="productSaveTypeSelect"
                                     onChange={onChangeProductSaveTypeSelection}
                                     onBlur={updateSaveButtonValidation}>
                                        {
                                            productSaveTypeList.map((item, index) => {
                                                return (
                                                    <option key={"productSaveType" + index} value={item}>{item}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </li>
                            <li>
                                <div className="productUnitTitleBox">
                                    <img src={AssentialPoint} className="assentialPointImage" />
                                    <span>규격</span>
                                </div>
                                <div className="productUnitTextField">
                                    <TextField
                                        isValidData={isValidProductUnit}
                                        onChange={value => {
                                            onChangeProductUnit(value);
                                        }}
                                        onFocusOut={updateSaveButtonValidation}
                                        type="text"
                                        placeholder="물품 규격을 입력해 주세요!" />
                                </div>
                            </li>
                            <li>
                                <div className="productMakerTitleBox">
                                    <img src={AssentialPoint} className="assentialPointImage" />
                                    <span>제조사</span>
                                </div>
                                <div className="productMakerTextField">
                                    <TextField isValidData={true}
                                        type="text"
                                        onChange={value => {
                                            onChangeProductMaker(value);
                                        }}
                                        onFocusOut={updateSaveButtonValidation}
                                        placeholder="제조사 정보를 입력해 주세요!" />
                                </div>
                            </li>
                            <li>
                                <div className="productPriceTitleBox">
                                    <div className="assentialPointImage" />
                                    <span>기준 금액</span>
                                </div>
                                <div className="productPriceTextField">
                                    <TextField isValidData={true}
                                        type="text"
                                        value={productPrice}
                                        onChange={value => {
                                            onChangeProductPrice(value);
                                        }}
                                        onFocusOut={updateSaveButtonValidation}
                                        placeholder="물품 가격을 입력해 주세요." />
                                </div>
                                <div className="productPriceUnitLabelBox">
                                    <span>원</span>
                                </div>
                            </li>
                            <li />
                            <li>
                                <div className="saveProductInfoBox">
                                    <div className="saveProductInfoButton">
                                        <PrimaryButton value="저장하기"
                                            disabled={!isEnableSaveButton}
                                            onClick={onCLickSaveButton} />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductNew;