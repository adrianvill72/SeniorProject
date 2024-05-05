import React, {useState} from 'react';
import MyEventsvendor from './vendor_events';
import VendorInfo from './VendorInfo';
import NavBar from "../../Homepage/NavBar";
import VendorProducts from "./vendor_products";
import ProductCard from "./vendor_products";
const VendorEvent = ({ user }) => {
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
                        <VendorInfo user={user} onComponentSwitch={handleComponentSwitch} />
                        {activeComponent === false ? <MyEventsvendor user={user} /> : <ProductCard user={user} />}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default VendorEvent;