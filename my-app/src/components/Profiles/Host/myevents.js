import React, { useEffect, useState } from 'react';
import { getDatabase, ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import {Link, useNavigate, useParams} from 'react-router-dom';
import EventDetails from "../../Homepage/EventDetails";
import {useAuth}  from '../../../firebase';

const EventCreationButton = () => {
    return (
        <button className="btn btn-primary-soft btn-sm" data-bs-toggle="modal" data-bs-target="#modalCreateEvents">
            <i className="fa-solid fa-plus pe-1"></i> Create event
        </button>
    );
};


const MyEvents = ({ user }) => {
    const currentUser=useAuth().user;
    let currentUserID=null;
    if(currentUser){
         currentUserID=currentUser.uid;
    }
    const { userId } = useParams(); // Correctly destructure userId from the URL
    const db = getDatabase();
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (!userId) {
            setEvents([]);
            return;
        }

        const eventsRef = ref(db, 'events');
        const unsubscribe = onValue(eventsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedEvents = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                })).filter(event => event.creator === userId); // Filter by userId from URL
                setEvents(loadedEvents);
            }
        });

        // Clean up the listener when the component unmounts or userId changes
        return () => unsubscribe();
    }, [userId, db]);

    const navigateToEditPage = (eventId) => {
        navigate(`/events/edit/${eventId}`);
    }

    return (

        <div className="card">
            <div className="card-header d-sm-flex align-items-center justify-content-between border-0 pb-0">
                <h5 className="card-title mb-sm-0">My Events</h5>
            </div>
            <div className="card-body">
                <div className="row g-4">
                {events.length > 0 ? events.map(event => (
                    <div className="col-sm-6 col-xl-4">
                        <div className="card h-100">
                            <div className="position-relative">
                                <img className="imgfluid rounded-top" src={event.image} alt=""/>
                                {user && currentUserID === event.creator && (
                                    <div className="badge bg-danger mt-2 me-2 position-absolute top-0 end-0">
                                        <button className="btn btn-xs btn-danger"
                                                onClick={() => navigateToEditPage(event.id)}>Edit
                                        </button>
                                    </div>
                                )}

                            </div>
                            <div className="card-body position-relative pt-0">
                                <div className="btn btn-xs btn-primary mt-n3">Local Market</div>
                                <h6 className="mt-3">
                                    <Link key={event.id} to={`/events/${event.id}`}>{event.title}</Link>
                                </h6>
                                <p className="mb-0 small"><i className="bi bi-calendar-check pe-1"></i> {event.date}</p>
                                <p className="small"><i className="bi bi-geo-alt pe-1"></i> {event.location}</p>
                                <div className="d-flex mt-3 justify-content-between">
                                    <div className="w-100" key={event.id}>
                                        <input type="checkbox" className="btn-check d-block"
                                               id={`Interested${event.id}`}/>
                                        <label className="btn btn-sm btn-outline-success d-block"
                                               htmlFor={`Interested${event.id}`}>
                                            <i className="bi bi-thumbs-up"></i> Interested
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : <p>No events found.</p>}
            </div>
                </div>
        </div>
    );
};

export default MyEvents;
