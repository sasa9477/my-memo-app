
import axios from "axios";
import aspida from "@aspida/axios"
import api from "../apis/$api";

const axiosClient = axios.create({
  baseURL: '/api/'
})

const apiClient = api(aspida(axiosClient))

export default apiClient