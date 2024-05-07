import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, set } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ModalCreateEvents() {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();
  const storage = getStorage();

  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: null, // Initialize as null for datepicker compatibility
    time: '',
    duration: '',
    address: '',
    city: '',
    state: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCthRyJ1Sh4X8HyhnyiqJLBxsULXwuz3TaRg&s',
    participants: []  // Ensure participants is always an array
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const dateChange = (date) => {
    setEventData(prev => ({ ...prev, date: date }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }
    const fileRef = storageRef(storage, `events/${new Date().getTime()}_${file.name}`);
    try {
      const snapshot = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setEventData(prev => ({ ...prev, image: downloadURL }));
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventData.address || !eventData.city || !eventData.state) {
      alert("Please fill in all location fields.");
      return;
    }
    const eventsRef = ref(db, 'events');
    const newEventRef = push(eventsRef);
    try {
      await set(newEventRef, {
        ...eventData,
        location: `${eventData.address}, ${eventData.city}, ${eventData.state}`,
        creator: user.uid,
        date: eventData.date ? eventData.date.toISOString().split('T')[0] : null, // Format date or handle null
      });
      alert("Event successfully created!");
      setEventData({ // Reset form fields
        title: '',
        description: '',
        date: null,
        time: '',
        duration: '',
        address: '',
        city: '',
        state: '',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCthRyJ1Sh4X8HyhnyiqJLBxsULXwuz3TaRg&s',
        participants: []
      });
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
              <h5 className="modal-title" id="modalLabelCreateEvents">Create Event</h5>
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
                  <ReactDatePicker
                      selected={eventData.date}
                      onChange={dateChange}
                      dateFormat="MM-dd-yyyy"
                      className="form-control"
                  />
                </div>
                <div className="col-sm-4">
                  <label className="form-label">Time</label>
                  <input type="time" className="form-control" name="time"
                         value={eventData.time} onChange={handleChange}/>
                </div>
                <div className="col-sm-4">
                  <label className="form-label">Duration</label>
                  <input type="text" className="form-control" placeholder="1hr 23m" name="duration"
                         value={eventData.duration} onChange={handleChange}/>
                </div>
                <div className="col-12">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" placeholder="1234 Main St" name="address"
                         value={eventData.address} onChange={handleChange}/>
                </div>
                <div className="col-md-6">
                  <label className="form-label">State</label>
                  <select className="form-control" name="state" value={eventData.state} onChange={handleChange}>
                    <option value="">Select State</option>
                    <option value="TX">Texas</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <select className="form-control" name="city" value={eventData.city} onChange={handleChange}>
                    <option value="">Select City</option>
                    <option value="Brownsville">Brownsville</option>
                    <option value="Edinburg">Edinburg</option>
                    <option value="McAllen">McAllen</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Upload attachment</label>
                  <input onChange={handleImageChange} type="file" className="form-control" name="attachments"/>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger-soft me-2" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" className="btn btn-success-soft">Create Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ModalCreateEvents;