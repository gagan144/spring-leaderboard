import axios from "axios";

export const UserAdapter = {
    async getList(){
        return axios.get(
            '/api/users'
        ).then((response)=>{
            return response.data;
        })
    }
}
