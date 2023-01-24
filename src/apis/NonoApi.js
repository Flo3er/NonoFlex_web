import axios from "axios";

const NonoAPI = axios.create({
    baseURL: "http://3.39.53.3:3000",
    headers: {
        Authorization : `Bearer ${sessionStorage.getItem("accessToken")}`
        }
});

export default NonoAPI;