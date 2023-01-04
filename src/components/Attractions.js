import React, { useState, useEffect }  from 'react';
import { useAuth } from '../contexts/AuthContext';
import AttractionsLoggedIn from './AttractionsLoggedIn'
import AttractionsLoggedOut from './AttractionsLoggedOut';
import loadingIcon from '../assets/loadingIcon.gif';

export default function Attractions(props){
    const parks = props.parks;
    const attractions = props.attractions;
    const { loading, userData, currentUser } = useAuth();

    useEffect(() => {
        
    }, [userData])

    return(
        <main>
            {loading ? 
            <div className="d-flex h-50 justify-content-center align-items-center">
                <img src={loadingIcon} style={{backgroundColor: "white", width: "60px", borderRadius: "50%"}} />
            </div> :
            currentUser && userData.trip.length > 0 && userData.trip[0].parkDays[0].park !== "" ? //user has trip & park data
            <AttractionsLoggedIn parks={parks} attractions={attractions} /> : 
            <AttractionsLoggedOut parks={parks} attractions={attractions} />
            }
        </main>
    )
}
