import React from 'react';
import Signup from "./signup"
import {Outlet} from "react-router-dom";
const App = () => {
    return (
        <div className="App">
          <Outlet/>
        </div>
    );
};

export default App;