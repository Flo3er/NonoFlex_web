import NonoAPI from "../NonoApi";

async function getRecentNotice() {
    try {
        const response = await NonoAPI.get(
            "/api/v1/notice/recent", {}
        );

        console.log(response.data);
        return {
            isSuccess: true,
            data: response.data
        };

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
        const response = await NonoAPI.delete("/api/v1/notice/" + noticeId, {});
        return {
            isSuccess: true,
            data: response.data
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
    editNotice
}

export default NoticeAPI;