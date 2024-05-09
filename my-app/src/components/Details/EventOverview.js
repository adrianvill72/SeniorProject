import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../firebase';
import {getDatabase, ref, onValue, update, get} from "firebase/database";
import useFetchUser from '../../hooks/useFetchUser';

function EventOverview({ data }) {
    const event = useParams();
    const eventID = event["eventId"];
    const creatorDetails = useFetchUser(data.creator);
    const auth = useAuth();
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const participantsRef = ref(db, `events/${eventID}/participants`);

        onValue(participantsRef, (snapshot) => {
            const participantIDs = snapshot.val() ? Object.keys(snapshot.val()) : [];
            const allParticipants = [];
            participantIDs.forEach(id => {
                const userRef = ref(db, `users/${id}`);
                onValue(userRef, (userSnapshot) => {
                    if (userSnapshot.exists()) {
                        allParticipants.push({ id, ...userSnapshot.val() });
                        setParticipants([...allParticipants]);  // Update state each time a participant is fetched
                    }
                });
            });
        });
    }, [eventID]);

    if (!data || !creatorDetails) {
        return <div>Loading event details...</div>;
    }

    let isUserVendor = auth.user ? auth.user.isVendor : false;

    return (
        <section className="py-5">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-4">
                        <div className="card card-body">
                            {isUserVendor && <ApplyButton eventId={eventID} />}
                            <div className="mt-4">
                                <ul className="list-unstyled mb-4">
                                    <li className="d-flex justify-content-between mb-3">
                                        <strong className="w-150px">Show Date & Time:</strong>
                                        <span className="text-end">{data.date || 'Date not set'}</span>
                                    </li>
                                    <li className="d-flex justify-content-between mb-3">
                                        <strong className="w-150px">Address:</strong>
                                        <span className="text-end">{data.location || 'Address not available'}</span>
                                    </li>
                                </ul>
                                <h4>Vendors</h4>
                                {participants.map(participant => (
                                    <div className="card mb-3" key={participant.id}>
                                        <div className="card-body d-flex align-items-center">
                                            <div className="avatar">
                                                <img src={participant.profileImage || "https://via.placeholder.com/150"} className="avatar-img rounded-circle"  alt={participant.name} />
                                            </div>
                                            <div>
                                                <h6 className="mb-0">
                                                    <Link to={`/profile/${participant.id}`}>{participant.name}</Link>
                                                </h6>
                                                <small>{participant.title || 'Vendor'}</small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card card-body">
                            <h4>Description</h4>
                            <p>{data.description || 'No description available'}</p>
                            <div className="mt-4 mt-sm-5">
                                <h4>Host</h4>
                                <div className="d-flex align-items-center">
                                    <div className="avatar avatar-lg">
                                        <img src={creatorDetails.profileImage || "https://via.placeholder.com/150"} className="avatar-img rounded-circle" alt="Host Avatar" />
                                    </div>
                                    <div>
                                        <h6 className="mb-0">
                                            <Link to={`/profile/${data.creator}`}>{creatorDetails.name}</Link>
                                        </h6>
                                        <small>{creatorDetails.title || 'Event Host/Manager'}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const ApplyButton = ({ eventId }) => {
    const { user } = useAuth();
    const [isClicked, setIsClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkApplicationStatus = async () => {
            if (user) {
                const db = getDatabase();
                const applicationRef = ref(db, `events/${eventId}/applications/${user.uid}`);
                const snapshot = await get(applicationRef);
                if (snapshot.exists()) {
                    setIsClicked(true); // Disable button if application already exists
                }
                setIsLoading(false);
            }
        };

        checkApplicationStatus();
    }, [user, eventId]); // Ensure this runs when `user` or `eventId` changes

    const handleApply = async () => {
        if (!user || !user.isVendor) {
            console.log("Not authorized or not a vendor");
            return;
        }
        const db = getDatabase();
        const applicationRef = ref(db, `events/${eventId}/applications/${user.uid}`);
        try {
            await update(applicationRef, { [user.uid]: true });
            console.log("Application submitted successfully");
            setIsClicked(true);
        } catch (error) {
            console.error("Failed to submit application:", error);
        }
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <button className="btn btn-primary w-100" onClick={handleApply} disabled={isClicked}>
            {isClicked ? 'Applied' : 'Apply to Event'}
        </button>
    );
};

export default EventOverview;
