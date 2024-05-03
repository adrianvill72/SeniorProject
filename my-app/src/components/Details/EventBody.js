import React, { useEffect, useState } from 'react';
import EventCard2 from './EventCard2';
import EventOverview from './EventOverview';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue,off } from "firebase/database";
import NavBar from "../Homepage/NavBar";


function EventBody (){
    const { eventId } = useParams();
    const [eventData, setEventData] = useState(null);
    useEffect(() => {
        const db = getDatabase();
        const eventsRef = ref(db, `events/${eventId}`);
        onValue(eventsRef, (snapshot) => {
            const eventData = snapshot.val();
            console.log(eventData.image)
            setEventData(eventData);
        });

        return () => off(eventsRef);
    }, [eventId]);

    if (!eventData) return <div>Loading...</div>;
    return(
        <main>
           <NavBar/>
            <EventCard2 title={eventData.title} image={eventData.image}/>
            <EventOverview data={eventData}/>
        </main>
    );
}

export default EventBody;