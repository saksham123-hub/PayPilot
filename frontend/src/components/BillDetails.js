import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBillById, deleteBillById } from '../api/BillService';
import { addReminderWithoutBillId } from '../api/ReminderService';
import { Button, Card, Form, Alert } from 'react-bootstrap';


const BillDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bill, setBill] = useState(null);
    const [error, setError] = useState('');
    const [showReminderForm, setShowReminderForm] = useState(false);
    const [newReminder, setNewReminder] = useState({
        reminderFrequency: '',
        reminderStartDate: '',
        customMessage: '',
        notificationPref: '',
    });
    const [reminderError, setReminderError] = useState('');

    // function to fetch bill using id
    useEffect(() => {
        getBillById(id)
            .then((response) => {
                setBill(response.data);
            })
            .catch((error) => {
                console.error('Error fetching bill details:', error);
                setError('Error fetching bill details');
            });
    }, [id]);

    //function to handle delete bill
    const handleDelete = () => {
        deleteBillById(id)
            .then(() => {
                alert('Bill deleted successfully');
                navigate('/show');
            })
            .catch((error) => {
                console.error('Error deleting bill:', error);
                alert('Failed to delete bill');
            });
    };

    // function to edit a bill
    const handleEdit = () => {
        navigate(`/bill/update/${id}`);
    };

    //function to add a reminder
    const handleAddReminder = async () => {
        if (!validateReminder()) return;

        try {
            const reminderWithBillId = { ...newReminder, billId: id };
            await addReminderWithoutBillId(reminderWithBillId);
            setNewReminder({
                reminderFrequency: '',
                reminderStartDate: '',
                customMessage: '',
                notificationPref: '',
            });
            setReminderError('');
            alert('Reminder added successfully');
            setShowReminderForm(false);
        } catch (error) {
            console.error('Error adding reminder:', error);
            alert('Error adding reminder');
        }
    };

    const handlePay = (e) => {

        navigate(`/paynow/${id}`);


    }

    // Validation function for reminder setting
    const validateReminder = () => {
        const today = new Date().toISOString().slice(0, 10);

        if (!newReminder.reminderFrequency || !newReminder.reminderStartDate || !newReminder.customMessage || !newReminder.notificationPref) {
            setReminderError('All fields are required');
            return false;
        }

        if (newReminder.reminderStartDate < today) {
            setReminderError('Start date cannot be in the past');
            return false;
        }

        setReminderError('');
        return true;
    };


    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (!bill) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bill-details" style={{ width: '50%', margin: '20px auto' }}>
            <h2 className="my-4" style={{ textAlign: 'center' }}>Bill Details</h2>
            <Card>
                <Card.Body>
                    <Card.Title>{bill.billName}</Card.Title>
                    <Card.Text>
                        <strong>Category:</strong> {bill.billCategory}
                    </Card.Text>
                    <Card.Text>
                        <strong>Due Date:</strong> {new Date(bill.dueDate).toLocaleDateString()}
                    </Card.Text>
                    <Card.Text>
                        <strong>Amount:</strong> ₹{bill.amount.toFixed(2)}
                    </Card.Text>
                    {bill.notes && (
                        <Card.Text>
                            <strong>Notes:</strong> {bill.notes}
                        </Card.Text>
                    )}
                    <Card.Text>
                        <strong>Recurring:</strong> {bill.isRecurring === 'T' ? 'Yes' : 'No'}
                    </Card.Text>
                    <Card.Text>
                        <strong>Payment Status:</strong> {bill.paymentStatus}
                    </Card.Text>
                    <Button variant="primary" onClick={handleEdit} className="me-2">
                        Edit Bill
                    </Button>
                    <Button variant="danger" onClick={handleDelete} className="me-2">
                        Delete
                    </Button>
                    <Button variant="success" onClick={handlePay} className="me-2">
                        Pay Now
                    </Button>
                    <Button variant="info" onClick={() => setShowReminderForm(!showReminderForm)}>
                        {showReminderForm ? 'Cancel' : 'Add Reminder'}
                    </Button>


                    {showReminderForm && (
                        <Form className="mt-3">
                            {reminderError && <Alert variant="danger">{reminderError}</Alert>}
                            <Form.Group controlId="reminderFrequency">
                                <Form.Label>Reminder Frequency</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={newReminder.reminderFrequency}
                                    onChange={(e) =>
                                        setNewReminder({ ...newReminder, reminderFrequency: e.target.value })
                                    }
                                >
                                    <option value="" disabled>Select Frequency</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="reminderStartDate" className="mt-2">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Start Date"
                                    value={newReminder.reminderStartDate}
                                    onChange={(e) =>
                                        setNewReminder({ ...newReminder, reminderStartDate: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="customMessage" className="mt-2">
                                <Form.Label>Custom Message</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Custom Message"
                                    value={newReminder.customMessage}
                                    onChange={(e) =>
                                        setNewReminder({ ...newReminder, customMessage: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="notificationPref" className="mt-2">
                                <Form.Label>Notification Preference</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={newReminder.notificationPref}
                                    onChange={(e) =>
                                        setNewReminder({ ...newReminder, notificationPref: e.target.value })
                                    }
                                >
                                    <option value="" disabled>Select Notification Preference</option>
                                    <option value="Mail">Mail</option>
                                    <option value="SMS">SMS</option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant="success" onClick={handleAddReminder} className="mt-2">
                                Add Reminder
                            </Button>

                        </Form>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default BillDetails;
