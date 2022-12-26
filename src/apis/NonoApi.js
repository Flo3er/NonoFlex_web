import axios from "axios";

const NonoAPI = axios.create({
    baseURL: "https://api.nonoflex.com",
    headers: {
        Authorization : `Bearer ${sessionStorage.getItem("accessToken")}`
        }
});

export default NonoAPI;