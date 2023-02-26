import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useAttractions } from '../contexts/AttractionContext';

function SingleAttraction(props){
    const { attractions, attractionsLoading } = useAttractions();
    const attractionName = props.attractionName;
    const isChecked = props.isChecked;
    const attraction = attractions.filter((attraction) => attraction.name === attractionName)[0];
    const {loading} = useAuth();
    let timestamp = new Date(attraction.data.lastUpdated);
    // let day = timestamp.getDay();
    let today = new Date();

    //Calculates average wait time for each attraction over the last 14 days.
    let averages = attraction.data.waitTimeAvg.map((times) => {
        return Math.round(times.reduce((a,b)=>{return a+b}) / times.length);
    });

    if(Date.parse(today) - Date.parse(timestamp) > 7*24*60*60*1000){
        timestamp = "No recent updates"
    }
    else{
        timestamp = timestamp.toLocaleString();
    }

    //Takes prop onChange function from the AttractionsLoggedIn component to update checked status.
    //Checks in blue and pushes to the "selectedAttractions" array in the parent component.
    const activeStateChange = (e) => {
        props.onChange(e.target.value.toString());
    }

    useEffect(() => {

    }, [loading])

    return(
        loading || attractionsLoading ? "" :
        <div key={attraction.name} className="attractionCards" style={{backgroundColor: isChecked ? "#c1d0e8" : "#fff"}}>
                        <div className="attraction-header">
                            <h5>{attraction.name}</h5>
                            <div className="form-check form-check-inline">
                                {props.loggedIn ?
                                <input className="form-check-input"
                                    checked={isChecked}
                                    type="checkbox" id={`inline-checkbox-${attraction.name}`}
                                    value={`${attraction.name}`}
                                    onChange={activeStateChange} /> :
                                    ""}
                            </div>
                        </div>
                    <div className="attractionCardBody">
                        <p>Status: {attraction.data.status}</p>
                        <p className="wait-time">Current Wait Time: {attraction.data.currentWaitTime} minutes</p>
                        <p className="time-note">Last Update: {timestamp}</p>
                        <p className="wait-time">Average wait times each hour (in minutes):</p>
                        <p className="time-note">Average over the last 14 days</p>
                        <div className="hourly-chart d-flex container-fluid justify-content-evenly align-items-end">
                            {
                                averages.map((waitTime, index) => {
                                    return(
                                    <div key={`${attraction.name}-wait-${index}`} className="bar d-flex flex-column justify-content-end">
                                        <p className="bar-label">{waitTime ? waitTime : ""}</p>
                                        <div className="bar-height" style={{height: `${waitTime/2}px`}}></div>
                                        <p className="bar-minutes">{index === 12 ? "12" : (index) % 12}{index < 12 ? "a" : "p"}</p>
                                    </div>
                                    )
                                })
                            }
                                    
                        </div>
                    </div>
                </div>
    )
}

export default SingleAttraction;