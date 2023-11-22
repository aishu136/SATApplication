import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Snackbar,Alert } from '@mui/material';
import { viewAllDataApi } from './api';

const ViewAll = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await viewAllDataApi();
        setData(result);
        console.log(result);
      } catch (error) {
        //console.error('Error fetching data:', error);
        if (error.response && error.response.status === 500) {
          setErrorMessage('Error connecting to the database');
        } else {
          setErrorMessage('Error getting data');
        }
        setOpenSnackbar(true);
      }
    };

    // Call fetchData function here
    fetchData();
  }, []); // Add an empty dependency array to run the effect only once
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <div>
      <h1>View All Data</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Pincode</TableCell>
              <TableCell>SAT Score</TableCell>
              <TableCell>Passed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.pincode}</TableCell>
                <TableCell>{row.satScore}</TableCell>
                <TableCell>{row.passed ? 'Passed' : 'Failed'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert elevation={6} variant="filled" severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ViewAll;
