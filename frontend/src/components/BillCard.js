import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/BillCard.css';

/**
 * Author: Sharvari
 * Date: 10-Sept-2024
 * File: BillCard.js
 * Description: 
 * This file contains the BillCard component, which is responsible for displaying 
 * individual bill details like bill name, amount, and category. It also navigates 
 * to the bill details page upon clicking the bill card. The card is styled based on 
 * whether the bill is overdue or upcoming.
 */

const BillCard = ({ bill }) => {
    const navigate = useNavigate();

    // Function to handle click event on the bill card
    const handleClick = () => {
        navigate(`/bill/${bill.billId}`);
    };

    // Determine the CSS class based on whether the bill is overdue or upcoming
    const cardClass = (bill.overdueDays > 0 && (bill.paymentStatus !== 'Paid'))
        ? 'bill-card overdue'
        : 'bill-card upcoming';

    return (
        <div className={cardClass} onClick={handleClick} >
            <h3 >{bill.billName}</h3>
            <p>Amount: {bill.amount}</p>
            <p>Category: {bill.billCategory}</p>
        </div>
    );
};

// Export the BillCard component
export default BillCard;
