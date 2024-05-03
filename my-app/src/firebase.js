import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getDatabase, onValue} from "firebase/database";
import { ref} from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyB407uFF7J_X9Z9RAcqA6jaa57ohtwvpjA",
    authDomain: "loma-5a9be.firebaseapp.com",
    projectId: "loma-5a9be",
    storageBucket: "loma-5a9be.appspot.com",
    messagingSenderId: "411479983979",
    appId: "1:411479983979:web:4178573bdee782f1dfae2e",
    measurementId: "G-9T85KMS39F",
    databaseURL: "https://loma-5a9be-default-rtdb.firebaseio.com/",
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db =getDatabase(app)
export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                // Fetch additional user data from Firebase
                const userProfileRef = ref(db, 'users/' + authUser.uid);
                onValue(userProfileRef, (snapshot) => {
                    if (auth.currentUser) { // Check if user is still authenticated
                        if (snapshot.exists()) {
                            const userDetails = snapshot.val();
                            setUser({
                                ...authUser,
                                ...userDetails // Merge auth user object with database user details
                            });
                            console.log("Snapshot: ", snapshot.val())
                        } else {
                            setUser(authUser); // No additional details found, use default auth user
                        }
                    }
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {

        return <div>Loading...</div>; // Or whatever loading state you want to show
    }
    return (
        <AuthContext.Provider value={{ user,setUser  }}>
            {children}
        </AuthContext.Provider>
    );

};
export const SignOutUser=async ()=>{
    try {
        await auth.signOut();
        console.log("Sign Out Successful")
    } catch (e){
        console.error("Error: ", e);
    }
}
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);



