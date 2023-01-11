import React from 'react'
import SingleAttraction from './SingleAttraction';

export default function AttractionsLoggedOut(props) {
    let parks = props.parks;
    let attractions = props.attractions;


    return(
        <>
        <p className="text-center text-white">Want to start adding attractions to your itinerary? Go to your profile and set up your trip dates and parks!</p>
        {parks.map((park) => {
            return(
            <div key={park.parkId} className="park">
                <h1 key={`${park.data.name}`}>Name: {park.data.name}</h1>
                <div className="attractions">
                <h2>Attractions</h2>
                {attractions.filter(attraction => attraction.data.parkId === park.parkId).map((attraction => {
                                        
                    return(
                        <SingleAttraction key={attraction.name} attraction={attraction}/>
                    )
                }))}
                </div>
            </div>
            )
        })}
      </>
    )

}
