import React from 'react';
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Chip
} from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

import {UserData} from "../../types/user.types";

type DialogUserDetailsProps = {
    user: UserData;
    isOpen: boolean;
    onClose: any;
}

const DialogUserDetails: React.FC<DialogUserDetailsProps> = (props) => {
    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            fullScreen={false}
            scroll={"paper"}
            open={props.isOpen}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle
                id="alert-dialog-title"
                sx={{ display: "inline-flex", fontSize: "1.2rem" }}
            >
                <PersonRoundedIcon sx={{ mr: 1 }} />
                User Details

                <IconButton
                    aria-label="close"
                    onClick={props.onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseRoundedIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box>
                    <Typography fontWeight={600}>Name:</Typography>
                    <Typography>{props.user.name}</Typography>
                </Box>

                <Box sx={{mt: 2}}>
                    <Typography fontWeight={600}>Email:</Typography>
                    <Typography>{props.user.email}</Typography>
                </Box>

                <Box sx={{mt: 2}}>
                    <Typography fontWeight={600}>Age:</Typography>
                    <Typography>{props.user.age}</Typography>
                </Box>

                <Box sx={{mt: 2}}>
                    <Typography fontWeight={600}>Address:</Typography>
                    <Typography>{props.user.address || "-"}</Typography>
                </Box>

                <Box sx={{mt: 2}}>
                    <Typography fontWeight={600}>Points:</Typography>
                    <Chip color="info" label={props.user.points} />
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default DialogUserDetails;
