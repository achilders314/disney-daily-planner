import React, {useEffect} from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAttractions } from '../contexts/AttractionContext';
import AttractionsLoggedIn from './AttractionsLoggedIn'
import AttractionsLoggedOut from './AttractionsLoggedOut';
import loadingIcon from '../assets/loadingIcon.gif';

export default function Attractions(){
    const { attractionsLoading } = useAttractions();
    const { loading, userData, currentUser } = useAuth();

    // array of objects, containing each day's park, date, & attractions

    //Detects loading state of user data & attractions
    //Then, detects whether user data & trip array exists.
    //If both exist, returns a page with attractions by trip date, and excludes ones they've already checked.

    useEffect(() => {

    }, [userData])

    return(
        <main>            
                {loading || attractionsLoading ? 
                <div className="d-flex h-50 justify-content-center align-items-center">
                    <img src={loadingIcon} alt="loading spinner" style={{backgroundColor: "white", width: "60px", borderRadius: "50%"}} />
                </div> :
                <>
                    {Object.keys(userData).length > 0 && userData.trip[0].tripStart !== "" ? //user has trip & park data
                        <AttractionsLoggedIn />: 
                        <AttractionsLoggedOut />
                    }
                </>
                }
        </main>
    )
}
