import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const eventsRef = ref(db, 'events');

    // Fetch the data
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the data from an object to an array
        const loadedEvents = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setEvents(loadedEvents);
      }
    });

  }, []);

  return (
      <div className="row g-4">
        {events.map(event => (
            <EventDetails key={event.id} event={event}/>
        ))}
      </div>
  );
};

const EventDetails = ({ event }) =>{
  return (
      <div className="col-sm-6 col-xl-4">
          <div className="card h-100">
            <div className="position-relative">
              <img className="imgfluid rounded-top" src={event.image} alt="" />
              <div className="badge bg-danger text-white mt-2 me-2 position-absolute top-0 end-0">
                Online
              </div>
            </div>
            <div className="card-body position-relative pt-0">
              <button className="btn btn-xs btn-primary mt-n3" onClick={() => { window.location.href = 'event-details-2.html'; }}>Local Market</button>
              <h6 className="mt-3"><a href="event-details-2.html">{event.title}</a></h6>
              <p className="mb-0 small"><i className="bi bi-calendar-check pe-1"></i> {event.date}</p>
              <p className="small"><i className="bi bi-geo-alt pe-1"></i> {event.location}</p>
              <div className="d-flex mt-3 justify-content-between">
                <div className="w-100">
                  <input type="checkbox" className="btn-check d-block" id="Interested1" />
                  <label className="btn btn-sm btn-outline-success d-block" htmlFor="Interested1"><i className="bi bi-thumbs-up"></i> Interested</label>
                </div>
                <div className="dropdown ms-3">
                  <button className="btn btn-sm btn-primary-soft" id="eventActionShare" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-share-fill"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="eventActionShare">
                    <li><button className="dropdown-item" onClick={() => { /* Your logic here */ }}><i className="bi bi-envelope"></i> Send via Direct Message</button></li>
                    <li><button className="dropdown-item" onClick={() => { /* Your logic here */ }}><i className="bi bi-bookmark-check"></i> Share to News Feed</button></li>
                    <li><button className="dropdown-item" onClick={() => { /* Your logic here */ }}><i className="bi bi-people"></i> Share to a group</button></li>
                    <li><button className="dropdown-item" onClick={() => { /* Your logic here */ }}><i className="bi bi-share"></i> Share post via …</button></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={() => { /* Your logic here */ }}><i className="bi bi-person"></i> Share on a friend's profile</button></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      </div>
  );
}

export default EventsList;
