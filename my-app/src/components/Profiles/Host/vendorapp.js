import React from 'react';

const VendorApp = () => {
    return (
        <div className="card">
            {/* Card header START */}
            <div className="card-header border-0 pb-0">
                <h5 className="card-title">Connections</h5>
            </div>
            {/* Card header END */}
            {/* Card body START */}
            <div className="card-body">
                {/* Connections Item */}
                <div className="d-md-flex align-items-center mb-4">
                    {/* Avatar */}
                    <div className="avatar me-3 mb-3 mb-md-0">
                        <a href="#!">
                            <img className="avatar-img rounded-circle" src="assets/images/avatar/01.jpg" alt="" />
                        </a>
                    </div>
                    {/* Info */}
                    <div className="w-100">
                        <div className="d-sm-flex align-items-start">
                            <h6 className="mb-0">
                                <a href="#!">Lori Ferguson</a>
                            </h6>
                            <p className="small ms-sm-2 mb-0">Full Stack Web Developer</p>
                        </div>
                     
                    </div>
              <div>
                
              </div>
                    {/* Button */}
                    <div className="ms-md-auto d-flex">
                        <button className="btn btn-danger-soft btn-sm mb-0 me-2">Remove</button>
                        <button className="btn btn-primary-soft btn-sm mb-0">Accept</button>
                    </div>
                </div>
                
            </div>
            {/* Card body END */}
        </div>
    );
};

export default VendorApp;