import Utils from "../../features/utils/Utils"
import NonoAPI from "../NonoApi"

async function getProductList(query, column, order, page) {
    try {
        const params = {
            query: query,
            column: column,
            order: order,
            size: 20,
            page: page ?? 1
        };
        if (await Utils.checkToken()) {
            const response = await NonoAPI().get(
                "/api/v1/product", {
                params,
            }
            );
            console.log(response.data)
            return {
                isSuccess: true,
                data: response.data
            }
        } else {
            window.location.replace("/login");
        }
    } catch (error) {
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        }
    }
}

async function getRecordList(productId, year, month) {
    var currentTime = new Date();
    try {
        const params = {
            year: year ?? currentTime.getFullYear(),
            month: month ?? currentTime.getMonth(),
        };
        if (await Utils.checkToken()) {
            console.log("month : " + params.month);
            const response = await NonoAPI().get(
                "/api/v1/product/" + productId + "/record",
                { params }
            );
            console.log(response.data);
            return {
                isSuccess: true,
                data: response.data
            }
        } else {
            window.location.replace("/login");
        }
    } catch (error) {
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        };
    }
}

async function addProduct(productCode, name, description, category, maker, unit, storageType, stock, inputPrice, outputPrice, imageId) {
    try {
        const response = await NonoAPI().post("/api/v1/product", {
            productCode: productCode,
            name: name,
            description: description,
            category: category,
            maker: maker,
            unit: unit,
            storageType: storageType,
            stock: stock,
            inputPrice: inputPrice,
            outputPrice: outputPrice,
            imageFileId: imageId
        });

        console.log(response.data);

        return {
            isSuccess: true,
            data: response.data
        };
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        };
    }
}

async function getProductItem(productId) {
    try {
        const response = await NonoAPI().get(
            "/api/v1/product/" + productId
        );

        console.log(response.data);
        return {
            isSuccess: true,
            data: response.data
        };
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        };
    }
}

async function updateProduct(
    productId,
    productCode,
    name,
    description,
    category,
    maker,
    unit,
    storageType,
    stock,
    inputPrice,
    outputPrice,
    activate,
    barcode,
    barcodeType,
    image) {
        console.log(productId + "|" + productCode + "|" +  name+ "|" +
        description + "|" + category + "|" + maker + "|" + unit + "|" +
        storageType + "|" + stock + "|" + inputPrice + "|" + outputPrice + "|" +
        activate + "|" + barcode + "|" + barcodeType + "|" + image);
    try {
        const response = await NonoAPI().put("/api/v1/product/" + productId, {
            productCode: productCode,
            name: name,
            description: description,
            category: category,
            maker: maker,
            unit: unit,
            storageType: storageType,
            stock: stock,
            inputPrice: inputPrice,
            outputPrice: outputPrice,
            active: activate,
            barcode: barcode,
            barcodeType: barcodeType,
            imageFileId: image
        });

        console.log(response.data);

        return {
            isSuccess: true,
            data: response.data
        };
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        };
    }
}

async function deleteProduct(productId) {
    try {
        const response = await NonoAPI().delete(
            "/api/v1/product/" + productId
        );

        console.log(response.data);
        return {
            isSuccess: true,
            data: response.data
        };
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        };
    }
}

const ProductAPI = {
    getProductList, getRecordList, addProduct, getProductItem, updateProduct, deleteProduct
}

export default ProductAPI;