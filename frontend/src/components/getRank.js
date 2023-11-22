import React,{ useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getRankApi } from './api';
import { Button, TextField, Grid, Typography, Container,Box, Snackbar, Alert } from '@mui/material';

// Define validation schema using Yup
const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
});

const DisplayRank = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [rank,setRank]= useState(null);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await getRankApi(values.name);
        setRank(response.rank)
        console.log(`Rank: for ${values.name}:${response.rank}`, rank);
      } catch (error) {
        //console.error('Error fetching rank:', error);
        if (error.response && error.response.status === 404) {
          setErrorMessage('Name not found');
        } else {
          setErrorMessage('Error getting rank');
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
                Get the Rank
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
          Get Rank
        </Button>
        </Box>
        <Box mt={5}>
        <Button>
          {rank!== null && <p>Rank: {rank}</p>}
        </Button>
        </Box>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert elevation={6} variant="filled" severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      </form>
    </Container>
  );
};

export default DisplayRank;
