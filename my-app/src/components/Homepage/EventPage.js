import EventSearchForm from './EventSearch';
import EventCard from './EventCard';
import React, { useState, useEffect } from 'react';
import {getDatabase, onValue, ref} from "firebase/database";

function EventPage() {
    const [events, setEvents] = useState([]);
    const [filters, setFilters] = useState({ Location: '', fromDate: '', toDate: '' });
    const [locations, setLocations] = useState([]);

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
                const uniqueLocations = [...new Set(loadedEvents.map(event => event.location))];
                setLocations(uniqueLocations);

            }

        });
    }, []);


    const handleSearch = ({ location, fromDate, toDate }) => {
        console.log("Filters applied:", location, fromDate, toDate);
        setFilters({ location, fromDate, toDate });
    };


    return (
    <main>
      <EventSearchForm locations={locations} handleSearch={handleSearch}/>
      <section className="pt-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 vstack gap-4">
              <EventCard events={events} filters={filters} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default EventPage;
