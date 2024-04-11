import React from 'react';
import EventSearchForm from './EventSearch';
import EventCard from './EventCard';

function EventPage() {
  return (
    <main>
      <EventSearchForm />
      <section className="pt-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 vstack gap-4">
              <EventCard />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default EventPage;
