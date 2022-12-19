import React  from 'react';

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
                    <div key={attraction.name} className="attractionCards">
                        <div className="attraction-header">
                            <h5>{attraction.name}</h5>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                            </div>
                        </div>
                    <p>Status: {attraction.data.status}</p>
                    <p>Current Wait Time: {attraction.data.currentWaitTime} minutes</p>
                    <p className="time-note">Last Update: {attraction.data.lastUpdated}</p>
                    </div>
                    )
                }))}
                </div>
            </div>
            )
        })}
      </main>
    )
}
