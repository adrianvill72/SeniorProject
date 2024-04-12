import React from 'react';
import {signOut} from "firebase/auth"
import {Link, useNavigate} from "react-router-dom";
import EventPage from './components/homepage/EventPage';

const Home = () => {
    const navigate=useNavigate()
    return (
        <div>
            HOME welcome!
            <p>Need to Login? <Link to="/signin">Login</Link></p>
            <p>Need to Signup? <Link to="/signup">Create Account</Link></p>
             <EventPage />
        </div>
    );
};

export default Home;