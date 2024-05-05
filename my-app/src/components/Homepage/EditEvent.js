import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getDatabase, ref, update, onValue, off,remove} from 'firebase/database';
import { getAuth } from 'firebase/auth';

const EditEvent = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const db = getDatabase();
    const [event, setEvent] = useState({
        title: '',
        location: '',
        date: '',
        image: ''
    });

    useEffect(() => {
        const eventRef = ref(db, `events/${eventId}`);
        onValue(eventRef, (snapshot) => {
            setEvent(snapshot.val());
        });

        return () => {
            return () => off(eventRef);
        };
    }, [eventId, db]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await update(ref(db, `events/${eventId}`), event);
            alert('Event updated successfully');
            navigate(`/events/${eventId}`); // Navigate back to the event detail page or wherever appropriate
        } catch (error) {
            console.error('Error updating event:', error);
            alert('Failed to update event.');
        }
    };
    const handleDelete = async () => {
        try {
            await remove(ref(db, `events/${eventId}`));
            alert('Event deleted successfully');
            navigate('/'); // Navigate to home or other appropriate path
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Failed to delete event.');
        }
    };
    const handleCancel = async () => {
        navigate('/'); // Navigate to home or other appropriate path
    };
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Event Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={event.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Event Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={event.location}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Event Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        name="date"
                        value={event.date}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" style={{ marginRight: '10px' }} className="btn btn-primary">Save Changes</button>
                <button type="submit" className="btn btn-secondary" onClick={handleCancel}>Cancel Changes</button>
                <button type="submit" style={{float: 'right'}} className=" btn btn-danger" onClick={handleDelete}>DELETE
                    EVENT
                </button>
            </form>
        </div>
    );
};

export default EditEvent;
