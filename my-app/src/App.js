import React from 'react';
import Signup from "./signup"
import {Outlet} from "react-router-dom";
import {AuthProvider} from "./firebase";
const App = () => {
    return (
        <div className="App">
            <AuthProvider>
                <Outlet/>
            </AuthProvider>
        </div>
    );
};

export default App;