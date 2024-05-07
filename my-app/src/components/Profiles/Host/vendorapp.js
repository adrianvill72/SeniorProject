import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove, update, get } from 'firebase/database';
import {useParams} from 'react-router-dom';
const VendorApp = ({ userId }) => {
    const [events, setEvents] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const db = getDatabase();
    const userInfo=useParams();
    const uid=userInfo["userId"];
    console.log(uid)
    // Fetch events created by the user
    useEffect(() => {
        const eventsRef = ref(db, 'events');
        onValue(eventsRef, (snapshot) => {
            const allEvents = snapshot.val();
            const userEvents = [];
            console.log("All Events:", allEvents);
            for (let eventId in allEvents) {
                if (allEvents[eventId].creator === uid) {
                    userEvents.push({ id: eventId, ...allEvents[eventId] });
                }
            }
            setEvents(userEvents);
        });
    }, [userId, db]);

    // Fetch applications for the user's events
    useEffect(() => {
        events.forEach(event => {
            const appRef = ref(db, `events/${event.id}/applications`);
            onValue(appRef, (snapshot) => {
                if (snapshot.exists()) {
                    const appIds = Object.keys(snapshot.val());
                    appIds.forEach(appId => {
                        const userRef = ref(db, `users/${appId}`);
                        onValue(userRef, (userSnapshot) => {
                            if (userSnapshot.exists()) {
                                const userDetails = userSnapshot.val();
                                setApplicants(prev => [...prev, { eventId: event.id, id: appId, ...userDetails }]);
                            }
                        }, { onlyOnce: true });
                    });
                }
            });
        });
    }, [events, db]);

    const handleAccept = (vendorId, eventId) => {
        const updates = {};
        updates[`events/${eventId}/participants/${vendorId}`] = true;
        updates[`events/${eventId}/applications/${vendorId}`] = null;
        update(ref(db), updates)
            .then(() => {
                console.log("Updated participants and applications successfully for event:", eventId);
                // Update applicants state to remove accepted applicant
                setApplicants(prevApplicants => prevApplicants.filter(applicant => !(applicant.id === vendorId && applicant.eventId === eventId)));
            })
            .catch(error => console.error("Error updating database for event:", eventId, error));
    };

    const handleRemove = (vendorId, eventId) => {
        const appRef = ref(db, `events/${eventId}/applications/${vendorId}`);
        remove(appRef)
            .then(() => {
                console.log("Application removed successfully from event:", eventId);
                // Update applicants state to remove declined applicant
                setApplicants(prevApplicants => prevApplicants.filter(applicant => !(applicant.id === vendorId && applicant.eventId === eventId)));
            })
            .catch(error => console.error("Error removing application from event:", eventId, error));
    };

    return (
        <div className="card">
            <div className="card-header border-0 pb-0">
                <h5 className="card-title">Applications</h5>
            </div>
            <div className="card-body">
                {applicants.map((applicant) => (
                    <div key={applicant.id} className="d-md-flex align-items-center mb-4">
                        <div className="avatar me-3 mb-3 mb-md-0">
                            <a href="#!">
                                <img className="avatar-img rounded-circle" src={applicant.profileImage || "assets/images/avatar/default.jpg"} alt={applicant.name} />
                            </a>
                        </div>
                        <div className="w-100">
                            <div className="d-sm-flex align-items-start">
                                <h6 className="mb-0">
                                    <a href="#!">{applicant.name}</a>
                                </h6>
                                <p className="small ms-sm-2 mb-0">{applicant.aboutMe || "Applicant"}</p>
                            </div>
                        </div>
                        <div className="ms-md-auto d-flex">
                            <button className="btn btn-danger-soft btn-sm mb-0 me-2"
                                    onClick={() => handleRemove(applicant.id, applicant.eventId)}>Remove
                            </button>
                            <button className="btn btn-primary-soft btn-sm mb-0"
                                    onClick={() => handleAccept(applicant.id, applicant.eventId)}>Accept
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VendorApp;
