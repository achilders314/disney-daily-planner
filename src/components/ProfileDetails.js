import React from 'react'

export default function ProfileDetails(props) {
    const userDetails = props.userDetails;
  return (
    <div>
        <p>
            Email: {userDetails.email}
        </p>  
        <p>
            Name: {userDetails.firstName}
        </p>
        <div>
            Trip Dates: {(userDetails.trip == undefined || userDetails.trip.length == 0) ? 
            <span className='text-muted fst-italic'>No trips yet, please click the button above to add one.</span> : 
            <span>{userDetails.trip[0].tripStart} - {userDetails.trip[0].tripEnd}</span>}          
        </div>
        <p className="text-center fs-6 text-muted mt-4">Please visit your profile page to edit your details.</p>
    </div>
  )
}
