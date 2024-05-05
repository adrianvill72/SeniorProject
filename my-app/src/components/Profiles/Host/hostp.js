import React, { useState } from 'react';
import MyEvents from './myevents';
import HostInfo from './HostInfo';
import NavBar from "../../Homepage/NavBar";
import VendorApp from './vendorapp';
const HostEvent = ({ user }) => {
    const [activeComponent, setActiveComponent] = useState(true);
    const handleComponentSwitch = (componentName) => {
        setActiveComponent(!componentName);
    }
    return (
        <main>
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-8 vstack gap-4">
                        <NavBar/>
                        <HostInfo user={user} onComponentSwitch={handleComponentSwitch} />
                        {activeComponent === true ? <MyEvents user={user} /> : <VendorApp user={user} />}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HostEvent;