import React, {useState} from 'react';
import { getDatabase, set,ref, push} from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL  } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ModalCreateEvents() {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();
  const eventsRef = ref(db, 'events');
  const newEventRef = push(eventsRef);

  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '',
    location: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCthRyJ1Sh4X8HyhnyiqJLBxsULXwuz3TaRg&s',
    participants: ['']  // Added to track participating vendors/stores
  });
  const [vendors, setVendors] = useState([]);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setEventData(prev => ({...prev, [name]: value}));
  };
  const dateChange = date => {
    const formattedDate = date.toISOString().split('T')[0];
    setEventData(prevState => ({
      ...prevState,
      date: formattedDate
    }));
  };
  const handleVendorSelection = (e) => {
    const selectedId = e.target.value;
    const isSelected = eventData.participants.includes(selectedId);
    setEventData(prev => ({
      ...prev,
      participants: isSelected ? prev.participants.filter(id => id !== selectedId) : [...prev.participants, selectedId]
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected.");
      return;
    }
    const storage = getStorage();
    const storageReference = storageRef(storage, `events/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageReference, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setEventData(prev => ({...prev, image: downloadURL}));
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await set(newEventRef, {...eventData, creator: user.uid });
      alert("Event successfully created!");
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
                  <ReactDatePicker
                      selected={eventData.date}
                      onChange={dateChange}
                      dateFormat="yyyy-MM-dd"
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
                  <label className="form-label">Location</label>
                  <input type="text" className="form-control" placeholder="Edinburg, TX 78526" name="location"
                         value={eventData.location} onChange={handleChange}/>
                </div>
                <div className="col-12">
                  <label className="form-label">Participating Vendors</label>
                  <select multiple className="form-control" onChange={handleVendorSelection}>
                    {vendors.map(vendor => (
                        <option key={vendor.id} value={vendor.id}>
                          {vendor.name}
                        </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Upload attachment</label>
                  <input onChange={handleImageChange} type="file" className="form-control" name="attachments"/>
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