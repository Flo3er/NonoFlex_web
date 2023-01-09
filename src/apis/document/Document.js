import Utils from "../../features/utils/Utils";
import NonoAPI from "../NonoApi";

async function getDocumentList(query, column, order, page) {
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
                "/api/v1/document", {
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
        console.log(error.response.data)
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        }
    }
}

async function getDocument(documentId) {
    try {
        if (await Utils.checkToken()) {
            const response = await NonoAPI.get(
                "/api/v1/document/" + documentId
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
        console.log(error.response.data)
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        }
    }
}

async function createTempDocument(date, type, companyId, recordList) {
    try {
        if (await Utils.checkToken()) {
            console.log(date.toISOString());
            const response = await NonoAPI.post(
                "/api/v1/document/temp",
                {
                    date: date,
                    type: type,
                    companyId: companyId,
                    recordList: recordList
                }
            )
            console.log(response.data)
            return {
                isSuccess: true,
                data: response.data
            }
        } else {
            window.location.replace("/login");
        }
    } catch (error) {
        console.log(error.response.data)
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        }
    }
}

async function createDocument(date, type, companyId, recordList) {
    try {
        if (await Utils.checkToken()) {
            const response = await NonoAPI.post(
                "/api/v1/document",
                {
                    date: date,
                    type: type,
                    companyId: companyId,
                    recordList: recordList
                }
            )
            console.log(response.data)
            return {
                isSuccess: true,
                data: response.data
            }
        } else {
            window.location.replace("/login");
        }
    } catch (error) {
        console.log(error.response.data)
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        }
    }
}

async function extractDocument(year, month) {
    const params = {
        year: year,
        month: month,
    };
    try {
        if (await Utils.checkToken()) {
            const response = await NonoAPI.get(
                "/api/v1/document/excel",
                {
                    params
                }
            )
            console.log(response.data)
            return {
                isSuccess: true,
                data: response.data
            }
        } else {
            window.location.replace("/login");
        }
    } catch (error) {
        console.log(error.response.data)
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        }
    }
}

const DocumentAPI = {
    getDocumentList, getDocument, createTempDocument, createDocument, extractDocument
}

export default DocumentAPI;