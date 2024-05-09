import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {getAuth} from "firebase/auth";
import {getDatabase, ref, set, get, onValue} from "firebase/database";
const EventsList = ({events, filters}) => {
  const filteredEvents = events.filter(event => {
    return (

        (!filters.city || event.city === filters.city) && // Filter by city
        (!filters.state || event.state === filters.state) && // Filter by state
        (!filters.fromDate || new Date(event.date) >= new Date(filters.fromDate)) &&
        (!filters.toDate || new Date(event.date) <= new Date(filters.toDate))
    );
  });

  // Sort events by date in ascending order
  filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
      <div className="row g-4">
        {filteredEvents.map((event) => (
            <EventDetails key={event.id} event={event}/>
        ))}
      </div>
  );
};

const EventDetails = ({ event }) =>{
  const [interestedCount, setInterestedCount] = useState(0)
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const eventRef = ref(db, 'events/' + event.id + '/interested');

    // Fetch the current interested count from the database
    onValue(eventRef, (snapshot) => {
      const data = snapshot.val();
      setInterestedCount(data || 0); // Use the fetched count to set the state
    });
  }, [event.id]);
  const navigateToEditPage = (eventId) => {
    navigate(`/events/edit/${eventId}`);
  }
  const handleInterestedClick = async (e) => {
    const db = getDatabase();
    const eventRef = ref(db, 'events/' + event.id + '/interested');

    let newCount;
    if (e.target.checked) {
      newCount = interestedCount + 1;
    } else {
      newCount = interestedCount - 1;
    }
    setInterestedCount(newCount);
    await set(eventRef, newCount);
  };
  const copyToClipboard = (eventId) => {
    const url = `${window.location.origin}/events/${eventId}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    }, (err) => {
      console.error('Failed to copy: ', err);
      alert('Failed to copy the link.');
    });
  };
  return (
      <div className="col-sm-6 col-xl-4">
          <div className="card h-100">
            <div className="position-relative">
              <img className="imgfluid rounded-top" src={event.image} alt="" />
              {user && user.uid === event.creator && (
                  <div className="badge bg-danger mt-2 me-2 position-absolute top-0 end-0">
                    <button className="btn btn-xs btn-danger" onClick={() => navigateToEditPage(event.id)}>Edit</button>
                  </div>
              )}

            </div>
            <div className="card-body position-relative pt-0">
              <div className="btn btn-xs btn-primary mt-n3" >Local Market</div>
              <h6 className="mt-3">
                <Link key={event.id} to={`/events/${event.id}`}>{event.title}</Link>
              </h6>
              <p className="mb-0 small"><i className="bi bi-calendar-check pe-1"></i> {event.date}</p>
              <p className="small"><i className="bi bi-geo-alt pe-1"></i> {event.location}</p>
              <p className="small"><i className="bi bi-people pe-1"></i> Interested: {interestedCount}</p>
              <div className="d-flex mt-3 justify-content-between">
                <div className="w-100" key={event.id}>
                  <input type="checkbox" className="btn-check d-block" id={`Interested${event.id}`}
                         onClick={handleInterestedClick}/>
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
                    <li>
                      <button className="dropdown-item" onClick={() => copyToClipboard(event.id)}><i
                          className="bi bi-clipboard"></i> Share Link
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      </div>
  );
}


export default EventsList;
