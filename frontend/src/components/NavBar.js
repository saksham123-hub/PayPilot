
import React from 'react';
import { Nav, Navbar, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

const NavBar = () => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Pay Pilot
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/bill/add">Add Bill</Nav.Link>
                        {/* Dropdown for Bills */}
                        <NavDropdown title="Bills" id="bills-dropdown">
                            <NavDropdown.Item as={Link} to="/show">
                                All Bills
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/upcoming">
                                Upcoming Bills
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/overdue">
                                Overdue Bills
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/reminder-settings">
                            Reminder Settings
                        </Nav.Link>
                        <Nav.Link as={Link} to="/snooze-bills">
                            Snooze Bills
                        </Nav.Link>
                        <Nav.Link as={Link} to="/bill-overview">
                            Bill Overview
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/notifications">
                            <BsBellFill size={20} />
                        </Nav.Link>
                        {/* Change path to profile */}
                        <Nav.Link as={Link} to="/">
                            <FaUser size={20} />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
