import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useParams, Link } from 'react-router-dom';

const MyEventsvendor = () => {
    const { userId } = useParams(); // Get the user ID from the URL
    const db = getDatabase();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const eventsRef = ref(db, 'events');
        onValue(eventsRef, (snapshot) => {
            const loadedEvents = [];
            snapshot.forEach(childSnapshot => {
                const event = { id: childSnapshot.key, ...childSnapshot.val() };
                // Check if userId is a key in the participants object
                if (event.participants && event.participants[userId]) {
                    loadedEvents.push(event);
                }
            });
            setEvents(loadedEvents);
        }, {
            onlyOnce: true
        });
    }, [userId, db]);

    return (
        <div className="card">
            <div className="card-body">
                {events.length > 0 ? events.map(event => (
                    <div className="row" key={event.id}>
                        <div className="d-sm-flex align-items-center">
                            <div className="avatar avatar-xl">
                                <Link to={`/events/${event.id}`}>
                                    <img className="avatar-img rounded border border-white border-3" src={event.image || "/assets/images/events/default.jpg"} alt="Event" />
                                </Link>
                            </div>
                            <div className="ms-sm-4 mt-2 mt-sm-0">
                                <h5 className="mb-1">
                                    <Link to={`/events/${event.id}`}>{event.title}</Link>
                                </h5>
                                <ul className="nav nav-stack small">
                                    <li className="nav-item">
                                        <i className="bi bi-calendar-check pe-1"></i> {new Date(event.date).toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </li>
                                    <li className="nav-item">
                                        <i className="bi bi-geo-alt pe-1"></i> {event.location}
                                    </li>
                                    <li className="nav-item">
                                        <i className="bi bi-people pe-1"></i> {event.interested || '0'} going
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )) : <p>No events found where you are a participant.</p>}
            </div>
        </div>
    );
};

export default MyEventsvendor;
