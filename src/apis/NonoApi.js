import axios from "axios";

const NonoAPI = () => {
    return axios.create({
    baseURL: "https://api.nonoflex.com:3000",
    headers: {
        Authorization : `Bearer ${sessionStorage.getItem("accessToken")}`
        }
});
}

export default NonoAPI;