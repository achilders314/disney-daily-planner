import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="d-flex justify-content-center align-items-center flex-column"
          style={{ minHeight: "80vh"}}>
            <h1 className='text-white mb-4'>Home Page</h1>
        <div className="bg-white rounded p-4 w-75">
            <p>This page is still under construction. Visit the <Link to="/attractions">Attractions</Link> page 
              to see what's been done so far or click the dropdown menu in the 
              upper-right corner to sign up and create an account!
            </p>
            <p>The plan for the near future is to allow users to:</p>
            <ul>
                <li>Add their trip dates to their "My Trip" page</li>
                <li>Add attractions, restaurants, and shows to each day of your trip</li>
                <li>Create a customized schedule of those attractions</li>
                <li>Save for trip day or create a printable PDF itinerary</li>
            </ul>
            <p>Stay tuned! Keep checking back for updates.</p>
        </div>
    </main>
  )
}
