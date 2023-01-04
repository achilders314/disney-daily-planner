import React from 'react'

export default function ProfileDetails(props) {
    const userDetails = props.userDetails;
  return (
    <div>
        <p className="mt-3">(Coming Soon) You'll be able to pick which 
                attractions you'd like to visit and create a customized schedule for your 
                Walt Disney World trip! Keep visiting this page regularly as updates come out.
        </p>
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
        <p className="text-center fs-6 text-muted mt-4">Please select "Update Profile" to edit your details.</p>
    </div>
  )
}
