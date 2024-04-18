import React from 'react';
import EventCard2 from './EventCard2';
import EventOverview from './EventOverview';



function EventBody (){
    return(
        <main>
            <EventCard2/>
            <EventOverview/>
        </main>
    );
}

export default EventBody;