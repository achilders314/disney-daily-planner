import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'

export default function MyTrip() {
  const [userDetails, setUserDetails] = useState('');
  const { lookupUserDetails, currentUser } = useAuth();
  
  useEffect(() => {
    async function getUserDetails(){
      try{
        await lookupUserDetails(currentUser).then(data => {
          setUserDetails(data);
        })        
      } catch(e){
        console.log(e);
      }
    }
    getUserDetails();
    
  }, [])

  return (
    <main className="d-flex justify-content-center align-items-center flex-column"
          style={{ minHeight: "80vh"}}>
        <h2 className="text-white mb-4">My Trip</h2>
        <div className="bg-white rounded p-4 w-75">
          <p>(Coming Soon) Soon, you'll be able to choose your trip dates, pick which 
            attractions you'd like to visit, and create a customized schedule for your 
            Walt Disney World trip! Keep visiting this page regularly as updates come out.
          </p>
          <h3>User Details:</h3>
          <p>
            Email: {userDetails.email}
          </p>  
          <p>
            Name: {userDetails.firstName}
          </p>      
          <div>
            Trip Dates: {(userDetails.trip == undefined || userDetails.trip.length == 0) ? 
            <span className='text-muted fst-italic'>No trips yet, please visit <Link to="/profile">your profile</Link> to add one.</span> : 
            <span>{userDetails.trip[0].tripStart} - {userDetails.trip[0].tripEnd}</span>}          
          </div>
          <p className="text-center fs-6 text-muted mt-4">Please visit your profile page to edit your details.</p>
        </div>
    </main>
  )
}
