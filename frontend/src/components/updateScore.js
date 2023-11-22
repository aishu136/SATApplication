import React , { useState }from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { updateScoreApi } from './api';
import { Button, TextField, Grid, Typography, Container,Box,Snackbar, Alert } from '@mui/material';

// Define validation schema using Yup
const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  newSatScore: yup.number().required('New SAT Score is required'),
});

const UpdateScore = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const formik = useFormik({
    initialValues: {
      name: '',
      newSatScore: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await updateScoreApi(values);
        console.log('Score updated successfully:', response);
        setSuccessMessage(`Record with name ${values.name} has been updated.`);
      } catch (error) {
        //console.error('Error updating score:', error);
        if (error.response && error.response.status === 404) {
          setErrorMessage('Name not found');
        } else {
          setErrorMessage('Error updating SAT score');
        }
        setOpenSnackbar(true);
  
      }
    },
  });
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
                Update Data
      </Typography>
      <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
         <Grid item xs={12} sm={6}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          {...formik.getFieldProps('name')}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          label="New SAT Score"
          variant="outlined"
          fullWidth
          {...formik.getFieldProps('newSatScore')}
          error={formik.touched.newSatScore && Boolean(formik.errors.newSatScore)}
          helperText={formik.touched.newSatScore && formik.errors.newSatScore}
        />
        </Grid>
        </Grid>
        <Box mt={2}>
        <Button variant="contained" color="primary" type="submit">
          Update Score
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
};

export default UpdateScore;
