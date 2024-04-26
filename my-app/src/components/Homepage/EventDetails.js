import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { Link } from 'react-router-dom';
import {getAuth} from "firebase/auth";
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
        {events.map((event) => (
            <EventDetails key={event.id} event={event}/>
        ))}
      </div>
  );
};

const EventDetails = ({ event }) =>{
  const auth = getAuth();
  const user = auth.currentUser;
  const navigateToEditPage = (eventId) => {
    console.log(eventId);
  }
  return (
      <div className="col-sm-6 col-xl-4">
          <div className="card h-100">
            <div className="position-relative">
              <img className="imgfluid rounded-top" src={event.image} alt="" />
              {user && user.uid === event.creator && (
                  <div className="badge bg-danger text-white mt-2 me-2 position-absolute top-0 end-0">
                    <button onClick={() => navigateToEditPage(event.id)}>Edit</button>
                  </div>
              )}
            </div>
            <div className="card-body position-relative pt-0">
              <button className="btn btn-xs btn-primary mt-n3" onClick={() => { window.location.href = 'event-details-2.html'; }}>Local Market</button>
              <h6 className="mt-3">
                <Link to="/Event">{event.title}</Link>
              </h6>
              <p className="mb-0 small"><i className="bi bi-calendar-check pe-1"></i> {event.date}</p>
              <p className="small"><i className="bi bi-geo-alt pe-1"></i> {event.location}</p>
              <div className="d-flex mt-3 justify-content-between">
                <div className="w-100" key={event.id}>
                  <input type="checkbox" className="btn-check d-block" id={`Interested${event.id}`}/>
                  <label className="btn btn-sm btn-outline-success d-block" htmlFor={`Interested${event.id}`}>
                    <i className="bi bi-thumbs-up"></i> Interested
                  </label>
                </div>
                <div className="dropdown ms-3">
                  <button className="btn btn-sm btn-primary-soft" id="eventActionShare" data-bs-toggle="dropdown"
                          aria-expanded="false">
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
