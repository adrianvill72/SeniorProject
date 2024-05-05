import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from './firebase'; // Assuming you export AuthContext from your firebase.js or a similar file
const Protected = () => {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Assuming your AuthProvider updates the user state on auth state changes
        setIsLoading(false); // You might want to handle loading state more precisely based on your auth logic
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>; // Loading state while checking user
    }

    return (
        user ? <Outlet/> : <Navigate to="/"/>
    );
};

export default Protected;