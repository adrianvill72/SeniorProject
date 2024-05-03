import React, { useState } from 'react';

function EventSearchForm({ handleSearch }) {
  const [genre, setGenre] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');


  return (
      <section className="pt-5 pb-0 position-relative" style={{
        backgroundImage: 'url(social_v1.1.1/template/assets/images/bg/07.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'top center'
      }}>
        <div className="bg-overlay bg-dark opacity-8"></div>
        <div className="container">
          <div className="py-5">
            <div className="row position-relative">
              <div className="col-lg-9 mx-auto">
                <div className="text-center">
                  <h1 className="text-white">Find events near you</h1>
                  <p className="text-white">Let's uncover the best places to eat, drink, and shop nearest to you.</p>
                </div>
                <div className="mx-auto bg-mode shadow rounded p-4 mt-5">
                  <form className="row align-items-end g-4" onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch({genre, fromDate, toDate});
                  }}>
                    <div className="col-sm-6 col-lg-3">
                      <label className="form-label">Select Location</label>
                      <select className="form-select" value={genre} onChange={e => setGenre(e.target.value)}>
                        <option value="">All Categories</option>
                        <option value="comedy">Comedy</option>
                        <option value="dance">Dance</option>
                        <option value="family">Family</option>
                        <option value="music">Music</option>
                        <option value="workshop">Workshop</option>
                      </select>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                      <label className="form-label">Date from</label>
                      <input type="date" className="form-control" value={fromDate}
                             onChange={e => setFromDate(e.target.value)}/>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                      <label className="form-label">Date to</label>
                      <input type="date" className="form-control" value={toDate}
                             onChange={e => setToDate(e.target.value)}/>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                      <button type="submit" className="btn btn-primary w-100">Filter Events</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default EventSearchForm;
