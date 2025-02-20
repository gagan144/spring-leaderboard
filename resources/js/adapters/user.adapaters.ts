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
