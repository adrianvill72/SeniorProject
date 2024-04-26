import React from 'react';

function EventOverview() {
    return(
        <section class="py-5">
            <div className="container">
                    <div className="row g-4">
                    <div className="col-lg-4">
                        <div className="card card-body">
                        {/* Replace anchor tag with button */}
                        <button className="btn btn-primary w-100"> Buy ticket </button>
                        <div className="mt-4">
                            <ul className="list-unstyled mb-4">
                            <li className="d-flex justify-content-between mb-3"> <strong className="w-150px">Show Date & time:</strong> <span className="text-end"> 12 December, 8:20PM </span></li>
                            <li className="d-flex justify-content-between mb-3"> <strong className="w-150px">Ticket Price:</strong> <span className="text-end"> $210.00 </span></li>
                            <li className="d-flex justify-content-between mb-3"> <strong className="w-150px">Entry fees:</strong> <span className="text-end"> $1 per ticket </span></li>
                            <li className="d-flex justify-content-between mb-3"> <strong className="w-150px">Address:</strong> <span className="text-end"> 750 Sing Sing Rd, Horseheads, NY, 14845 </span></li>
                            </ul>
                            <iframe className="w-100 d-block rounded-bottom grayscale" height="230" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076684379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sin!4v1586000412513!5m2!1sen!2sin"  style={{ border: '0' }} aria-hidden="false" tabIndex="0" title="Google Maps"></iframe>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card card-body">
                        <h4>Overview</h4>
                        <p>Appear third them gathered created divided all years spirit saying for great saying made had fly dry that darkness meat unto Thing spirit his fifth likeness divided also seed lesser image dominion sea fifth i god so saw open great Living.</p>
                        <img className="img-fluid mb-3" src="social_v1.1.1/template/assets/images/events/06.jpg" alt="" />
                        <h6>Female saying may multiply upon life</h6>
                        <p>To don't may give void forth created fruitful bearing creepeth fish god night you're brought creeping so you'll herb place blessed creepeth beast Green face fruitful stars man multiply Creepeth upon over darkness There dominion day from man doesn't won't us two fish a female saying may multiply upon life.</p>

                        {/* Host */}
                        <div className="mt-4 mt-sm-5">
                            <h4>Host</h4>
                            <div className="row g-4">
                            {/* Host Items */}
                            </div>
                        </div>

                        {/* Schedule */}
                        <div className="mt-4 mt-sm-5">
                            <h4>Schedule</h4>
                            <div className="accordion accordion-icon" id="accordionschedules">
                            {/* Schedule Items */}
                            </div>
                        </div>

                        {/* Statistics */}
                        <div className="card card-body p-4 mt-5">
                            <div className="row g-2">
                            {/* Statistics Items */}
                            </div>
                        </div>

                        {/* FAQs */}
                        <div className="mt-4 mt-sm-5">
                            <h4>FAQ</h4>
                            <div className="accordion accordion-icon" id="accordionfaq">
                            {/* FAQ Items */}
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
        </section>
    );
}
export default EventOverview;