import axios from 'axios';
import { toast } from 'react-toastify';

/** 
 * Author: Samriddh Singh
 * Date: 10-Sept-2024
 * File: ReminderService.js
 * Description: This file contains functions for handling HTTP requests to manage bills,
 * including retrieving an overview of bills, adding new bills, getting all bills, 
 * getting a bill by its ID, deleting a bill, updating a bill, and fetching upcoming and overdue bills.
 **/

// Base URL of your Spring Boot backend
const BASE_URL = 'http://localhost:8081/api/reminder';

// Function to fetch all reminders
export const fetchReminders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/show`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reminders:', error);
    toast.error('Failed to fetch reminders.', {
      position: "top-right",
      autoClose: 5000,
    });
    throw error;
  }
};

// Function to add a new reminder with a success notification
export const addReminder = async (reminder) => {
  try {
    const response = await axios.post(`${BASE_URL}/add`, reminder);
    console.log('Reminder added successfully:', response.data);
    toast.success('Reminder added successfully!', {
      position: "top-right",
      autoClose: 5000,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding reminder:', error);
    toast.error('Failed to add reminder. Please try again.', {
      position: "top-right",
      autoClose: 5000,
    });
    throw error;
  }
};

// Function to update an existing reminder
export const updateReminder = async (reminder) => {
  try {
    await axios.put(`${BASE_URL}/update`, reminder);
    toast.success('Reminder updated successfully!', {
      position: "top-right",
      autoClose: 5000,
    });
  } catch (error) {
    console.error('Error updating reminder:', error);
    toast.error('Failed to update reminder.', {
      position: "top-right",
      autoClose: 5000,
    });
    throw error;
  }
};

// Function to delete a reminder by ID
export const deleteReminder = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/delete/${id}`);
    toast.success('Reminder deleted successfully!', {
      position: "top-right",
      autoClose: 5000,
    });
  } catch (error) {
    console.error('Error deleting reminder:', error);
    toast.error('Failed to delete reminder.', {
      position: "top-right",
      autoClose: 5000,
    });
    throw error;
  }
};

// Function to clear all reminders
export const clearReminders = async () => {
  try {
    await axios.delete(`${BASE_URL}/clear`);
    toast.success('All reminders cleared successfully!', {
      position: "top-right",
      autoClose: 5000,
    });
  } catch (error) {
    console.error('Error clearing reminders:', error);
    toast.error('Failed to clear reminders.', {
      position: "top-right",
      autoClose: 5000,
    });
    throw error;
  }
};

// Function to add a reminder without billId
export const addReminderWithoutBillId = async (reminder) => {
  try {
    const response = await axios.post(`${BASE_URL}/add`, reminder);
    console.log('Reminder added successfully:', response.data);
    toast.success('Reminder added successfully!', {
      position: "top-right",
      autoClose: 5000,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding reminder:', error);
    toast.error('Failed to add reminder without Bill ID.', {
      position: "top-right",
      autoClose: 5000,
    });
    throw error;
  }
};

// Function to show notifications with custom messages from reminders
export const showNotification = (bills) => {
  bills.forEach((bill) => {
    if (bill.reminder && bill.reminder.length > 0) {
      const customMessages = bill.reminder.map((reminder) => reminder.customMessage).join(', ');
      toast.info(`Reminder: ${bill.billName} - ${customMessages}`, {
        position: "top-right",
        autoClose: 10000,
      });
    } else {
      toast.info(`Reminder: ${bill.billName} - No custom reminders available.`, {
        position: "top-right",
        autoClose: 10000,
      });
    }
  });
};

// Function to fetch reminders due today
export const fetchRemindersDueToday = async () => {
  try {
    const URL2 = 'http://localhost:8081/api/bill';
    const response = await axios.get(`${URL2}/today-bills`);
    const data = response.data;
    console.log("Data fetched: ", data);
    return data;
  } catch (error) {
    console.error('Error fetching reminders:', error);
    throw error;
  }
};

// New function to fetch today's reminders specifically for notifications
export const fetchRemindersForNotification = async () => {
  try {
    const reminders = await fetchRemindersDueToday();
    console.log(reminders);
    if (reminders.length > 0) {
      showNotification(reminders); // Show notifications for the fetched reminders
    } else {
      console.log("No reminders due today.");
    }
  } catch (error) {
    console.error('Error fetching reminders for notifications:', error);
    toast.error('Failed to fetch today\'s reminders for notifications.', {
      position: "top-right",
      autoClose: 5000,
    });
  }
};

// Function to check and fetch today's reminders at specific times (e.g., 5 PM)
export const checkRemindersAtTime = () => {
  const now = new Date();
  console.log(`Checking reminders at: ${now.toLocaleTimeString()}`);

  // Adjust time as needed (e.g., 17:00 for 5 PM)
  if (now.getHours() === 14 && now.getMinutes() === 58) {
    console.log("Trigger time reached. Fetching reminders for notification...");
    fetchRemindersForNotification();
  }
};
