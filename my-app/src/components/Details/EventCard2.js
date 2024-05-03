import React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue,off } from "firebase/database";
function EventCard2({ title, image}) {
console.log("image inside eventcard2",image)

  return (
      <section className="py-5 position-relative" style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <div className="bg-overlay bg-dark opacity-8"></div>
        <div className="container">
          <div className="py-5">
            <div className="row position-relative">
              <div className="col-xl-8 col-lg-10 mx-auto pt-sm-5 text-center">
                <ul className="nav nav-divider justify-content-center text-white pt-2 small mb-4">
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#!"> Events</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#!"> Live Event</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#!"> Featured </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#!"> Music </a>
                  </li>
                </ul>
                <h1 className="text-white">{title}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default EventCard2;
