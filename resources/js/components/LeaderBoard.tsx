import React from 'react';
import {
    Box,
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Typography,
    IconButton,
    Stack,
    Chip,
    Button,
    Card,
    CardContent,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

import {UserData, UsersByScoreData} from "../types/user.types";
import {UserAdapter} from "../adapters/user.adapaters";
import DialogAddUser from "./users/DialogAddUser";
import DialogUserDetails from "./users/DialogUserDetails";

export const LeaderBoard:React.FC = (props) => {

    // States
    const [listUsers, setListUsers] = React.useState<UserData[]>([]);
    const [dataUsersByScores, setDataUsersByScores] = React.useState<UsersByScoreData>({});
    const [selectedUser, setSelectedUser] = React.useState<UserData>();

    const [isOpenAddUser, setIsOpenAddUser] = React.useState<boolean>(false);
    const [isOpenUserDetails, setIsOpenUserDetails] = React.useState<boolean>(false);

    // On Mount
    React.useEffect(()=>{
        getUsers();
        getReportUsersByScores();
    }, []);

    // Methods
    const getUsers = () => {
        UserAdapter.getList().then((data)=>{
            setListUsers(data);
        }).catch((error)=>{
            alert("Error fetching users:\n"+JSON.stringify(error.response.data))
        })
    }

    const getReportUsersByScores = ()=>{
        UserAdapter.reports.usersByScores().then((data)=>{
            setDataUsersByScores(data);
        })
    }

    // Events
    const OnUpdateUserPoints = (user: UserData, isIncrease: boolean) => {
        UserAdapter.updatePoints(
            user.id,
            isIncrease?"increase":"decrease"
        ).then((data)=>{
            getUsers();
        }).catch((error)=>{
            alert("Error updating points:\n"+JSON.stringify(error.response.data))
        })
    }

    const onDeleteUser = (user: UserData) => {
        if(confirm("Are you sure you want to remove this user?")){
            UserAdapter.deleteUser(user.id).then((data)=>{
                getUsers();
            }).catch((error)=>{
                alert("Error deleting user:\n"+JSON.stringify(error.response.data))
            });
        }
    }

    return (
        <Box>
            <Table size="small">
                <TableBody>
                    {
                        listUsers.map((user: UserData, idx: number)=> {
                            return <TableRow key={idx}>
                                <TableCell>
                                    <IconButton color="error" onClick={(evt)=>{
                                        onDeleteUser(user);
                                    }}>
                                        <DeleteOutlineRoundedIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{cursor: "pointer"}}
                                        onClick={(evt)=>{
                                            setSelectedUser(user);
                                            setIsOpenUserDetails(true);
                                        }}
                                    >
                                        {user.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <IconButton
                                            color="warning"
                                            onClick={(evt)=>OnUpdateUserPoints(user, false)}
                                            disabled={user.points===0}
                                        >
                                            <RemoveCircleOutlineRoundedIcon />
                                        </IconButton>
                                        <IconButton color="success" onClick={(evt)=>OnUpdateUserPoints(user, true)}>
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
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddRoundedIcon />}
                    onClick={(evt)=>{
                        setIsOpenAddUser(true);
                    }}
                >
                    Add User
                </Button>

                {
                    isOpenAddUser && (
                        <DialogAddUser
                            isOpen={isOpenAddUser}
                            onClose={()=>{setIsOpenAddUser(false)}}
                            onSuccess={()=>{
                                setIsOpenAddUser(false);
                                getUsers();
                            }}
                        />
                    )
                }
            </Box>

            <Grid container sx={{mt:3, mb:3}}>
                <Grid size={6}>
                    <Card>
                        <CardContent>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <InsightsRoundedIcon sx={{mr: 1}} />
                                    <Typography fontWeight={600}>
                                        Users Grouped by Scores
                                    </Typography>
                                </Stack>
                                <IconButton onClick={(evt)=> getReportUsersByScores()}>
                                    <RefreshRoundedIcon />
                                </IconButton>
                            </Stack>

                            <Table size="small" sx={{mt:1}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Score</TableCell>
                                        <TableCell>Names</TableCell>
                                        <TableCell>Average Age</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        Object.entries(dataUsersByScores)
                                            .sort(([pointA], [pointB]) => Number(pointB) - Number(pointA))
                                            .map(([points, details]) => (
                                            <TableRow>
                                                <TableCell>
                                                    <Typography>{points}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography>{details.names.join(", ")}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography>{details.average_age}</Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/*----- Dialogs -----*/}
            {
                (selectedUser && isOpenUserDetails) && (
                    <DialogUserDetails
                        user={selectedUser}
                        isOpen={isOpenUserDetails}
                        onClose={()=>{
                            setSelectedUser(undefined);
                            setIsOpenUserDetails(false);
                        }}
                    />
                )
            }
            {/*----- Dialogs -----*/}
        </Box>
    );
};

export default LeaderBoard;
