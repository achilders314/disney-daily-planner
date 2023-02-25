import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
        <section id="hero">
          <div id="darken">
            <h1 className='text-white'>Disney Daily Planner</h1>
            <h2>View wait times, plan your ultimate Disney World trip.</h2>
          </div>
        </section>
        <div id="how-to" className="bg-white">
          <div className="steps-card d-flex flex-column align-items-center justify-content-center">
            <i className="text-gray fa-solid fa-calendar-days"></i>
            <h4>Setup Trip Dates</h4>
          </div>
          <div className="steps-card d-flex flex-column align-items-center justify-content-center">
            <i className="fa-brands fa-fort-awesome"></i>            
            <h4>Add Attractions to Each Day</h4>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <i className="fa-solid fa-clipboard-list"></i>            
            <h4>Create Your Custom Itinerary</h4>
          </div>
        </div>
        <section id="explanation">
          <h3>Hello and welcome!</h3>
          <p>With Disney Daily Planner, planning your next Walt Disney World vacation can be a snap! In just a few simple steps, you can start planning your vacation and maximizing your time.</p>
          <ol>
            <li>Create an <Link to="/sign-up">account</Link> or <Link to="/login">log in.</Link></li>
            <li>Visit your <Link to="/profile">profile</Link> page to enter your trip dates & parks.</li>
            <li>Visit the <Link to="/attractions">Attractions</Link> page to view typical wait times and add activities to each park day.</li>
            <li>Visit the <Link to="/my-trip">My Trip</Link> page to see your attractions and create a detailed itinerary!</li>
            <li>Save this info and use the app on your park days, or create a printable PDF!</li>
          </ol>
        </section>
        <section id="call-to-action" className="w-100 d-flex justify-content-center align-items-center">
            <h3 className="text-white">What are you waiting for? The magic starts <Link className="cta-link" to="/profile">here</Link>!</h3>
        </section>
    </>
  )
}
