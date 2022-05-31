import { IInventory } from "../interface/project.interface"
import axiosService from "./axios.service"

const getAllInventories = () : Promise<IInventory[]> => {
    return axiosService.get("inventory/get/all")
        .then(res => {
            return res.data.inventories
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

export const inventoryService =  {
    getAllInventories
}