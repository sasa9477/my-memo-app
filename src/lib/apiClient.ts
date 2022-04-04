import api from "../apis/$api";
import axios from "axios";
import aspida from "@aspida/axios"

const axiosClient = axios.create({
  baseURL: process.env.API_BASE_URL
})

const apiClient = api(aspida(axiosClient))

export default apiClient