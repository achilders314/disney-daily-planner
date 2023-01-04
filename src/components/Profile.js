import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from 'react-bootstrap';
import ProfileDetails from './ProfileDetails';
import ProfileUpdate from './ProfileUpdate';

export default function Profile() {
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState('');
    const [updateMode, setUpdateMode] = useState(false);
    const { lookupUserDetails, currentUser } = useAuth();

    useEffect(() => {
        async function getUserDetails(){
        try{
            await lookupUserDetails(currentUser).then(data => {
            setUserDetails(data);
            setLoading(false);
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
        <h2 className="text-white mb-4">My Profile</h2>
        <div className="bg-white rounded p-4 w-75">
            <div className="d-flex flex-column align-items-end">
                {updateMode ? 
                <Button type="button" variant="danger" onClick={() => {setUpdateMode(!updateMode)}}>Discard Changes</Button> :
                <Button type="button" 
                        variant="primary"
                        disabled={loading} 
                        onClick={() => {setUpdateMode(!updateMode)}}>Update Profile</Button>
                }
                
            </div>
            <h3>User Details:</h3>
            {updateMode ? <ProfileUpdate userDetails={userDetails} /> : <ProfileDetails userDetails={userDetails}/>}
        </div>
  </main>

  )
}


{/* <p>
Name: {userDetails.firstName}
</p>
<p>
Email: {userDetails.email}
</p>        
<div>
Trip Dates: {(userDetails.trip == undefined || userDetails.trip.length == 0) ? 
<span className='text-muted fst-italic'>No trips yet, please click the button above to add one.</span> : 
<span>{userDetails.trip[0].tripStart} - {userDetails.trip[0].tripEnd}</span>}          
</div>
<p className="text-center fs-6 text-muted mt-4">Please visit your profile page to edit your details.</p> */}
