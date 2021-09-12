import axios from 'axios'
const API = axios.create({  baseURL: 'http://localhost:5000'})

export const login = (body) => API.post("/api/login", body)
export const register = (body) => API.post("/api/register", body)
export const getUsers = () => API.get("/get/getUsers")
export const getUser = (user) => API.get(`/get/getUser?${user}`)