import Utils from "../../features/utils/Utils";
import NonoAPI from "../NonoApi";

async function getCompanyList(type, query, column, order, page) {
    const params = {
        query: query,
        column: column,
        order: order,
        size: 20,
        page: page ?? 1,
        active: false
    };
    if (await Utils.checkToken()) {
        try {
            if (type === "input") {
                const response = await NonoAPI().get("/api/v1/company/input",
                    {
                        params,
                    })
                console.log(response.data)
                return {
                    isSuccess: true,
                    data: response.data
                }
            } else if (type === "output") {
                const response = await NonoAPI().get("/api/v1/company/output", {
                    params,
                })
                console.log(response.data)
                return {
                    isSuccess: true,
                    data: response.data
                }
            } else {
                const response = await NonoAPI().get("/api/v1/company", {
                    params,
                })
                console.log(response.data)
                return {
                    isSuccess: true,
                    data: response.data
                }
            }
        } catch (error) {
            console.log(error.response.data)
            return {
                isSuccess: false,
                errorCode: error.response.status,
                errorMessage: error.response.data.message
            }
        }
    } else {
        window.location.href = "/login";
    }
}

async function updateCompanyInfo(id, name, type, category, active) {
    if (await Utils.checkToken()) {
        try {
            const response = await NonoAPI().put("/api/v1/company/" + id, {
                name: name,
                type: type,
                category: category,
                active: active,
            })

            console.log(response.data)
            return {
                isSuccess: true,
                data: response.data
            }

        } catch (error) {
            console.log(error.response.data)
            return {
                isSuccess: false,
                errorCode: error.response.status,
                errorMessage: error.response.data.message
            }
        }
    } else {
        window.location.href = "/login";
    }
}

async function deleteCompanyItem(id) {
    if (await Utils.checkToken()) {
        try {
            const response = await NonoAPI().delete("/api/v1/company/" + id)

            console.log(response.data)
            return {
                isSuccess: true,
                data: response.data
            }

        } catch (error) {
            console.log(error.response.data)
            return {
                isSuccess: false,
                errorCode: error.response.status,
                errorMessage: error.response.data.message
            }
        }
    } else {
        window.location.href = "/login";
    }
}

async function createCompanyItem(name, type, category) {
    if (await Utils.checkToken()) {
        try {
            const response = await NonoAPI().post("/api/v1/company/", {
                name: name,
                type: type,
                category: category
            });

            console.log(response.data)
            return {
                isSuccess: true,
                data: response.data
            }

        } catch (error) {
            console.log(error.response.data)
            return {
                isSuccess: false,
                errorCode: error.response.status,
                errorMessage: error.response.data.message
            }
        }
    } else {
        window.location.href = "/login";
    }
}

const CompanyAPI = {
    getCompanyList, updateCompanyInfo, deleteCompanyItem, createCompanyItem
}

export default CompanyAPI;