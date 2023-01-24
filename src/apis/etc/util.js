import NonoAPI from "../NonoApi";

async function uploadImage(image) {
    try {
        var formData = new FormData();
        formData.append("imageFile", image);
        const response = await NonoAPI.post("/api/v1/product/image", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log(response.data);

        return {
            isSuccess: true,
            data: response.data
        }
    } catch (error) {
        return {
            isSuccess: false,
            errorCode: error.response.status,
            errorMessage: error.response.data.message
        };
    }
}

const UtilAPI = {
    uploadImage
}

export default UtilAPI;