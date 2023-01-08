import axios from "axios";

const NonoAPI = axios.create({
    baseURL: "http://santa-house.tplinkdns.com:3000",
    headers: {
        Authorization : `Bearer ${sessionStorage.getItem("accessToken")}`
        }
});

export default NonoAPI;