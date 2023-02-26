import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useAttractions } from '../contexts/AttractionContext';

function AttractionPopUp(props){
    const { attractions, attractionsLoading } = useAttractions();
    const attractionName = props.attractionName;
    const attraction = attractions?.filter((attraction) => attraction.name === attractionName)[0];
    const {loading} = useAuth();
    let timestamp = attractionsLoading ? "" : new Date(attraction?.data?.lastUpdated);
    // let day = timestamp.getDay();
    let today = new Date();

    //TODOTODOTODO refactor this to be more D.R.Y.
    //Calculates average wait time for each attraction over the last 14 days.
    let averages = attraction?.data?.waitTimeAvg.map((times) => {
        return Math.round(times.reduce((a,b)=>{return a+b}) / times.length);
    });

    if(Date.parse(today) - Date.parse(timestamp) > 7*24*60*60*1000){
        timestamp = "No recent updates"
    }
    else{
        timestamp = timestamp.toLocaleString();
    }


    return(
        loading || attractionsLoading ? "" :
        <div className="attractionPopUp" style={{backgroundColor: "#fff"}}>
                        <div className="attraction-header">
                            <h5>{attractionName}</h5>
                        </div>
                    <p>Status: {attraction?.data?.status}</p>
                    <p className="wait-time">Current Wait Time: {attraction?.data?.currentWaitTime} minutes</p>
                    <p className="time-note">Last Update: {timestamp}</p>
                    <p className="wait-time">Average wait times each hour (in minutes):</p>
                    <p className="time-note">Average over the last 14 days</p>
                    <div className="hourly-chart d-flex container-fluid justify-content-evenly align-items-end">
                        {
                                averages?.map((waitTime, index) => {
                                    return(
                                    <div key={`${attraction.name}-popup-${index}`} className="bar d-flex flex-column justify-content-end">
                                        <p key={`${attraction.name}-waitTime-${index}`} className="bar-label">{waitTime ? waitTime : ""}</p>
                                        <div key={`${attraction.name}-bar-${index}`} className="bar-height" style={{height: `${waitTime/2}px`}}></div>
                                        <p key={`${attraction.name}-time-${index}`} className="bar-minutes">{index === 12 ? "12" : (index) % 12}{index < 12 ? "a" : "p"}</p>
                                    </div>
                                    )
                                })
                        }
                    
                    </div>
                    </div>
    )
}

export default AttractionPopUp;