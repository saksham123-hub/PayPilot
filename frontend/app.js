import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
// Correctly import ToastContainer
import { ToastContainer } from 'react-toastify';
// Import Toastify CSS
import 'react-toastify/dist/ReactToastify.css';
// Import checkRemindersAtTime
import { checkRemindersAtTime } from './api/ReminderService';
import Home from './components/Home';
import BillList from './components/BillList';



function App() {
    useEffect(() => {
        // Set interval to check every minute for the set reminder time
        const interval = setInterval(checkRemindersAtTime, 6000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="App">
            <Router>
                <div className="app-container">
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/show" element={<BillList />} />
                    </Routes>
                </div>
            </Router>
            <ToastContainer /> {/* ToastContainer for notifications */}
        </div>
    );
}

export default App;
