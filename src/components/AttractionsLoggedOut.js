import React from 'react'
import SingleAttraction from './SingleAttraction';
import { useAttractions } from '../contexts/AttractionContext';

export default function AttractionsLoggedOut() {
    const {parks, attractions, attractionsLoading} = useAttractions();

    // Returns attractions stats sorted by park, but no checkboxes. Adds a message to users to go to their 
    // profile page to set up a trip.
    return(
        <>
        <p className="text-center text-white">Want to start adding attractions to your itinerary? Go to your profile and set up your trip dates and parks!</p>
        {attractionsLoading ? "" :
        parks.map((park) => {
            return(
            <div key={park.parkId} className="park">
                <h1 key={`${park.data.name}`}>Park: {park.data.name}</h1>
                <div className="attractions">
                <h2>Attractions</h2>
                {attractions.filter(attraction => attraction.data.parkId === park.parkId).map((attraction => {
                                        
                    return(
                        <SingleAttraction loggedIn={false} key={attraction.name} attractionName={attraction.name} isChecked={false}/>
                    )
                }))}
                </div>
            </div>
            )
        })}
      </>
    )

}
