import "./ProductEdit.css"
import { ToastContainer } from "react-toastify";
import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"
import AssentialPoint from "../../../assets/images/assentialPoint.png"
import EmptyImage from "../../../assets/images/emptyImage.png"
import TextField from "../../components/login/TextField.js";
import { useEffect, useState } from "react";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import NonoToast from "../../components/common/toast/Toast";
import Modal from "../../components/common/modal/Modal";
import Dialog from "../../components/common/modal/Dialog";
import UtilAPI from "../../../apis/etc/util";
import ProductAPI from "../../../apis/product/Product";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Utils from "../../../features/utils/Utils";
import { selectedProduct } from "../../../features/product/productSlice";
import ChangePasswordModal from "../../components/login/ChangePasswordModal";
import { changePassword } from "../../../features/login/LoginSlice";

const ProductEdit = () => {
    const [productName, setProductName] = useState("");
    const [isValidProductName, updateValidProductName] = useState(true);
    const [productImageName, setProductImageName] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [productDescription, setProductDescription] = useState("");
    const [productBarCode, setProductBarCode] = useState("");
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
    const [productStock, setProductStock] = useState(0);
    const [productInputPrice, setProductInputPrice] = useState(0);
    const [productOutputPrice, setProductOutputPrice] = useState(0);
    const [isEnableSaveButton, updateEnableSaveButton] = useState(false);
    const [isOpenSaveProductConfirm, updateOpenSaveProductConfirm] = useState(false);
    const [productActiveType, setProductActiveType] = useState(true);

    const productSaveTypeList = [
        { value: "선택", code: "NONE" },
        { value: "실온", code: "ROOM" },
        { value: "냉장", code: "COLD" },
        { value: "냉동", code: "ICE" }
    ]

    const productCategoryList = [
        "선택",
        "운영물품",
        "식료품",
        "화성용",
        "본부물품",
        "소모품",
        "기타"
    ]

    const productActiveTypeList = [
        { value: "활성", code: true },
        { value: "비활성", code: false }
    ]

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedProductItem = useSelector((state) => state.product.selectedItem);
    const changePasswordModalFlag = useSelector((state) => state.login.changePasswordModalFlag);

    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken")
        if (accessToken === "" || accessToken === null) {
            window.location.replace("/login");
        } else {
            const fetchData = async () => {
                if (await Utils.checkToken()) {
                    console.log(selectedProductItem)
                    const productId = selectedProductItem.productId;
                    if (productId !== null) {
                        const response = await ProductAPI.getProductItem(productId);
                        console.log(response);
                        if (response.isSuccess) {
                            dispatch(selectedProduct(response.data))
                        } else {
                            NonoToast.error("페이지에 오류가 있어 목록 페이지로 이동합니다.");
                            await Utils.timeout(1000);
                            window.location.href = "/product/list";
                        }
                    }
                } else {
                    console.log("token expired");
                    NonoToast.error("로그인 유효기간이 만료되었습니다.");
                    await Utils.timeout(1000);
                    window.location.replace("/login");
                }
            }
            fetchData();
        }
        console.log(selectedProductItem);
    }, []);

    useEffect(() => {
        onChangeProductName(selectedProductItem.name);
        setProductDescription(selectedProductItem.description);
        onChangeProductCode(selectedProductItem.productCode);
        setProductCategorySelection(selectedProductItem.category);
        productCategoryValidation(selectedProductItem.category);
        setProductSaveTypeSelection(selectedProductItem.storageType);
        productSaveTypeValidation(selectedProductItem.storageType);
        onChangeProductUnit(selectedProductItem.unit);
        onChangeProductMaker(selectedProductItem.maker);
        onChangeProductStock(selectedProductItem.stock);
        onChangeProductInputPrice(selectedProductItem.inputPrice);
        onChangeProductOutputPrice(selectedProductItem.outputPrice);
        if (selectedProductItem.barcode === "") {
            setProductBarCode(null);
        } else {
            setProductBarCode(selectedProductItem.barcode);
        }
        setProductActiveType(selectedProductItem.active);
        updateSaveButtonValidation();

        console.log(isValidProductName);
        console.log(isValidProductCode);
        console.log(isValidProductUnit);
        console.log(isValidProductCategory);
        console.log(isValidProductSaveType);
        console.log(isValidProductMaker);
        console.log(isEnableSaveButton);
        console.log(productImage);

    }, [selectedProductItem]);

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

    const confirmSaveProduct = async () => {
        updateOpenSaveProductConfirm(false);

        if (productImage != null) {
            const uploadImageResponse = await UtilAPI.uploadImage(productImage);
            if (uploadImageResponse.isSuccess) {
                var fileId = uploadImageResponse.data.imageId;
                console.log(fileId)
                if (fileId == undefined) {
                    fileId = null
                }
                var barcodeType = selectedProductItem.barcodeType
                console.log(barcodeType)
                if (barcodeType == undefined) {
                    barcodeType = null
                }

                const response = await ProductAPI.updateProduct(
                    selectedProductItem.productId,
                    productCode,
                    productName,
                    productDescription,
                    productCategory,
                    productMaker,
                    productUnit,
                    productSaveType,
                    productStock,
                    productInputPrice,
                    productOutputPrice,
                    productActiveType,
                    selectedProductItem.barcode,
                    barcodeType,
                    fileId);

                if (response.isSuccess) {
                    NonoToast.success("물품 정보를 수정하였습니다.");
                    await Utils.timeout(1000);
                    window.location.href = "/product/list";

                } else {
                    NonoToast.error("물품 정보 수정에 실패했습니다.");
                    console.log(response.errorMessage);
                }
            } else {
                NonoToast.error("물품 정보 수정에 실패했습니다.");
                console.log("image upload fail");
            }
        } else {
            var image = selectedProductItem.image;
            console.log(image)
            if (image == undefined || image == null) {
                image = null
            }
            var barcode = selectedProductItem.barcode
            console.log(barcodeType)
            if (barcode == undefined) {
                barcode = null
            }
            var barcodeType = selectedProductItem.barcodeType
            console.log(barcodeType)
            if (barcodeType == undefined) {
                barcodeType = null
            }
            const response = await ProductAPI.updateProduct(
                selectedProductItem.productId,
                productCode,
                productName,
                productDescription,
                productCategory,
                productMaker,
                productUnit,
                productSaveType,
                productStock,
                productInputPrice,
                productOutputPrice,
                productActiveType,
                barcode,
                barcodeType,
                image);

            if (response.isSuccess) {
                NonoToast.success("물품 정보를 수정하였습니다.");
                await Utils.timeout(1000);
                window.location.href = "/product/list";
            } else {
                NonoToast.error("물품 정보 수정에 실패했습니다.");
                console.log(response.errorMessage);
            }
        }
    }

    const getSelectedImage = (image) => {
        if (image === null || image === undefined) {
            return EmptyImage
        } else {
            const getThumbnailUrl = image.thumbnailUrl;
            if (getThumbnailUrl === null) {
                return EmptyImage;
            } else {
                return image.thumbnailUrl;
            }
        }
    }

    const onChangeProductActiveTypeSelection = (event) => {
        setProductActiveType(event.target.value);
    }
    const onCloseChangePasswordModal = () => {
        dispatch(changePassword(false));
    }
    return (
        <div>
            <ToastContainer />
            <Modal isOpen={isOpenSaveProductConfirm}>
                <Dialog title="물품 저장"
                    contents="저장 하시겠습니까?"
                    warning={false}
                    onCancel={canceledSaveProduct}
                    confirm={confirmSaveProduct} />
            </Modal>
            <Modal isOpen={changePasswordModalFlag} onClose={onCloseChangePasswordModal}>
                <ChangePasswordModal
                    onClickClose={onCloseChangePasswordModal} />
            </Modal>
            <div className="page">
                <Sidebar value="/product/list" />
                <div className="contentsPage">
                    <Header title="물품 수정"
                        desc="물품을 수정합니다." />
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
                                <img src={productImage ?? getSelectedImage(selectedProductItem.image)}
                                    className="productImageItem"
                                    id="productImage" />
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
                                        value={productName}
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
                                        value={productDescription}
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
                                        value={productCode}
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
                                    <span>{productBarCode ?? "바코드는 모바일 앱을 통해 추가가 가능합니다."}</span>
                                </div>
                            </li>
                            <li>
                                <div className="productActiveTypeTitleBox">
                                    <img src={AssentialPoint} className="assentialPointImage" />
                                    <span>활성화</span>
                                </div>
                                <div className="productActiveTypeSelectBox">
                                    <select className="productActiveTypeSelect"
                                        value={productActiveType ?? true}
                                        onChange={onChangeProductActiveTypeSelection}
                                        onBlur={updateSaveButtonValidation}>
                                        {
                                            productActiveTypeList.map((item, index) => {
                                                return (
                                                    <option key={"productActiveType" + index} value={item.code}>{item.value}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </li>
                            <li>
                                <div className="productCategoryTitleBox">
                                    <img src={AssentialPoint} className="assentialPointImage" />
                                    <span>물품 분류</span>
                                </div>
                                <div className="productCategorySelectBox">
                                    <select className="productCategorySelect"
                                        value={productCategory ?? "선택"}
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
                                        value={productSaveType ?? "NONE"}
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
                                        value={productUnit}
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
                                        value={productMaker}
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
                                        value={productStock}
                                        readOnly={true}
                                        // onChange={value => {
                                        //     onChangeProductStock(value);
                                        // }}
                                        onFocusOut={updateSaveButtonValidation}
                                        placeholder="재고 수량을 입력해 주세요!" />
                                </div>
                            </li>
                            <li>
                                <div className="productPriceTitleBox">
                                    <div className="assentialPointImage" />
                                    <span>기준 입고 금액</span>
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
                                    <span>기준 출고 금액</span>
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

export default ProductEdit;