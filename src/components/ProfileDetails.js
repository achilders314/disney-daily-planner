import React, {useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext';

export default function ProfileDetails() {
    const { userData } = useAuth();

    useEffect(() => {
        
    }, [userData])

  return (
    <div>
        <p className="mt-3">
          <ol>
            <li>Select "Update Profile" to create your trip, manage which parks you're visiting, etc.</li>
            <li>Then if you visit the "Attractions" page, you'll be able to select which attractions to add to your personal itinerary!</li>
            <li>Last, visit the "My Trip" page to select a time for each attraction, and it will save or you can create a printable PDF!</li>
          </ol>
         
        </p>
        <p className="overflow-auto">
            Email: {userData.email}
        </p>  
        <p>
            Name: {userData.firstName}
        </p>
        <div>
            Trip Dates: {(userData.trip === undefined || userData.trip[0].tripStart === "") ? 
            <span className='text-muted fst-italic'>No trips yet, please click the button above to add one.</span> : 
            <span>{userData.trip[0].tripStart} - {userData.trip[0].tripEnd}</span>}          
        </div>
        <div>
            Parks: {
                (userData.trip === undefined || userData.trip[0].tripStart === "") ?
                <span className='text-muted fst-italic'>No trips yet, please click the button above to add one.</span> : 
                <ul>
                    {userData.trip[0].parkDays.map((day, index) => {
                      return( 
                        <li key={`${day.tripDate}-details`}> 
                        Day {index+1}: {day.tripDate} - {day.park} - ({day.attractions ? day.attractions.length : 0} attractions)
                        </li>  
                      )
                    })}
                </ul>
            }
        </div>
        <p className="text-center fs-6 text-muted mt-4">Please select "Update Profile" to edit your details.</p>
    </div>
  )
}
