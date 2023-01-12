import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';

function SingleAttraction(props){
    const attraction = props.attraction;
    const {currentUser} = useAuth();
    let timestamp = new Date(attraction.data.lastUpdated);
    let day = timestamp.getDay();
    let today = new Date();
    let waitTimes8 = Math.round(attraction.data.waitTimeAvg[8].reduce((a,b) => {return a+b}) / attraction.data.waitTimeAvg[8].length);
    let waitTimes9 = Math.round(attraction.data.waitTimeAvg[9].reduce((a,b) => {return a+b}) / attraction.data.waitTimeAvg[9].length);
    let waitTimes10 = Math.round(attraction.data.waitTimeAvg[10].reduce((a,b) => {return a+b}) / attraction.data.waitTimeAvg[10].length);
    let waitTimes11 = Math.round(attraction.data.waitTimeAvg[11].reduce((a,b) => {return a+b}) / attraction.data.waitTimeAvg[11].length);
    let waitTimes12 = Math.round(attraction.data.waitTimeAvg[12].reduce((a,b) => {return a+b}) / attraction.data.waitTimeAvg[12].length);
    let waitTimes13 = Math.round(attraction.data.waitTimeAvg[13].reduce((a,b) => {return a+b}) / attraction.data.waitTimeAvg[13].length);
    let waitTimes14 = Math.round(attraction.data.waitTimeAvg[14].reduce((a,b) => {return a+b}) / attraction.data.waitTimeAvg[14].length);
    let waitTimes15 = Math.round(attraction.data.waitTimeAvg[15].reduce((a,b) => {return a+b}) / attraction.data.waitTimeAvg[15].length);
    let waitTimes16 = Math.round(attraction.data.waitTimeAvg[16].reduce((a,b) => {return a+b}) / attraction.data.waitTimeAvg[16].length);
    let waitTimes17 = Math.round(attraction.data.waitTimeAvg[17].reduce((a,b) => {return a+b}) / attraction.data.waitTimeAvg[17].length);
    let waitTimes18 = Math.round(attraction.data.waitTimeAvg[18].reduce((a,b) => {return a+b}) / attraction.data.waitTimeAvg[18].length);
    let waitTimes19 = Math.round(attraction.data.waitTimeAvg[19].reduce((a,b) => {return a+b}) / attraction.data.waitTimeAvg[19].length);

    if(Date.parse(today) - Date.parse(timestamp) > 7*24*60*60*1000){
        timestamp = "No recent updates"
    }
    else{
        timestamp = timestamp.toLocaleString();
    }

    const activeStateChange = (e) => {
        props.onChange(e.target.value.toString());
    }

    return(
        <div key={attraction.name} className="attractionCards" style={{backgroundColor: attraction.isChecked ? "#c1d0e8" : "#fff"}}>
                        <div className="attraction-header">
                            <h5>{attraction.name}</h5>
                            <div className="form-check form-check-inline">
                                {props.loggedIn ?
                                <input className="form-check-input"
                                    checked={attraction.isChecked}
                                    type="checkbox" id={`inline-checkbox-${attraction.name}`}
                                    value={`${attraction.name}`}
                                    onChange={activeStateChange} /> :
                                    ""}
                            </div>
                        </div>
                    <p>Status: {attraction.data.status}</p>
                    <p className="wait-time">Current Wait Time: {attraction.data.currentWaitTime} minutes</p>
                    <p className="time-note">Last Update: {timestamp}</p>
                    <p className="wait-time">Average wait times each hour (in minutes):</p>
                    <p className="time-note">Average over the last 14 days</p>
                    <div className="hourly-chart d-flex container-fluid justify-content-evenly align-items-end">
                        <div className="bar d-flex flex-column justify-content-end">
                            <p className="bar-label">{waitTimes8 ? waitTimes8 : ""}</p>
                            <div className="bar-height" style={{height: `${waitTimes8/2}px`}}></div>
                            <p className="bar-minutes">8a</p>
                        </div>
                        <div className="bar d-flex flex-column justify-content-end">
                            <p className="bar-label">{waitTimes9 ? waitTimes9 : ""}</p>
                            <div className="bar-height" style={{height: `${waitTimes9/2}px`}}></div>
                            <p className="bar-minutes">9a</p>
                        </div>
                        <div className="bar d-flex flex-column justify-content-end">
                            <p className="bar-label">{waitTimes10 ? waitTimes10 : ""}</p>
                            <div className="bar-height" style={{height: `${waitTimes10/2}px`}}></div>
                            <p className="bar-minutes">10a</p>
                        </div>
                        <div className="bar d-flex flex-column justify-content-end">
                            <p className="bar-label">{waitTimes11 ? waitTimes11 : ""}</p>
                            <div className="bar-height" style={{height: `${waitTimes11/2}px`}}></div>
                            <p className="bar-minutes">11a</p>
                        </div>
                        <div className="bar d-flex flex-column justify-content-end">
                            <p className="bar-label">{waitTimes12 ? waitTimes12 : ""}</p>
                            <div className="bar-height" style={{height: `${waitTimes12/2}px`}}></div>
                            <p className="bar-minutes">12p</p>
                        </div>
                        <div className="bar d-flex flex-column justify-content-end">
                            <p className="bar-label">{waitTimes13 ? waitTimes13 : ""}</p>
                            <div className="bar-height" style={{height: `${waitTimes13/2}px`}}></div>
                            <p className="bar-minutes">1p</p>
                        </div>
                        <div className="bar d-flex flex-column justify-content-end">
                            <p className="bar-label">{waitTimes14 ? waitTimes14 : ""}</p>
                            <div className="bar-height" style={{height: `${waitTimes14/2}px`}}></div>
                            <p className="bar-minutes">2p</p>
                        </div>
                        <div className="bar d-flex flex-column justify-content-end">
                            <p className="bar-label">{waitTimes15 ? waitTimes15 : ""}</p>
                            <div className="bar-height" style={{height: `${waitTimes15/2}px`}}></div>
                            <p className="bar-minutes">3p</p>
                        </div>
                        <div className="bar d-flex flex-column justify-content-end">
                            <p className="bar-label">{waitTimes16 ? waitTimes16 : ""}</p>
                            <div className="bar-height" style={{height: `${waitTimes16/2}px`}}></div>
                            <p className="bar-minutes">4p</p>
                        </div>
                        <div className="bar d-flex flex-column justify-content-end">
                            <p className="bar-label">{waitTimes17 ? waitTimes17 : ""}</p>
                            <div className="bar-height" style={{height: `${waitTimes17/2}px`}}></div>
                            <p className="bar-minutes">5p</p>
                        </div>
                        <div className="bar d-flex flex-column justify-content-end">
                            <p className="bar-label">{waitTimes18 ? waitTimes18 : ""}</p>
                            <div className="bar-height" style={{height: `${waitTimes18/2}px`}}></div>
                            <p className="bar-minutes">6p</p>
                        </div>
                        <div className="bar d-flex flex-column justify-content-end">
                            <p className="bar-label">{waitTimes19 ? waitTimes19 : ""}</p>
                            <div className="bar-height" style={{height: `${waitTimes19/2}px`}}></div>
                            <p className="bar-minutes">7p</p>
                        </div>
                    
                    </div>
                    </div>
    )
}

export default SingleAttraction;