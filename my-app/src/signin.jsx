import React, { useState } from 'react'
import {auth}  from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to store error message

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            const user = userCredential.user;
            sessionStorage.setItem('token', user.accessToken);
            sessionStorage.setItem('user', JSON.stringify(user));
            navigate("/");
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center align-items-center vh-100 py-5">
                    <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                        <div className="card card-body text-center p-4 p-sm-5">
                            <h1 className="mb-2">Sign in</h1>
                            <p className="mb-0">Don't have an account? <Link to="/signup">Click here to sign up</Link>
                            </p>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit} className='login-form mt-sm-4'>
                                <div className="mb-3 input-group-lg">
                                    <input type="email"
                                           className="form-control"
                                           placeholder="Enter email"
                                           required
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 position-relative">
                                    <div className="input-group input-group-lg">
                                        <input className="form-control fakepassword" type="password" id="psw-input"
                                               placeholder="Enter new password"
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span className="input-group-text p-0">
                                        <i className="fakepasswordicon fa-solid fa-eye-slash cursor-pointer p-2 w-40px"></i>
                                    </span>
                                    </div>
                                </div>
                                <div className="mb-3 d-sm-flex justify-content-between">
                                    <div>
                                        <input type="checkbox" className="form-check-input" id="rememberCheck"/>
                                        <label className="form-check-label" htmlFor="rememberCheck">Remember me?</label>
                                    </div>
                                    <Link to="/forgot-password">Forgot password?</Link>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-lg btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin