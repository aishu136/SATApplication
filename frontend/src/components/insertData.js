import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Grid, Typography, Container,Box,Snackbar,Alert  } from '@mui/material';
import { insertDataApi } from './api';
import { useNavigate } from 'react-router-dom';


const InsertData = () => {
    const [errorMessage,setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [successMessage, setSuccessMessage] = useState('');
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
            city: '',
            country: '',
            pincode: '',
            satScore: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is Required.'),
            address: Yup.string().required('Address is Required.'),
            city: Yup.string().required('City is Required.'),
            country: Yup.string().required('Country is Required.'),
            pincode: Yup.string().required('Pincode is Required.'),
            satScore: Yup.number().typeError('SAT score must be a number.').required('Required').min(1, 'Must be greater than or equal to 1').max(1600,'Must be lesser than 1600'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await insertDataApi(values);
                console.log(response.data);
                setSuccessMessage("Data is successfully inserted")
                //window.location.href = "/view-All";
                setTimeout(() => {
                    navigate('/view-All');
                  }, 2000);
            } catch (error) {
                 if(error.response && error.response.status === 400){
                //console.log('Error submitting form:', error);
                setErrorMessage(error.response.data);
                 }else{
                    setErrorMessage('Error inserting data');
                 }
                 setOpenSnackbar(true);
            }
        },
    });
    const handleCloseSnackbar = () =>{
        setOpenSnackbar(false);
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h5" gutterBottom>
                Insert Data
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            id="name"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Address"
                            variant="outlined"
                            id="address"
                            name="address"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address&& formik.errors.address}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="City"
                            variant="outlined"
                            id="city"
                            name="city"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.city}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Country"
                            variant="outlined"
                            id="country"
                            name="country"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.country}
                            error={formik.touched.country && Boolean(formik.errors.country)}
                            helperText={formik.touched.country && formik.errors.country}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Pincode"
                            variant="outlined"
                            id="pincode"
                            name="pincode"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.pincode}
                            error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                            helperText={formik.touched.pincode && formik.errors.pincode}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="SAT Score"
                            variant="outlined"
                            id="satScore"
                            name="satScore"
                            type="number"  // Set the type to "number" for numeric input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.satScore}
                            error={formik.touched.satScore && Boolean(formik.errors.satScore)}
                            helperText={formik.touched.satScore && formik.errors.satScore}
                        />
                    </Grid>
                </Grid>
                <Box mt={2}>
                <Button type="submit" variant="contained" color="primary" mt={3}>
                    Submit
                </Button>
                </Box>
            </form>
            {successMessage && (
        <Typography variant="body1" color="success" mt={2}>
          {successMessage}
        </Typography>
      )}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert elevation={6} variant="filled" severity="error">
                    {errorMessage}
                </Alert>
           </Snackbar>
        </Container>
    );
}

export default InsertData;
