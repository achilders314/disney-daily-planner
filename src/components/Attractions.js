import React, { useState, useEffect }  from 'react';
import { useAuth } from '../contexts/AuthContext';
import AttractionsLoggedIn from './AttractionsLoggedIn'
import AttractionsLoggedOut from './AttractionsLoggedOut';
import loadingIcon from '../assets/loadingIcon.gif';

export default function Attractions(props){
    const parks = props.parks;
    const attractions = props.attractions;
    const { loading, userData } = useAuth();

    // array of objects, containing each day's park, date, & attractions

    useEffect(() => {

    }, [userData])

    return(
        <main>            
                {loading || !userData ? 
                <div className="d-flex h-50 justify-content-center align-items-center">
                    <img src={loadingIcon} style={{backgroundColor: "white", width: "60px", borderRadius: "50%"}} />
                </div> :
                <>
                    {userData && userData.trip && userData.trip[0].tripStart !== "" && userData.trip[0].parkDays[0].park ? //user has trip & park data
                        <AttractionsLoggedIn parks={parks} attractions={attractions} />: 
                        <AttractionsLoggedOut parks={parks} attractions={attractions} />
                    }
                </>
                }
        </main>
    )
}
