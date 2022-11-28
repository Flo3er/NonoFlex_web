import Utils from "../../features/utils/Utils";
import NonoAPI from "../NonoApi";

async function getRecentNotice() {
    try {
        if (await Utils.checkToken()) {
            const response = await NonoAPI.get(
                "/api/v1/notice/recent", {}
            );
            console.log(response.data);
            return {
                isSuccess: true,
                data: response.data
            };
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

async function addNewNotice(title, body, isFocus) {
    try {
        if(await Utils.checkToken()) { 
        const response = await NonoAPI.post("/api/v1/notice", {
            title: title,
            content: body,
            focus: isFocus,
        });
        console.log(response.data)
        return {
            isSuccess: true,
            data: response.data
        }
    } else {
        window.location.replace("/login");
    }
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        }
    }
}

async function removeNotice(noticeId) {
    try {
        if(await Utils.checkToken()) {
        const response = await NonoAPI.delete("/api/v1/notice/" + noticeId, {});
        return {
            isSuccess: true,
            data: response.data
        }
    } else {
        window.location.replace("/login");
    }
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        }
    }
}

async function editNotice(noticeId, title, body, isFocus) {
    try {
        if(await Utils.checkToken()) {
        const response = await NonoAPI.put("/api/v1/notice/" + noticeId, {
            title: title,
            content: body,
            focus: isFocus,
        });
        console.log(response.data)
        return {
            isSuccess: true,
            data: response.data
        }
    } else {
        window.location.replace("/login");
    }
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        }
    }
}

async function getNoticeList(column, order, query, page) {
    try {
        const params = {
            content: true,
            // column: column,
            order: order,
            query: query,
            size: 20,
            page: page ?? 1
        };
        if (await Utils.checkToken()) {
        const response = await NonoAPI.get("/api/v1/notice", {
            params,
        });
        console.log(response.data)
        return {
            isSuccess: true,
            data: response.data
        }
    } else {
        window.location.replace("/login");
    }
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        }
    }
}

const NoticeAPI = {
    getRecentNotice,
    addNewNotice,
    removeNotice,
    editNotice,
    getNoticeList
}

export default NoticeAPI;