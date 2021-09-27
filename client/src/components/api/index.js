import axios from 'axios'
const API = axios.create({  baseURL: 'http://localhost:5000'})

export const login = (body) => API.post("/api/login", body)
export const register = (body) => API.post("/api/register", body)
export const getUsers = () => API.get("/user/getUsers")
export const getUser = (user) => API.get(`/user/getUser/${user}`)
export const editUser = (body) => API.put(`/user/editUser`, body)

export const getEval = () => API.get('/eval')
