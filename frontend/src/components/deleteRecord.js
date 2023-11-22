import React,{ useState} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { deleteRecordApi } from './api';
import { Button, TextField, Grid, Box, Typography, Container,Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Define validation schema using Yup
const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
});

const DisplayDelete = () => {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await deleteRecordApi(values.name);
        console.log('Record deleted successfully');
        setSuccessMessage(`Record with name ${values.name} has been deleted.`);
        setTimeout(() => {
          navigate('/view-All');
        }, 2000);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setErrorMessage('Name not found');
        } else {
          setErrorMessage('Error deleting data');
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
                Delete a Record
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
        </Grid>
        <Box mt={2}>
        <Button variant="contained" color="primary" type="submit" mt={3}>
          Delete Record
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

export default DisplayDelete;
