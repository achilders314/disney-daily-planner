import React from 'react'
import SingleAttraction from './SingleAttraction'

export default function AttractionsLoggedIn(props) {
    const parks = props.parks;
    const attractions = props.attractions;

  return (
    <>
        {parks.map((park) => {
            return(
            <div key={park.parkId} className="park">
                <h1 key={`${park.data.name}`}>Name: {park.data.name}</h1>
                <h2>Attractions</h2>
                <div className="attractions">
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
