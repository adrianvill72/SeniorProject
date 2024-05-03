import React from 'react';
import MyEvents from './myevents';
import HostInfo from './HostInfo';
import NavBar from "../../Homepage/NavBar";
const HostEvent = () => {

    return (
        <main>
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-8 vstack gap-4">
                        <NavBar/>
                        <HostInfo/>
                        <MyEvents/>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HostEvent;