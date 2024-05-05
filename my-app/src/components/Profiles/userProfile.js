import React from 'react';
import { useParams } from 'react-router-dom';// Ensure the correct path to your hook
import VendorEvent from "./Vendor/vendore";
import HostEvent from "./Host/hostp";
import useFetchUser from "../../hooks/useFetchUser";

const UserProfile = () => {
    const { userId } = useParams(); // Extract userId from URL
    const user = useFetchUser(userId); // Fetch user details using the hook

    if (!user) {
        return <div>Loading user details...</div>; // Handle loading and error states appropriately
    }

    // Conditionally render components based on user roles
    return (
        <>
            {user.isHost && <HostEvent user={user} />}
            {user.isVendor && <VendorEvent user={user} />}
        </>
    );
};

export default UserProfile;
