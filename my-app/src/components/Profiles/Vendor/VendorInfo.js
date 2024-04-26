import React from 'react';
import { Link } from 'react-router-dom';

const VendorInfo = () => {
    return (
        <div className="card">
            <div
                className="h-200px rounded-top"
                style={{
                    backgroundImage: "url(assets/images/bg/05.jpg)",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}
            ></div>
            <div className="card-body py-0">
                <div className="d-sm-flex align-items-start text-center text-sm-start">
                    <div>
                        <div className="avatar avatar-xxl mt-n5 mb-3">
                            <img
                                className="avatar-img rounded-circle border border-white border-3"
                                src="assets/images/avatar/07.jpg"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="ms-sm-4 mt-sm-3">
                        <h1 className="mb-0 h5">
                            Sam Lanson <i className="bi bi-patch-check-fill text-success small"></i>
                        </h1>
                        <p>250 connections</p>
                    </div>
                    <div className="d-flex mt-3 justify-content-center ms-sm-auto">
                        <button className="btn btn-danger-soft me-2" type="button">
                            <i className="bi bi-pencil-fill pe-1"></i> Edit profile
                        </button>
                    </div>
                </div>
                <ul className="list-inline mb-0 text-center text-sm-start mt-3 mt-sm-0">
                    <li className="list-inline-item">
                        <i className="bi bi-briefcase me-1"></i> Lead Developer
                    </li>
                    <li className="list-inline-item">
                        <i className="bi bi-geo-alt me-1"></i> New Hampshire
                    </li>
                    <li className="list-inline-item">
                        <i className="bi bi-calendar2-plus me-1"></i> Joined on Nov 26, 2019
                    </li>
                </ul>
            </div>
            <div className="card-footer mt-3 pt-2 pb-0">
                <ul className="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/vendor-events">
                            Attending Events
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/vendor-products">
                            Products
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default VendorInfo;