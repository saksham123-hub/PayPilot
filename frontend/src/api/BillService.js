import axios from "axios";

/** 
 * Author: Sharvari
 * Date: 10-Sept-2024
 * File: BillService.js
 * Description: This file handles the reminders management, including fetching, adding, updating, 
 * deleting reminders, as well as showing notifications for reminders with custom messages and 
 * fetching reminders due today.
**/


// Base URL for the API
const API_URL = "http://localhost:8081/api/bill";

// Function to get an overview of bills based on category, date range, and status
export async function getBillsOverview(category, fromDate, toDate, status) {
  try {
    const response = await axios.get(`${API_URL}/overview`, {
      params: {
        category: category, // Category of the bills
        fromDate: fromDate, // Start date for the overview
        toDate: toDate, // End date for the overview
        status: status, // Status of the bills (e.g., paid, unpaid)
      },
    });
    console.log("Response data:", response.data);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching bills overview:", error);
    throw error;
  }
}

export async function getReminderToday(){
  try{
    const response = await axios.get('http://localhost:8081/api/bill/today-bills')
    console.log(response.data[0]);
    return response.data[0];
  } catch(error){
    console.error("Error fetching todays' reminder", error);
    throw error;
  }
}

// Function to add a new bill
export const addBill = async (billData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, billData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add bill: " + error.message);
  }
};

// Function to get all bills
export const getAllBills = async () => {
  try {
    const response = await axios.get(`${API_URL}/show`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all bills:", error);
    throw error;
  }
};

// Function to get a bill by its ID
export const getBillById = (id) => axios.get(`${API_URL}/show/${id}`);

// Function to delete a bill by its ID
export const deleteBillById = (id) => axios.delete(`${API_URL}/delete/${id}`);

// Function to update a bill
export const updateBill = (updatedBill) =>
  axios.put(`${API_URL}/update`, updatedBill);

// Function to get upcoming bills
export const getUpcomingBills = async () => {
  try {
    const response = await axios.get(`${API_URL}/upcoming`);
    return response.data;
  } catch (error) {
    console.error("Error fetching upcoming bills:", error);
    throw error;
  }
};

// Function to get overdue bills
export const getOverdueBills = async () => {
  try {
    const response = await axios.get(`${API_URL}/overdue`);
    return response.data;
  } catch (error) {
    console.error("Error fetching overdue bills:", error);
    throw error;
  }
}; 