import aspida from "@aspida/axios";
import axios from "axios";
import api from "../api/$api";

const axiosClient = axios.create({
    baseURL: "http://localhost:3000/api/"
})

const axiosApiClient = api(aspida(axiosClient))

export default axiosApiClient