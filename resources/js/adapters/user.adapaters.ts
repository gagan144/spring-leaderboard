import axios from "axios";
import {UserData} from "../types/user.types";

export const UserAdapter = {
    async getList(){
        return axios.get(
            '/api/users'
        ).then((response)=>{
            return response.data as UserData[];
        })
    },
    async addNewUser(
        name: string,
        email: string,
        age: number,
        address: string | null
    ){
        return axios.post(
            '/api/users/add',
            {
                name,
                email,
                age,
                address
            }
        ).then((response)=>{
            return response.data
        })
    },
    async updatePoints(
        userId: number,
        action: "increase" | "decrease"
    ){
        return axios.post(
            `/api/user/${userId}/update-points`,
            {
                action: action
            }
        ).then((response)=>{
            return response.data;
        })
    },
    async deleteUser(
        userId
    ){
        return axios.delete(
            `/api/users/${userId}`
        ).then((response)=>{
            return response.data;
        })
    }
}
