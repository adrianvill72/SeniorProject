import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, createRoutesFromElements,Route,RouterProvider} from "react-router-dom";
import Signup from "./signup"
import Signin from "./signin"
import Protected from "./Protected";
import Home from "./home";
import HostEvent from "./components/Profiles/Host/hostp";
import HostApp from "./components/Profiles/Host/hosta";
import VendorEvent from "./components/Profiles/Vendor/vendore";
import VendorProductsPage from "./components/Profiles/Vendor/vendorp";



const router= createBrowserRouter(
    createRoutesFromElements(

            <Route path={"/"} element={<App />}>
            <Route path="signup" element={<Signup/>}/>
            <Route path="signin" element={<Signin/>}/>
            <Route path="/" element={<Protected/>}/>
            <Route path="/" index element={<Home/>}/>
            <Route path="/profile" element={<HostEvent/>}/>
            <Route path="/applications" element={<HostApp/>}/>
            <Route path="/vendor-events" element={<VendorEvent/>}/>
            <Route path='/vendor-products' element={<VendorProductsPage/>}/>

            </Route>

    )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
