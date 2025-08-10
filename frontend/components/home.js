import React from 'react';
import "../assets/Home.css"
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();


    const handleClick = () => {
        navigate(`/bill/add`);
    };
    return (
        <div className="landing-page">
            <header>
                <div className="container">
                    <a href="/" className="logo">Pay <b>Pilot</b></a>
                </div>
            </header>
            <div className="content">
                <div className="container">
                    <div className="info">
                        <h1>Paypilot streamlines the process of tracking and paying your bills. Centralizes due dates, payment amounts, and account details, providing timely reminders and notifications to help you avoid late fees...</h1>
                        <p className='para'>ADD YOUR FIRST BILL</p>
                        <button className='addbtn' onClick={handleClick}>Add</button>
                    </div>
                    {/* <div className="image">
                        <img src="https://i.postimg.cc/26rYXvdd/billpaypilot.png" alt="Inspiration" />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Home;
