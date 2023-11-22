import axios from 'axios';

// Define your API base URL
const baseURL = 'http://localhost:8081/api/sat-results/';

// Function to handle API requests for inserting data
export const insertDataApi = async (data) => {
  try {
    const response = await axios.post(`${baseURL}insert`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to view all data
export const viewAllDataApi = async () => {
    try {
      const response = await axios.get(`${baseURL}view-all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all data:', error);
      return [];
    }
  };

// Function to handle API requests for getting rank
export const getRankApi= async (name) => {
  try {
    const response = await axios.get(`${baseURL}rank?name=${name}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to handle API requests for updating score
export const updateScoreApi = async ({name, newSatScore}) => {
  try {
    const response = await axios.put(`${baseURL}update`,{name,newSatScore});
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to handle API requests for deleting a record
export const deleteRecordApi = async (name) => {
  try {
    const response = await axios.delete(`${baseURL}delete?name=${name}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
