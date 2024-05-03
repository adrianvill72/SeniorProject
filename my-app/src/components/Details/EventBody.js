import React, { useEffect, useState } from 'react';
import EventCard2 from './EventCard2';
import EventOverview from './EventOverview';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue,off } from "firebase/database";
import NavBar from "../Homepage/NavBar";


function EventBody() {
    const { eventId } = useParams();
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        const db = getDatabase();
        const eventsRef = ref(db, `events/${eventId}`);
        const unsubscribe = onValue(eventsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // console.log("Fetched Event Data:", data);
                setEventData(data);
            } else {
                console.log("No event data available for eventId:", eventId);
            }
        }, (error) => {
            console.error("Error fetching event data:", error);
        });

        return () => {
            off(eventsRef, 'value', unsubscribe);
        };
    }, [eventId]);

    console.log("eventData at eventbody", eventData)
    if (!eventData) {
        return <div>Loading...</div>; // Make sure this is showing adequately during load
    }

    return (
        <main>
            <NavBar />
            <EventCard2 title={eventData.title} image={eventData.image}/>
            <EventOverview data={eventData}/>
        </main>
    );
}

export default EventBody;