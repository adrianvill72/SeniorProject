import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

const useFetchUser = (userId) => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        if (!userId || userId.length === 0) {
            setUserDetails([]);
            return;
        }

        const db = getDatabase();
        const userRef = ref(db, `users/${userId}`);

        const unsubscribe = onValue(userRef, (snapshot) => {
            setUserDetails(snapshot.val());
        }, {
            onlyOnce: true
        });

        return () => unsubscribe();
    }, [userId]);

    return userDetails;
};

export default useFetchUser;