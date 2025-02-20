import React from 'react';
import axios from "axios";

import {UserData} from "../types/user.types";
import {UserAdapter} from "../adapters/user.adapaters";

export const LeaderBoard:React.FC = (props) => {

    // States
    const [data, setData] = React.useState<UserData[]>();

    // On Mount
    React.useEffect(()=>{
        UserAdapter.getList().then((data)=>{
            setData(data);
        })
    }, [])

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
};

export default LeaderBoard;
