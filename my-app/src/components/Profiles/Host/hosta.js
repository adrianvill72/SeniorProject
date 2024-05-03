import React from 'react';
import VendorApp from './vendorapp';
import HostInfo from './HostInfo';
import NavBar from "../../Homepage/NavBar";
const HostApp = () => {
    return (
        <main>
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-8 vstack gap-4">
                        <NavBar/>
                        <HostInfo />
                        <VendorApp />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HostApp;