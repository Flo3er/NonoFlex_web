import axios from "axios";

const NonoAPI = () => {
    return axios.create({
    baseURL: "https://api.nonoflex.com",
    headers: {
        Authorization : `Bearer ${sessionStorage.getItem("accessToken")}`
        }
});
}

export default NonoAPI;