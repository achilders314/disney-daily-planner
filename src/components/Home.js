import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="d-flex justify-content-center align-items-center flex-column"
          style={{ minHeight: "80vh"}}>
            <h1 className='text-white mb-4'>Welcome!</h1>
        <div className="bg-white rounded p-4 w-75">
            <p>This page is still under construction. Currently users are able to:</p>
            <ul>
                <li>View the Home, Contact, and <Link to="/attractions">Attractions</Link> pages.</li>
                <li>Sign up or log in using either email or Google authentication through Firebase.</li>
                <li>View their <Link to="my-trip">My Trip</Link> page.</li>
                <li>View their <Link to="profile">Profile</Link> page and edit their name, trip dates & parks.</li>
            </ul>
            <p>The plan for the near future is to allow users to:</p>
            <ul>
                <li>Add attractions, restaurants, and shows to each day of your trip</li>
                <li>Create a customized schedule of those attractions</li>
                <li>Save for trip day or create a printable PDF itinerary</li>
            </ul>
            <p>Stay tuned! Keep checking back for updates.</p>
            <p>Want to donate to help me develop this site and take my kiddo to Disney? Click the button below to donate with Paypal!</p>
            <form className="text-center" action="https://www.paypal.com/donate" method="post" target="_top">
              <input type="hidden" name="hosted_button_id" value="354AEWWXF4Z8A" />
              <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
              <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
            </form>

        </div>
    </main>
  )
}
