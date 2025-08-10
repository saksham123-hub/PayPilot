import React, { useEffect, useState } from 'react';
import { getAllBills } from '../api/BillService';
import BillCard from './BillCard';
import { Form, Row, Col } from 'react-bootstrap';

const BillList = () => {
    // State to hold the list of bills
    const [bills, setBills] = useState([]);
    const [filteredBills, setFilteredBills] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minAmount, setMinAmount] = useState('');
    const [maxAmount, setMaxAmount] = useState('');

    // Fetch bills from the API when the component mounts
    useEffect(() => {
        const fetchBills = async () => {
            try {
                // Fetch all bills from the API
                const response = await getAllBills();
                // Update state with the fetched bills
                setBills(response);
                setFilteredBills(response);
            } catch (error) {
                console.error('Error fetching bills:', error);
            }
        };

        fetchBills();
    }, []); //runs once when the component mounts

    useEffect(() => {
        let updatedBills = bills;

        if (selectedCategory) {
            updatedBills = updatedBills.filter(bill => bill.billCategory === selectedCategory);
        }

        if (minAmount) {
            updatedBills = updatedBills.filter(bill => bill.amount >= parseFloat(minAmount));
        }

        if (maxAmount) {
            updatedBills = updatedBills.filter(bill => bill.amount <= parseFloat(maxAmount));
        }

        setFilteredBills(updatedBills);
    }, [selectedCategory, minAmount, maxAmount, bills]);

    return (
        <div className="bill-list bills-container" style={{ width: "50%", margin: "20px auto" }}>
            <h2 className="my-4" style={{ textAlign: "center" }}>All Bills</h2>
            {/* Filter Section */}
            <Form style={{ marginBottom: '20px' }}>
                <Row className="align-items-center">
                    <Col md={4}>
                        <Form.Group controlId="categorySelect">
                            <Form.Label>Search by Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="custom-select"
                            >
                                <option value="">All Categories</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Rent">Rent</option>
                                <option value="Groceries">Groceries</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Insurance">Insurance</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Education">Education</option>
                                <option value="Other">Other</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    {/* Amount Filter */}
                    <Col md={3}>
                        <Form.Group controlId="minAmount">
                            <Form.Label>Min Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Min"
                                value={minAmount}
                                onChange={(e) => setMinAmount(e.target.value)}
                                className="custom-input"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="maxAmount">
                            <Form.Label>Max Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Max"
                                value={maxAmount}
                                onChange={(e) => setMaxAmount(e.target.value)}
                                className="custom-input"
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>

            {/* Display filtered bills */}
            {filteredBills.length > 0 ? (
                filteredBills.map((bill) => (
                    <BillCard key={bill.billId} bill={bill} />
                ))
            ) : (
                <p style={{ textAlign: 'center' }}>No bills found matching the criteria.</p>
            )}
        </div>
    );
};

export default BillList;
