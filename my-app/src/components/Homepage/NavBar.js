import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {useAuth,SignOutUser}  from '../../firebase';


const GuestNavBar = () => {
    return  (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                {/*<a className="navbar-brand" href="/">*/}
                {/*    <img src="" alt="logo" style={{ width: 30, height: 30 }} />*/}
                {/*</a>*/}<small className="navbar-brand">Loma</small>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signin">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Register</Link>
                        </li>
                    </div>
                </div>
            </div>
        </nav>
    );
}
const UserNavBar = () => {
    const userToken = sessionStorage.getItem('token');
    console.log("User Token: ",userToken)
    const {user} = useAuth();
    const profileLink = user.isHost ? "/Host_profile" : "/Temp";
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">

                <a className="navbar-brand" href="/">
                    Loma
                </a>

                <button className="navbar-toggler ms-auto icon-md btn btn-light p-0" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                        aria-label="Toggle navigation">
                </button>

                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav navbar-nav-scroll ms-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="postMenu" data-bs-toggle="dropdown"
                               aria-haspopup="true" aria-expanded="false">Account </a>
                            <ul className="dropdown-menu" aria-labelledby="postMenu">
                                {user.isVendor && (
                                    <li><Link className="dropdown-item" to="/Temp">Create Store</Link></li>
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
                <ul className="nav flex-nowrap align-items-center ms-sm-3 list-unstyled">
                    <li className="nav-item ms-2 dropdown">
                        <a className="nav-link btn icon-md p-0" href="#" id="profileDropdown" role="button"
                           data-bs-auto-close="outside" data-bs-display="static" data-bs-toggle="dropdown"
                           aria-expanded="false">
                            <img className="avatar-img rounded-2" src={user.profileImage} alt=""/>
                        </a>
                        <ul className="dropdown-menu dropdown-animation dropdown-menu-end pt-3 small me-md-n3"
                            aria-labelledby="profileDropdown">
                            <li className="px-3">
                                <div className="d-flex align-items-center position-relative">
                                    <div className="avatar me-3">
                                        <img className="avatar-img rounded-circle" src={user.profileImage}
                                             alt="avatar"/>
                                    </div>
                                    <div>
                                        <a className="h6 stretched-link" href="#">{user.name}</a>
                                        <p className="small m-0">{user.isHost ? "Host" : "Vendor"}</p>
                                    </div>
                                </div>
                                <Link to={profileLink} className="dropdown-item btn btn-primary-soft btn-sm my-2 text-center">
                                    View profile
                                </Link>
                            </li>
                            <li className="dropdown-divider"></li>
                            <button className="dropdown-item bg-danger-soft-hover" onClick={SignOutUser}>
                                Sign Out</button>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

const NavBar = () => {
    const {user} = useAuth();

    return(
        <div>
            {user ? < UserNavBar/> : < GuestNavBar/>}
        </div>
    )
}
export default NavBar;