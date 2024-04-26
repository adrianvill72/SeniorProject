import React from 'react';
import EventsList from './EventDetails';
import ModalCreateEvents from './ModalCreateEvents';
import {useAuth}  from '../../firebase';
const EventCreationButton = () => {
    const {user} = useAuth();

    if (!user || !user.isHost) {
        return null;  // Don't render anything if not authenticated or not a host
    }
    return (
        <button className="btn btn-primary-soft" data-bs-toggle="modal" data-bs-target="#modalCreateEvents">
            <i className="bi bi-plus"></i> Create event
        </button>
    );
};

function EventCard() {
    return (
        <div className="card">
            <div
                className="card-header d-sm-flex align-items-center text-center justify-content-sm-between border-0 pb-0">
                <h2 className="h4 card-title">Discover Events</h2>
                <EventCreationButton />
                <ModalCreateEvents />
            </div>
            <div className="card-body">
                <EventsList />
            </div>
        </div>
    );
}

export default EventCard;
