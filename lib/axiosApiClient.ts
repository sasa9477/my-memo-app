import aspida from "@aspida/axios";
import axios from "axios";
import api from "../interfaces/$api";

const axiosClient = axios.create({
    baseURL: process.env.apiBaseURL
})

const axiosApiClient = api(aspida(axiosClient))

export default axiosApiClient