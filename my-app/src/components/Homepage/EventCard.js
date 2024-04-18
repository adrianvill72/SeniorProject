import React from 'react';
import EventDetails from './EventDetails'; 
import ModalCreateEvents from './ModalCreateEvents';

function EventCard() {
  return (
    <div className="card">
      <div className="card-header d-sm-flex align-items-center text-center justify-content-sm-between border-0 pb-0">
        <h2 className="h4 card-title">Discover Events</h2>
        {/* button modal*/}
        <button className="btn btn-primary-soft" data-bs-toggle="modal" data-bs-target="#modalCreateEvents">
          <i className="bi bi-plus"></i> Create event
        </button>
        <ModalCreateEvents />
      </div>
      <div className="card-body">
        <div className="row g-4">
          <div className="col-sm-6 col-xl-4">
            {/* Event items go here */}
            <EventDetails />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
