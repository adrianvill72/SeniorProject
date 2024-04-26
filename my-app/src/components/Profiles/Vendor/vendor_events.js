import React from 'react';

const MyEventsvendor = () => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Upcoming event:</strong> The learning conference on Sep 19 2022
                    <a href="events.html" className="btn btn-xs btn-success ms-md-4">View event</a>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <div className="row">
                    <div className="d-sm-flex align-items-center">
                        <div className="avatar avatar-xl">
                            <a href="#!"><img className="avatar-img rounded border border-white border-3" src="assets/images/events/01.jpg" alt="" /></a>
                        </div>
                        <div className="ms-sm-4 mt-2 mt-sm-0">
                            <h5 className="mb-1"><a href="event-details.html"> Comedy on the green </a></h5>
                                <ul className="nav nav-stack small">
                                    <li className="nav-item">
                                        <i className="bi bi-calendar-check pe-1"></i> Mon, Sep 25, 2020 at 9:30 AM
                                    </li>
                                    <li className="nav-item">
                                        <i className="bi bi-geo-alt pe-1"></i> San francisco
                                    </li>
                                    <li className="nav-item">
                                        <i className="bi bi-people pe-1"></i> 77 going
                                    </li>
                                </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyEventsvendor;