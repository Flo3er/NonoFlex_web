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
            const response = await NonoAPI.get(
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
            const response = await NonoAPI.get(
                "/api/v1/product/" + productId + "/record",
                params
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

const ProductAPI = {
    getProductList, getRecordList
}

export default ProductAPI;