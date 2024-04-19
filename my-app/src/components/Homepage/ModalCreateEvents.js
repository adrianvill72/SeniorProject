import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDatabase, ref, set, push} from "firebase/database";

function ModalCreateEvents() {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '',
    location: '',
    guestEmail: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCthRyJ1Sh4X8HyhnyiqJLBxsULXwuz3TaRg&s'
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setEventData(prev => ({...prev, [name]: value}));
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const db = getDatabase();
    const eventsRef = ref(db, 'events');
    const newEventRef = push(eventsRef);

    try {
      await set(newEventRef, {...eventData});
      alert("Event successfully created!"); // Show success message
      // Close modal here if needed or redirect
      // Assuming modalInstance is the Bootstrap modal instance
    } catch (error) {
      console.error("Failed to create new event: ", error);
    }
  };
  return (
      <div className="modal fade" id="modalCreateEvents" tabIndex="-1" aria-labelledby="modalLabelCreateEvents"
           aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabelCreateEvents">Create event</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="row g-4" onSubmit={handleSubmit}>
                <div className="col-12">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" placeholder="Event name here" name="title"
                         value={eventData.title} onChange={handleChange}/>
                </div>
                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows="2" placeholder="Ex: topics, schedule, etc."
                            name="description" value={eventData.description} onChange={handleChange}></textarea>
                </div>
                <div className="col-sm-4">
                  <label className="form-label">Date</label>
                  <input type="text" className="form-control" placeholder="Select date" name="date"
                         value={eventData.date} onChange={handleChange}/>
                </div>
                <div className="col-sm-4">
                  <label className="form-label">Time</label>
                  <input type="text" className="form-control" placeholder="Select time" name="time"
                         value={eventData.time} onChange={handleChange}/>
                </div>
                <div className="col-sm-4">
                  <label className="form-label">Duration</label>
                  <input type="text" className="form-control" placeholder="1hr 23m" name="duration"
                         value={eventData.duration} onChange={handleChange}/>
                </div>
                <div className="col-12">
                  <label className="form-label">Location</label>
                  <input type="text" className="form-control" placeholder="Edinburg, TX 78526" name="location"
                         value={eventData.location} onChange={handleChange}/>
                </div>
                <div className="col-12">
                  <label className="form-label">Add guests</label>
                  <input type="email" className="form-control" placeholder="Guest email" name="guestEmail"
                         value={eventData.guestEmail} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Upload attachment</label>
                  <input type="file" className="form-control" name="attachments"/>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger-soft me-2" data-bs-dismiss="modal"> Cancel</button>
                  <button type="submit" className="btn btn-success-soft">Create now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}
export default ModalCreateEvents;