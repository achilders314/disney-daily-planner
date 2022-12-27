import React, { useState, useEffect }  from 'react';
import SingleAttraction from './SingleAttraction';

export default function Attractions(props){
    let parks = props.parks;
    let attractions = props.attractions;
    console.log(attractions)
    console.log(attractions.length)



    return(
        <main>
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
      </main>
    )
}
