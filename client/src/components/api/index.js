import axios from 'axios'
const API = axios.create({  baseURL: 'http://localhost:5000'})

export const login = (body) => API.post("/api/login", body)
export const register = (body) => API.post("/api/register", body)
export const getUsers = () => API.get("/user/getUsers")
export const getUser = (user) => API.get(`/user/getUser/${user}`)
export const editUser = (body) => API.put(`/user/editUser`, body)
export const getEval = () => API.get('/eval')

// need to define
export const getUserCount = () => API.get("/user/getUserCount")
export const postSession = (body) => API.post("/session/postSession", body)
export const getSessions = () => API.get("/session/getSessions")
export const addUserSession = (body) => API.put('/user/addSession', body)