import React from 'react'
import { Link } from 'react-router-dom'
import mickeyImage from '../assets/mickey-placeholder.jpg'
import { Container } from 'react-bootstrap'


export default function NotFound() {
  return (
    <div id="not-found-message"
                className="d-flex justify-content-center align-items-center">
      <div 
          className="d-flex flex-column justify-content-center align-items-center my-4 bg-white"
          style={{ height: "70vh", maxWidth: "400px"}}>
        <h2>404</h2>
        <h1>Page Not Found</h1>
        <img src={mickeyImage} alt="pic of sad Mickey Mouse" 
              style={{height: "40vh"}} />
        <p>Oh boy! We can't find the page you're looking for. Please head to the <Link to="/">Home Page</Link> and try again.</p>
      </div>
    </div>
  )
}
