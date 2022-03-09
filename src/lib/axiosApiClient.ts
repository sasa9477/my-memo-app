import aspida from "@aspida/axios";
import axios from "axios";
import api from "../api/$api";

const baseURL = (() => {
    console.log(`process.env.serverURL : ${process.env.serverURL}`)
    if (process.env.serverURL) {
        return `${process.env.serverURL}/api/`
    }
    return "http://localhost:3000/api/"
})()

const axiosClient = axios.create({
    baseURL: baseURL
})

const axiosApiClient = api(aspida(axiosClient))

export default axiosApiClient