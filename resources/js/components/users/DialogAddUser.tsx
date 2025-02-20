import React from 'react';
import { Formik } from "formik";
import * as yup from "yup";
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Button,
    TextField,
    Typography,
} from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {UserAdapter} from "../../adapters/user.adapaters";

type DialogAddUserProps = {
    isOpen: boolean;
    onClose: any;
    onSuccess: () => void;
}

const DialogAddUser: React.FC<DialogAddUserProps> = (props) => {
    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            fullScreen={false}
            scroll={"paper"}
            open={props.isOpen}
            // onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle
                id="alert-dialog-title"
                sx={{ display: "inline-flex", fontSize: "1.2rem" }}
            >
                Add New User

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
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        age: "",
                        address: ""
                    }}
                    validationSchema={yup.object({
                        name: yup
                            .string()
                            .required("Information Required"),
                        email: yup
                            .string().email()
                            .matches(
                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                "Invalid Email"
                            )
                            .required("Information Required"),
                        age: yup.number()
                            .min(10, "Age should be greater than 10.")
                            .required("Information Required"),
                        address: yup
                            .string()
                            .notRequired()
                    })}
                    onSubmit={(values)=>{
                        // alert(JSON.stringify(values));
                        UserAdapter.addNewUser(
                            values.name,
                            values.email,
                            values.age,
                            values.address || null
                        ).then((data)=>{
                            props.onSuccess();
                        }).catch((error)=>{
                            alert("Error adding user:\n"+JSON.stringify(error.response.data))
                        })
                    }}
                >
                    {({
                          touched,
                          values,
                          errors,
                          handleChange,
                          setFieldValue,
                          isValid,
                          handleSubmit,
                          submitForm
                      }) => {
                        return (
                            <form noValidate name="form_add_user">
                                <TextField
                                    id="name"
                                    type="text"
                                    name="name"
                                    label={"Name *"}
                                    size="small"
                                    fullWidth
                                    value={values.name}
                                    onChange={handleChange}
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name as string}
                                />

                                <TextField
                                    id="email"
                                    type="email"
                                    name="email"
                                    label={"Email *"}
                                    size="small"
                                    fullWidth
                                    value={values.email}
                                    onChange={handleChange}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email as string}
                                    sx={{mt:2}}
                                />

                                <TextField
                                    id="age"
                                    type="number"
                                    name="age"
                                    label={"Age *"}
                                    size="small"
                                    fullWidth
                                    value={values.age}
                                    onChange={handleChange}
                                    error={touched.age && Boolean(errors.age)}
                                    helperText={touched.age && errors.age as string}
                                    sx={{mt:2}}
                                />

                                <TextField
                                    id="address"
                                    type="text"
                                    name="address"
                                    label={"Address (Optional)"}
                                    size="small"
                                    multiline
                                    minRows={4}
                                    fullWidth
                                    value={values.address}
                                    onChange={handleChange}
                                    error={touched.address && Boolean(errors.address)}
                                    helperText={touched.address && errors.address as string}
                                    sx={{mt:2}}
                                />

                                {!isValid && (
                                    <Typography color="error" align={"center"} sx={{ mt: 2 }}>
                                        Please complete the form
                                    </Typography>
                                )}

                                <Box sx={{mt:2}}>
                                    <Button
                                        fullWidth
                                        type="button"
                                        color="primary"
                                        variant="contained"
                                        onClick={async (evt) => {
                                            submitForm();
                                        }}
                                    >
                                        Add User
                                    </Button>
                                </Box>

                            </form>
                        )
                    }}
                </Formik>


            </DialogContent>
        </Dialog>
    )
}

export default DialogAddUser;
