import React, {useEffect, useState} from 'react';
import { getDatabase, ref, query, orderByChild, equalTo, onValue } from 'firebase/database';

const EventCreationButton = () => {

    return (
        <button className="btn btn-primary-soft btn-sm" data-bs-toggle="modal" data-bs-target="#modalCreateEvents">
            <i className="fa-solid fa-plus pe-1"></i> Create event
        </button>
    );
};

const MyEvents = () => {
    const db = getDatabase();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = () => {
            const userUid = "A7NxkJ6aBjZoMeHBf28fIdQFagQ2"; // Replace with dynamic user ID as needed
            const eventsRef = ref(db, 'events');
            const eventsQuery = query(eventsRef, orderByChild('creator'), equalTo(userUid));

            onValue(eventsQuery, (snapshot) => {
                const eventsList = [];
                snapshot.forEach((childSnapshot) => {
                    const eventData = childSnapshot.val();
                    eventData.id = childSnapshot.key;
                    eventsList.push(eventData);
                });
                setEvents(eventsList);
            }, {
                onlyOnce: true
            });
        };

        fetchEvents();
    }, []);

    return (
        <div className="card">
            <div className="card-header d-sm-flex align-items-center justify-content-between border-0 pb-0">
                <h5 className="card-title mb-sm-0">My Events</h5>
                <EventCreationButton />
            </div>
            <div className="card-body">
                {events.length > 0 ? events.map(event => (
                    <div key={event.id} className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>{event.title}:</strong> {event.description}
                        <a href={`events/${event.id}`} className="btn btn-xs btn-success ms-md-4">View event</a>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )) : <p>No events found.</p>}
            </div>
        </div>
    );
};

export default MyEvents;