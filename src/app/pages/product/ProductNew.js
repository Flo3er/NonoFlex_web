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
import Modal from "../../components/common/modal/Modal";
import Dialog from "../../components/common/modal/Dialog";
import UtilAPI from "../../../apis/etc/util";
import ProductAPI from "../../../apis/product/Product";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../../components/login/ChangePasswordModal";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../features/login/LoginSlice";

const ProductNew = () => {
    const [productName, setProductName] = useState("");
    const [isValidProductName, updateValidProductName] = useState(true);
    const [productImageName, setProductImageName] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [productDescription, setProductDescription] = useState("");
    const [productCode, setProductCode] = useState("");
    const [isValidProductCode, updateValidProductCode] = useState(true);
    const [productCategory, setProductCategorySelection] = useState("선택");
    const [isValidProductCategory, updateValidProductCategory] = useState(false)
    const [productSaveType, setProductSaveTypeSelection] = useState("NONE");
    const [isValidProductSaveType, updateValidProductSaveType] = useState(false)
    const [productUnit, setProductUnit] = useState("");
    const [isValidProductUnit, updateValidProductUnit] = useState(true);
    const [productMaker, setProductMaker] = useState("");
    const [isValidProductMaker, updateValidProductMaker] = useState(true);
    const [productStock, setProductStock] = useState(0);
    const [productInputPrice, setProductInputPrice] = useState(0);
    const [productOutputPrice, setProductOutputPrice] = useState(0);
    const [isEnableSaveButton, updateEnableSaveButton] = useState(false);
    const [isOpenSaveProductConfirm, updateOpenSaveProductConfirm] = useState(false);
    const productSaveTypeList = [
        { value: "선택", code: "NONE" },
        { value: "실온", code: "ROOM" },
        { value: "냉장", code: "COLD" },
        { value: "냉동", code: "ICE" }
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

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changePasswordModalFlag = useSelector((state) => state.login.changePasswordModalFlag);


    const onChangeProductName = (value) => {
        setProductName(value);
        productNameValidation(value);
    }
    function productNameValidation(value) {
        const isInValidProductName = (value === undefined || value === "" || value === null)
        updateValidProductName(!isInValidProductName);
    }

    const onChangeProductDescription = (event) => {
        setProductDescription(event.target.value);
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
        console.log(event.target.value);
        setProductSaveTypeSelection(event.target.value);
        productSaveTypeValidation(event.target.value);
    }
    function productSaveTypeValidation(value) {
        const isInvalidProductSaveType = (value === "" || value === "NONE")
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

    const onChangeProductStock = (value) => {
        if (value === null || value === undefined) {
            setProductStock(0);
        } else {
            setProductStock(value);
        }
    }

    const onChangeProductInputPrice = (value) => {
        const price = Number(value)
        setProductInputPrice(price)
    }
    const onChangeProductOutputPrice = (value) => {
        const price = Number(value)
        setProductOutputPrice(price)
    }
    const updateSaveButtonValidation = () => {
        const isValidSaveButton = isValidProductName && isValidProductCode && isValidProductUnit && isValidProductCategory && isValidProductSaveType && isValidProductMaker
        // console.log(isValidProductName);
        // console.log(isValidProductCode);
        // console.log(isValidProductUnit);
        // console.log(isValidProductCategory);
        // console.log(isValidProductSaveType);
        // console.log(isValidProductMaker);
        // console.log(isValidSaveButton);
        // console.log(productImage);

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
        const isInavlidProductSaveType = (productSaveType === "" || productSaveType === "선택")
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

        // confirm dialog open
        updateOpenSaveProductConfirm(true);
    }
    const onUpdatedImageFile = (file) => {
        if (file.length === 1 && file[0]) {
            setProductImage(file[0]);
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('productImage').src = e.target.result;
                setProductImageName(file[0].name);
            };
            reader.readAsDataURL(file[0]);

        }
    }

    const canceledSaveProduct = () => {
        updateOpenSaveProductConfirm(false);
    }

    const onCloseChangePasswordModal = () => {
        dispatch(changePassword(false));
    }

    const confirmSaveProduct = async () => {
        updateOpenSaveProductConfirm(false);

        if (productImage != null) {
            const uploadImageResponse = await UtilAPI.uploadImage(productImage);
            if (uploadImageResponse.isSuccess) {
                const fileId = uploadImageResponse.data.imageId;
                const response = await ProductAPI.addProduct(productCode,
                    productName,
                    productDescription,
                    productCategory,
                    productMaker,
                    productUnit,
                    productSaveType,
                    productStock,
                    productInputPrice,
                    productOutputPrice,
                    fileId);

                if (response.isSuccess) {
                    NonoToast.success("물품 등록에 성공했습니다.");
                    window.location.replace("/product/list");
                } else {
                    NonoToast.error("물품 등록에 실패했습니다.");
                    console.log(response.errorMessage);
                }
            } else {
                NonoToast.error("물품 등록에 실패했습니다.");
                console.log("image upload fail");
            }
        } else {
            const response = await ProductAPI.addProduct(productCode,
                productName,
                productDescription,
                productCategory,
                productMaker,
                productUnit,
                productSaveType,
                productStock,
                productInputPrice,
                productOutputPrice,
                "");

            if (response.isSuccess) {
                NonoToast.success("물품 등록에 성공했습니다.");
                window.location.replace("/product/list")
            } else {
                NonoToast.error("물품 등록에 실패했습니다.");
                console.log(response.errorMessage);
            }
        }
    }
    return (
        <div>
            <ToastContainer />
            <Modal isOpen={changePasswordModalFlag} onClose={onCloseChangePasswordModal}>
                <ChangePasswordModal
                 onClickClose={onCloseChangePasswordModal} />
            </Modal>
            <Modal isOpen={isOpenSaveProductConfirm}>
                <Dialog title="새 물품 추가"
                    contents="새로운 물품 정보를 추가하시겠습니까?"
                    warning={false}
                    onCancel={canceledSaveProduct}
                    confirm={confirmSaveProduct} />
            </Modal>
            <div className="page">
                <Sidebar value="/product/new" />
                <div className="contentsPage">
                    <Header title="새 물품 추가"
                        desc="새로운 물품을 추가하는 화면입니다." />
                    <div className="pageBody">
                        <ul className="newProductItemForm">
                            <li>
                                <div className="productImagetitleBox">
                                    <div className="assentialPointImage" />
                                    <span>물품 이미지</span>
                                </div>
                                <div className="productImageDescription">
                                    <span>• png, jpg, jpeg 형식을 지원합니다.</span>
                                    <span>• 1:1 비율의 이미지가 가장 적합하게 나타납니다.</span>
                                    <span>• 500KB이상, 10MB이하까지 업로드 가능합니다.</span>
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
                                                    <option key={"productSaveType" + index} value={item.code}>{item.value}</option>
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
                                <div className="productStockTitleBox">
                                    <div className="assentialPointImage" />
                                    <span>재고</span>
                                </div>
                                <div className="productStockTextField">
                                    <TextField isValidData={true}
                                        type="text"
                                        onChange={value => {
                                            onChangeProductStock(value);
                                        }}
                                        onFocusOut={updateSaveButtonValidation}
                                        placeholder="재고 수량을 입력해 주세요!" />
                                </div>
                            </li>
                            <li>
                                <div className="productPriceTitleBox">
                                    <div className="assentialPointImage" />
                                    <span>입고 금액</span>
                                </div>
                                <div className="productPriceTextField">
                                    <TextField isValidData={true}
                                        type="text"
                                        value={productInputPrice}
                                        onChange={value => {
                                            onChangeProductInputPrice(value);
                                        }}
                                        onFocusOut={updateSaveButtonValidation}
                                        placeholder="물품 가격을 입력해 주세요." />
                                </div>
                                <div className="productPriceUnitLabelBox">
                                    <span>원</span>
                                </div>
                            </li>
                            <li>
                                <div className="productPriceTitleBox">
                                    <div className="assentialPointImage" />
                                    <span>출고 금액</span>
                                </div>
                                <div className="productPriceTextField">
                                    <TextField isValidData={true}
                                        type="text"
                                        value={productOutputPrice}
                                        onChange={value => {
                                            onChangeProductOutputPrice(value);
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