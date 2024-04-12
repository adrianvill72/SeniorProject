import React, { useState } from 'react'
import auth from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

function Signup(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            const user = userCredential.user;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            navigate("/signin");
        } catch (error) {
            console.error(error);
            setError(error.message); // Error message from Firebase or another error source
            setMessage('');
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center align-items-center vh-100 py-5">
                    <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                        <div className="card card-body rounded-3 p-4 p-sm-5">
                            <div className="text-center">
                                <h1 className="mb-2">Sign up</h1>
                                <span className="d-block">Already have an account? <Link
                                    to="/signin">Sign in here</Link></span>
                                {error && <div className="alert alert-danger">{error}</div>}
                                {message && <div className="alert alert-success">{message}</div>}
                            </div>
                            <form className="mt-4 signup-form" onSubmit={handleSubmit} >
                                <div className="mb-3 input-group-lg">
                                    <input type="email" className="form-control" placeholder="Enter email"
                                           required
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <small>We'll never share your email with anyone else.</small>
                                </div>
                                <div className="mb-3 position-relative">
                                    <div className="input-group input-group-lg">
                                        <input className="form-control" type="password" id="psw-input"
                                               placeholder="Enter new password"
                                               required
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span className="input-group-text p-0">
                                        <i className="fa-solid fa-eye-slash cursor-pointer p-2 w-40px"></i>
                                    </span>
                                    </div>
                                </div>
                                <div className="mb-3 input-group-lg">
                                    <input className="form-control" type="password" placeholder="Confirm password"/>
                                </div>
                                <div className="mb-3 text-start">
                                    <input type="checkbox" className="form-check-input" id="keepsingnedCheck"/>
                                    <label className="form-check-label" htmlFor="keepsingnedCheck">Keep me signed
                                        in</label>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="signup-button btn btn-lg btn-primary">Sign me up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup