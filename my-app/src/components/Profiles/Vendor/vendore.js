import React from 'react';
import MyEventsvendor from './vendor_events';
import VendorInfo from './VendorInfo';
const VendorEvent = () => {
    return (
        <main>
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-8 vstack gap-4">
                        <VendorInfo />
                        <MyEventsvendor />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default VendorEvent;