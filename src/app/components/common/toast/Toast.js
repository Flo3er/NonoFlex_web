import { toast } from "react-toastify"

function success(message) {
    toast.success(message, {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
        bodyClassName: "toastBody",
        hideProgressBar: true,
        closeButton: false,
        theme: "colored"
    });
}

function error(message) {
    toast.error(message, {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
        bodyClassName: "toastBody",
        hideProgressBar: true,
        closeButton: false,
        theme: "colored"
    });
}

const NonoToast = {
    success,
    error
}

export default NonoToast;