import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, update, onValue, off, remove } from 'firebase/database';

const EditEvent = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const db = getDatabase();
    const [showDeleted, setShowDeleted] = useState(false);
    const [event, setEvent] = useState({
        title: '',
        location: '',
        date: '',
        image: ''
    });

    useEffect(() => {
        const eventRef = ref(db, `events/${eventId}`);
        onValue(eventRef, (snapshot) => {
            const eventData = snapshot.val();
            if (eventData) {
                setEvent(eventData);
            } else {
                setShowDeleted(true);  // Set showDeleted true if no data is found
            }
        });

        return () => off(eventRef);
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
        } catch (error) {
            console.error('Error updating event:', error);
            alert('Failed to update event.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                await remove(ref(db, `events/${eventId}`));
                setShowDeleted(true);
            } catch (error) {
                console.error('Error deleting event:', error);
                alert('Failed to delete event.');
            }
        }
    };

    if (!showDeleted) {
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
                    <button type="submit" className="btn btn-primary" style={{marginRight: '10px'}}>
                        Save Changes
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                        Cancel Changes
                    </button>
                    <button type="button" className="btn btn-danger" style={{float: 'right'}} onClick={handleDelete}>
                        DELETE EVENT
                    </button>
                </form>
            </div>
        );
    } else {
        return (
            <div className="container">
                <h1>Event Deleted Successfully</h1>
                <button type="button" className="btn btn-primary" onClick={() => navigate('/')}>
                    Return to Home
                </button>
            </div>
        );
    }
};

export default EditEvent;
