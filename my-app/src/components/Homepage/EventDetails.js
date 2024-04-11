import React from 'react';

function EventDetails() {
  return (
    <div className="card h-100">
      <div className="position-relative">
        <img className="img-fluid rounded-top" src="social_v1.1.1/template/assets/images/events/01.jpg" alt="" />
        <div className="badge bg-danger text-white mt-2 me-2 position-absolute top-0 end-0">
          Online
        </div>
      </div>
      <div className="card-body position-relative pt-0">
        <button className="btn btn-xs btn-primary mt-n3" onClick={() => { window.location.href = 'event-details-2.html'; }}>Spa training</button>
        <h6 className="mt-3"><a href="event-details-2.html">Bone thugs-n-harmony</a></h6>
        <p className="mb-0 small"><i className="bi bi-calendar-check pe-1"></i> Mon, Sep 25, 2020 at 9:30 AM</p>
        <p className="small"><i className="bi bi-geo-alt pe-1"></i> San francisco</p>
        <ul className="avatar-group list-unstyled align-items-center mb-0">
          <li className="avatar avatar-xs">
            <img className="avatar-img rounded-circle" src="social_v1.1.1/template/assets/images/avatar/01.jpg" alt="avatar" />
          </li>
          <li className="avatar avatar-xs">
            <img className="avatar-img rounded-circle" src="social_v1.1.1/template/assets/images/avatar/03.jpg" alt="avatar" />
          </li>
          <li className="avatar avatar-xs">
            <img className="avatar-img rounded-circle" src="social_v1.1.1/template/assets/images/avatar/04.jpg" alt="avatar" />
          </li>
          <li className="avatar avatar-xs">
            <div className="avatar-img rounded-circle bg-primary"><span className="smaller text-white position-absolute top-50 start-50 translate-middle">+78</span></div>
          </li>
          <li className="ms-3">
            <small>are attending</small>
          </li>
        </ul>
        <div className="d-flex mt-3 justify-content-between">
          <div className="w-100">
            <input type="checkbox" className="btn-check d-block" id="Interested1" />
            <label className="btn btn-sm btn-outline-success d-block" htmlFor="Interested1"><i className="bi bi-thumbs-up"></i> Interested</label>
          </div>
          <div className="dropdown ms-3">
            <button className="btn btn-sm btn-primary-soft" id="eventActionShare" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-share-fill"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="eventActionShare">
              <li><button className="dropdown-item" onClick={() => { /* Your logic here */ }}><i className="bi bi-envelope"></i> Send via Direct Message</button></li>
              <li><button className="dropdown-item" onClick={() => { /* Your logic here */ }}><i className="bi bi-bookmark-check"></i> Share to News Feed</button></li>
              <li><button className="dropdown-item" onClick={() => { /* Your logic here */ }}><i className="bi bi-people"></i> Share to a group</button></li>
              <li><button className="dropdown-item" onClick={() => { /* Your logic here */ }}><i className="bi bi-share"></i> Share post via …</button></li>
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item" onClick={() => { /* Your logic here */ }}><i className="bi bi-person"></i> Share on a friend's profile</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
