import React from 'react';
import  useFetchUser  from '../../hooks/useFetchUser';
import { Link } from 'react-router-dom';
function EventOverview({ data }) {

    console.log("eventData at eventoverview", data);
    const creatorDetails = useFetchUser(data.creator);
    console.log("creatorDetails:", data.creator);
    const participantsDetails = useFetchUser(data.participants);
    console.log("participantsDetails", participantsDetails);
    if (!data) {
        return <div>Loading event details...</div>;
    }

    if (!creatorDetails) {
        return <div>Loading creator details...</div>;
    }

    return(
        <section className="py-5">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-4">
                        <div className="card card-body">
                            <button className="btn btn-primary w-100">Apply</button>
                            <div className="mt-4">
                                <ul className="list-unstyled mb-4">
                                    <li className="d-flex justify-content-between mb-3">
                                        <strong className="w-150px">Show Date & time:</strong>
                                        <span className="text-end">{data.date || 'Date not set'}</span>
                                    </li>
                                    <li className="d-flex justify-content-between mb-3">
                                        <strong className="w-150px">Address:</strong>
                                        <span className="text-end">{data.location || 'Address not available'}</span>
                                    </li>
                                </ul>
                                <h4>Vendors</h4>
                                <ul className="avatar-group list-unstyled align-items-center mb-0">
                                    {/* Example of dynamic rendering of avatars if needed */}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card card-body">
                            <h4>Description</h4>
                            <p>{data.description || 'No description available'}</p>
                            <div className="mt-4 mt-sm-5">
                                <h4>Host</h4>
                                <div className="row g-4">
                                    <div className="d-flex align-items-center">
                                        <div className="avatar avatar-lg me-3">
                                            <img className="avatar-img rounded-circle" src={creatorDetails.profileImage}
                                                 alt="Host Avatar"/>
                                        </div>
                                        <div>
                                            <h6 className="mb-0">
                                                <Link to={`/profile/${data.creator}`}>{creatorDetails.name}</Link>
                                            </h6>
                                            <span>{creatorDetails.title || 'Event Host/Manager'}</span>
                                        </div>
                                    </div>
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
