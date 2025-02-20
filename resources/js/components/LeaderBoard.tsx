import React from 'react';
import {Box, Table, TableBody, TableCell, TableRow, Typography, IconButton, Stack, Chip, Button} from "@mui/material";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import {UserData} from "../types/user.types";
import {UserAdapter} from "../adapters/user.adapaters";

export const LeaderBoard:React.FC = (props) => {

    // States
    const [listUsers, setListUsers] = React.useState<UserData[]>([]);

    // On Mount
    React.useEffect(()=>{
        getUsers();
    }, []);

    // Methods
    const getUsers = () => {
        UserAdapter.getList().then((data)=>{
            setListUsers(data);
        })
    }

    // Events
    const updatePoints = (user: UserData, isIncrease: boolean) => {
        UserAdapter.updatePoints(
            user.id,
            isIncrease?"increase":"decrease"
        ).then((data)=>{
            getUsers();
        })
    }

    return (
        <Box>
            <Table size="small">
                <TableBody>
                    {
                        listUsers.sort((a:UserData,b:UserData)=>{return b.points > a.points?1:-1}).map((user: UserData, idx: number)=> {
                            return <TableRow key={idx}>
                                <TableCell>
                                    <IconButton color="error">
                                        <DeleteOutlineRoundedIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <Typography>{user.name}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <IconButton color="warning" onClick={(evt)=>updatePoints(user, false)}>
                                            <RemoveCircleOutlineRoundedIcon />
                                        </IconButton>
                                        <IconButton color="success" onClick={(evt)=>updatePoints(user, true)}>
                                            <AddCircleOutlineRoundedIcon />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Chip variant="filled" label={user.points} color="info"></Chip>
                                </TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>

            <Box sx={{mt:2}}>
                <Button variant="contained" color="primary" startIcon={<AddRoundedIcon />}>Add User</Button>
            </Box>

        </Box>
    );
};

export default LeaderBoard;
