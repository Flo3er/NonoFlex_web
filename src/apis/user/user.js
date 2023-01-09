import Utils from "../../features/utils/Utils";
import NonoAPI from "../NonoApi";

async function getUserList(query, page) {
    const params = {
        query: query,
        page: page,
        size: 1000
    };

    if (await Utils.checkToken()) {
        try {
            const response = await NonoAPI.get("/api/v1/user/", {
                params
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
        window.location.replace("/login");
    }
}

async function updateUserItem(userId, userName, isActive) {
    if (await Utils.checkToken()) {
        try {
            const response = await NonoAPI.put("/api/v1/user/" + userId, {
                userName: userName,
                active: isActive
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
        window.location.replace("/login");
    }
}

async function deleteUserItem(userId) {
    if (await Utils.checkToken()) {
        try {
            const response = await NonoAPI.delete("/api/v1/user/" + userId,);

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
        window.location.replace("/login");
    }
}

async function createUserItem(userName) {
    if (await Utils.checkToken()) {
        try {
            const response = await NonoAPI.post("/api/v1/user/", {
                userName: userName
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
        window.location.replace("/login");
    }
}

const UserAPI = {getUserList, updateUserItem, deleteUserItem, createUserItem}

export default UserAPI;