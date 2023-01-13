import React, { useEffect }  from 'react';
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
                    <img src={loadingIcon} alt="loading spinner" style={{backgroundColor: "white", width: "60px", borderRadius: "50%"}} />
                </div> :
                <>
                    {Object.keys(userData).length > 0 && userData.trip[0].tripStart !== "" ? //user has trip & park data
                        <AttractionsLoggedIn parks={parks} attractions={attractions} />: 
                        <AttractionsLoggedOut parks={parks} attractions={attractions} />
                    }
                </>
                }
        </main>
    )
}
