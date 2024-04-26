import React from 'react';
import MyEvents from './myevents';
import HostInfo from './HostInfo';
const HostEvent = () => {
    return (
        <main>
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-8 vstack gap-4">
                        <HostInfo />
                        <MyEvents />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HostEvent;