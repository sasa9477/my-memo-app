import aspida from "@aspida/axios";
import axios from "axios";
import api from "../api/$api";

const baseURL = (() => {
    if (process.env.NODE_ENV === 'production')
    {
        return '/api/'
    }

    return "http://localhost:3000/api/"
})()

const axiosClient = axios.create({
    baseURL: baseURL
})

const axiosApiClient = api(aspida(axiosClient))

export default axiosApiClient