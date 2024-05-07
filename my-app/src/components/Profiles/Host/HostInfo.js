import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {getDatabase,  update ,ref} from "firebase/database";

import { useParams } from 'react-router-dom';
const HostInfo = ({ user, onComponentSwitch  }) => {
    const [editMode, setEditMode] = useState(false);
    const { userId } = useParams();
    const profileImage = user?.profileImage || "assets/images/avatar/default.jpg";
    const currentUser=useAuth().user;
    let currentUserID=null;
    if(currentUser){
        currentUserID=currentUser.uid;
    }
    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
    };

    if (editMode) {
        return <EditProfilePage user={user} onCancel={handleCancel} />;
    }

    return (
        <div className="card">
            <div
                className="h-200px rounded-top"
                style={{
                    backgroundImage: `url(/assets/images/bg/05.jpg)`,
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
                                src={profileImage}
                                alt={user?.name || "Profile"}
                            />
                        </div>
                    </div>
                    <div className="ms-sm-4 mt-sm-3">

                        <h1 className="mb-0 h5">

                            {user?.name} {user?.isHost ?
                            <i className="bi bi-patch-check-fill text-success small"></i> : null}
                        </h1>
                        <i className="bi bi-briefcase me-1"> Host</i>
                        <p><div className="bold-label">About Me: {user?.aboutMe || "Update your profile to add more information."}</div>
                            <div>Contact Me: {user?.email ? <a href={`mailto:${user.email}`}>{user.email}</a> : "Update your profile to add more information."}</div>
                        </p>

                    </div>
                    <div className="d-flex mt-3 justify-content-center ms-sm-auto">
                        {user && currentUserID === userId && (
                        <button className="btn btn-danger-soft me-2" type="button" onClick={handleEditClick}>
                            <i className="bi bi-pencil-fill pe-1"></i> Edit profile
                        </button>
                            )}
                    </div>

                </div>
                <div className="card-footer pt-2 pb-0">
                    <div className="d-flex ">
                        <button className="btn btn-secondary-soft btn-sm mb-2 me-2" onClick={() => onComponentSwitch(false)}>
                            Show {user.name}'s Events
                        </button>

                        <button className="btn btn-secondary-soft btn-sm mb-2 me-2" onClick={() => onComponentSwitch(true)}>
                            Show Vendor Applications
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EditProfilePage = ({onCancel}) => {
    const db = getDatabase();
    const {user} = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [aboutMe, setAboutMe] = useState(user?.aboutMe || '');
    const [profileImage, setProfileImage] = useState(user?.profileImage || "assets/images/avatar/default.jpg");

    useEffect(() => {
        setName(user?.name || '');
        setEmail(user?.email || '');
        setAboutMe(user?.aboutMe || '');
        setProfileImage(user?.profileImage || "assets/images/avatar/default.jpg");
    }, [user]);

    const handleSave = async () => {
        const updatedUserData = {name, email, aboutMe, profileImage};

        // Reference to the Realtime Database path for the user
        const userRef = ref(db, 'users/' + user.uid);

        try {
            // Update the user information in Realtime Database
            await update(userRef, updatedUserData);

            alert('Profile updated successfully.');
            window.location.reload();
            onCancel(); // Close the modal or navigate away
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            console.log("No file selected.");
            return;
        }
        const storage = getStorage();
        const storageReference = storageRef(storage, `users/${user.uid}/${file.name}`);
        try {
            const snapshot = await uploadBytes(storageReference, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            setProfileImage(downloadURL);
        } catch (error) {
            console.error("Error uploading image: ", error);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h2>Edit Your Profile</h2>
                <button onClick={onCancel} className="close-button">Close</button>
            </div>
            <div className="card-body">
                <form onSubmit={e => {
                    e.preventDefault();
                    handleSave();
                }}>
                    <div className="form-group">
                        <label htmlFor="profileImage">Profile Image</label>
                        <input type="file" className="form-control" onChange={handleImageChange}/>
                        <div style={{margin: '10px 0'}}>
                            <img src={profileImage} alt="Profile"
                                 style={{width: '100px', height: '100px', borderRadius: '50%'}}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" value={name}
                               onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" value={email}
                               onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="aboutMe">About Me</label>
                        <textarea className="form-control" id="aboutMe" rows="3" value={aboutMe}
                                  onChange={e => setAboutMe(e.target.value)}/>
                    </div>

                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default HostInfo;
