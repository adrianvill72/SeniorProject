import React, { useState } from 'react'
import {auth}  from './firebase';
import {sendPasswordResetEmail, signInWithEmailAndPassword, setPersistence, browserLocalPersistence,browserSessionPersistence   } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import {getAuth} from "firebase/auth";
import NavBar from "./components/Homepage/NavBar";

const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to store error message
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
        try {
            await setPersistence(auth, persistenceType);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");  // Navigate to the home page or dashboard after successful login
        } catch (error) {
            console.error(error);
            setError(error.message);  // Show user-friendly error messages
        }
    }

    const handleResetPassword = async () => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email sent! Check your inbox.');
            })
            .catch((error) => {
                setError(error.message);
            });
    };
    return (
        <div>
            <NavBar/>
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
                                    </div>
                                </div>
                                <div className="mb-3 d-sm-flex justify-content-between">
                                    <div>
                                        <input type="checkbox"
                                               className="form-check-input"
                                               id="rememberCheck"
                                               checked={rememberMe}
                                               onChange={() => setRememberMe(!rememberMe)}
                                        />
                                        <label className="form-check-label" htmlFor="rememberCheck">Remember me?</label>
                                    </div>
                                    <Link to="#" onClick={handleResetPassword} className="text-small">
                                        Forgot password?
                                    </Link>
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