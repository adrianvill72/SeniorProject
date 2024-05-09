import React, { useState } from 'react'
import {auth, db} from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { ref, set} from "firebase/database";
import NavBar from "./components/Homepage/NavBar";

function Signup(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isHost, setIsHost] = useState(false);
    const [isVendor, setIsVendor] = useState(false);
    const [name,setName]=useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User Created: ", userCredential);
            const user = userCredential.user;

            sessionStorage.setItem('token', user.accessToken);
            sessionStorage.setItem('user', JSON.stringify(user));
            const userProfileRef = ref(db, 'users/' + user.uid);
            await set(userProfileRef, {
                email: email,
                name: name, // Assumes 'name' is available in the scope
                isHost: isHost,   // Set from state
                isVendor: isVendor,
                aboutMe: "Update About Me.", // Assumes 'aboutMe' is defined in your form state or similar
                profileImage: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" // Assumes 'profileImageUrl' is defined
            });

            navigate("/");
        } catch (error) {
            console.error("Signup Error: ",error);
            setError(error.message); // Error message from Firebase or another error source
            setMessage('');
        }
    }

    return (
        <div>
            <NavBar/>
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
                            <form className="mt-4 signup-form" onSubmit={handleSubmit}>
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

                                    </div>
                                </div>
                                <div className="mb-3 position-relative">
                                    <div className="fw-semibold">Input Business Name:</div>
                                    <div className="input-group input-group-lg">
                                        <input className="form-control" type="text"
                                               placeholder="Business Name"
                                               required
                                               value={name}
                                               onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 text-start ">
                                    <input type="radio" className="form-check-input" name="role" value="host"
                                           id="keepsingnedCheck" onChange={() => { setIsHost(true); setIsVendor(false); }}/>
                                    <label className="form-check-label" htmlFor="keepsingnedCheck">Host</label>

                                    <input type="radio" className="form-check-input btn-space" value="vendor"
                                           name="role" id="keepsingnedCheck " onChange={() => { setIsHost(false); setIsVendor(true); }}
                                    />
                                    <label className="form-check-label " htmlFor="keepsingnedCheck"> Vendor</label>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="signup-button btn btn-lg btn-primary">Sign me up
                                    </button>
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