import { IUser } from "../interface/user.interface"
import axiosService from "./axios.service"

const login = (email : string, password : string) :  Promise<IUser>=> {
    return axiosService.post("/auth/login", {email, password})
    .then (res => {
        localStorage.setItem("token", res.data.accessToken)
        return res.data.user
    })
    .catch (err => {
        console.error(err);
        return Promise.reject(err)
    }) 
}
const logout  = () => {
    localStorage.removeItem("token")
}

export const authService = {
    login,
    logout
}