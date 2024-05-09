import React, { useState } from 'react';

function EventSearchForm({ handleSearch, cities, states }) {
  const today = new Date().toISOString().split('T')[0];
  const [location, setLocation] = useState({ city: '', state: '' });
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch({ city: location.city, state: location.state, fromDate, toDate });
  };
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
                  <h1 className="text-white">Find markets near you</h1>
                  <p className="text-white">Discover the best local markets and businesses near you.</p>
                </div>
                <div className="mx-auto bg-mode shadow rounded p-4 mt-5">
                  <form className="row align-items-end g-4" onSubmit={handleSubmit}>
                    <div className="col-sm-6 col-lg-3">
                      <label className="form-label">Select State</label>
                      <select className="form-select" value={location.state}
                              onChange={e => setLocation(prev => ({...prev, state: e.target.value}))}>
                        <option value="">All States</option>
                        {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                      <label className="form-label">Select City</label>
                      <select className="form-select" value={location.city}
                              onChange={e => setLocation(prev => ({...prev, city: e.target.value}))}>
                        <option value="">All Cities</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
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
                      <button type="submit" className="btn btn-primary w-100">Filter Markets</button>
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
