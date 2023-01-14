import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from 'react-bootstrap';
import ProfileDetails from './ProfileDetails';
import ProfileUpdate from './ProfileUpdate';
import loadingIcon from '../assets/loadingIcon.gif'

export default function Profile() {

    const [updateMode, setUpdateMode] = useState(false);
    const { loading, userData, currentUser } = useAuth();

    useEffect(() => {

    }, [userData])

    return (
        <main className="d-flex justify-content-center align-items-center flex-column"
        style={{ minHeight: "80vh"}}>
        {loading || !userData || !currentUser ? 
        <div className="d-flex h-50 justify-content-center align-items-center">
            <img src={loadingIcon} alt="loading spinner" style={{backgroundColor: "white", width: "60px", borderRadius: "50%"}} />
        </div> :
        <>
            <h2 className="text-white mb-4">{userData.firstName === "" || userData.firstName === undefined ?
                                            "My Profile":
                                            `Profile: ${userData.firstName}`}</h2>
            <div className="bg-white rounded p-4 w-75">
                <div className="d-flex flex-column align-items-end mb-3">
                    {updateMode ? 
                    <Button type="button" variant="danger" onClick={() => {
                        setUpdateMode(!updateMode)
                    }}>Return to Profile</Button> :
                    <Button type="button" 
                            variant="primary"
                            disabled={loading} 
                            onClick={() => {setUpdateMode(!updateMode)}}>Update Profile</Button>
                    }
                </div>
                <h3>User Details:</h3>
                {updateMode ? <ProfileUpdate /> : <ProfileDetails />}
            </div>
        </>
        }
  </main>

  )
}