import React from 'react';

function ModalCreateEvents() {
  return (
    <div className="modal fade" id="modalCreateEvents" tabIndex="-1" aria-labelledby="modalLabelCreateEvents" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Modal feed header START */}
          <div className="modal-header">
            <h5 className="modal-title" id="modalLabelCreateEvents">Create event</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          {/* Modal feed header END */}
          {/* Modal feed body START */}
          <div className="modal-body">
            {/* Form START */}
            <form className="row g-4">
              {/* Title */}
              <div className="col-12">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" placeholder="Event name here" />
              </div>
              {/* Description */}
              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows="2" placeholder="Ex: topics, schedule, etc."></textarea>
              </div>
              {/* Date */}
              <div className="col-sm-4">
                <label className="form-label">Date</label>
                <input type="text" className="form-control flatpickr" placeholder="Select date" />
              </div>
              {/* Time */}
              <div className="col-sm-4">
                <label className="form-label">Time</label>
                <input type="text" className="form-control flatpickr" data-enabletime="true" data-nocalendar="true" placeholder="Select time" />
              </div>
              {/* Duration */}
              <div className="col-sm-4">
                <label className="form-label">Duration</label>
                <input type="text" className="form-control" placeholder="1hr 23m" />
              </div>
              {/* Location */}
              <div className="col-12">
                <label className="form-label">Location</label>
                <input type="text" className="form-control" placeholder="Logansport, IN 46947" />
              </div>
              {/* Add guests */}
              <div className="col-12">
                <label className="form-label">Add guests</label>
                <input type="email" className="form-control" placeholder="Guest email" />
              </div>
              {/* Avatar group START */}
              <div className="col-12 mt-3">
                <ul className="avatar-group list-unstyled align-items-center mb-0">
                  <li className="avatar avatar-xs">
                    <img className="avatar-img rounded-circle" src="social_v1.1.1/template/assets/images/avatar/01.jpg" alt="avatar" />
                  </li>
                  {/* Add more avatar li elements here */}
                  <li className="ms-3">
                    <small> +50 </small>
                  </li>
                </ul>
              </div>
              {/* Dropzone photo START */}
              <div className="mb-3">
                <label className="form-label">Upload attachment</label>
                <div className="dropzone dropzone-default card shadow-none" data-dropzone='{"maxFiles":2}'>
                  <div className="dz-message">
                    <i className="bi bi-file-earmark-text display-3"></i>
                    <p>Drop presentation and document here or click to upload.</p>
                  </div>
                </div>
              </div>
              {/* Dropzone photo END */}
            </form>
            {/* Form END */}
          </div>
          {/* Modal feed body END */}
          {/* Modal footer */}
          {/* Button */}
          <div className="modal-footer">
            <button type="button" className="btn btn-danger-soft me-2" data-bs-dismiss="modal"> Cancel</button>
            <button type="button" className="btn btn-success-soft">Create now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCreateEvents;
