import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getDatabase, ref, update, onValue, off} from 'firebase/database';
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
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
};

export default EditEvent;
