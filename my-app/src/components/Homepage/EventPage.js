import EventSearchForm from './EventSearch';
import EventCard from './EventCard';
import React, { useState, useEffect } from 'react';
import {getDatabase, onValue, ref} from "firebase/database";

function EventPage() {
    const [events, setEvents] = useState([]);
    const [filters, setFilters] = useState({ city: '', state: '', fromDate: '', toDate: '' });
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const eventsRef = ref(db, 'events');

        // Fetch the data
        onValue(eventsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedEvents = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setEvents(loadedEvents);

                // Extract unique cities and states
                const citySet = new Set();
                const stateSet = new Set();
                loadedEvents.forEach(event => {
                    if (event.city) citySet.add(event.city);
                    if (event.state) stateSet.add(event.state);
                });

                setCities(Array.from(citySet));
                setStates(Array.from(stateSet));
            }
        });
    }, []);

    const handleSearch = ({ city, state, fromDate, toDate }) => {
        console.log("Filters applied:", city, state, fromDate, toDate);
        setFilters({ city, state, fromDate, toDate });
    };


    return (
    <main>
    <EventSearchForm cities={cities} states={states} handleSearch={handleSearch}/>
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
