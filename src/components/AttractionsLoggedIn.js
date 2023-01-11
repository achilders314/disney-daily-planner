import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import SingleAttraction from './SingleAttraction'
import {Form, Button} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import loadingIcon from '../assets/loadingIcon.gif'

export default function AttractionsLoggedIn(props) {
    const parks = props.parks;
    const { loading, userData, currentUser } = useAuth();
    const [selectedPark, setSelectedPark] = useState("");
    const [attractions, setAttractions] = useState([])
    let dateSelector = document.getElementById("trip-date-selector")

    function changeTripDay(){
        let dateSelector = document.getElementById("trip-date-selector")
        if(dateSelector){
            let parkDayFilter = userData.trip[0].parkDays.filter((day) => day.tripDate === dateSelector.value);
            setSelectedPark(parkDayFilter[0].park === "None" ? "" : parkDayFilter[0].park);
        }
    }

    function changeCheckedStatus(attractionName){
        let attractionsCopy = attractions;
        let attractionsEntry = attractionsCopy.findIndex((attraction) => attraction.name === attractionName);
        attractionsCopy[attractionsEntry].isSelected = !attractionsCopy[attractionsEntry].isSelected;
        setAttractions(attractionsCopy);
        console.log(attractions);
    }

    useEffect(() => {
        function initialSelectedPark(){
            let dateSelector = document.getElementById("trip-date-selector")
            if(userData && userData.trip && userData.trip.length && userData.trip[0].parkDays){
            if(dateSelector){
                let parkDayFilter = userData.trip[0].parkDays.filter((day) => day.tripDate === dateSelector.value);
                setSelectedPark(parkDayFilter[0].park === "None" ? "" : parkDayFilter[0].park);
                return parkDayFilter;
            }
            }
            return null;
        }
        function loadUserAttractions(parkDayFilter){
            const attractionProps = props.attractions;
            const parkDayAttractions = parkDayFilter[0].attractions;
            const modifiedAttractions = attractionProps.filter((attraction) => {return !parkDayAttractions.includes(attraction)})
                                                       .map((attraction) => {return {...attraction, isSelected: false}})
            setAttractions(modifiedAttractions);
                                                    }
        let initialPark = initialSelectedPark();
        if(initialPark !== null){
            loadUserAttractions(initialPark);
        }
    }, [userData, dateSelector])

  return (
    <>
        {loading ?
        <div className="d-flex h-50 justify-content-center align-items-center">
            <img src={loadingIcon} style={{backgroundColor: "white", width: "60px", borderRadius: "50%"}} />
        </div> :
        <>
            <div className="d-flex justify-content-between align-items-end my-4 mx-4">
                <Form >
                    <Form.Group>
                        <Form.Label className="text-white">Trip Day:</Form.Label>
                        <Form.Control id="trip-date-selector" as="select" type="select" 
                                    defaultValue={userData.trip.length > 0 ? userData.trip[0].parkDays[0].tripDate : ""} 
                                    onChange={changeTripDay}
                                    required>
                                {userData.trip[0].parkDays.map((day) => {
                                    return <option key={day.tripDate} value={day.tripDate}>{day.tripDate} ({day.park})</option>
                                })}
                        </Form.Control>
                    </Form.Group>
                </Form>
                <Button>Add Selected to Trip</Button>
            </div>
            {
            selectedPark === '' ? 
            <div>
                <div className="attractions py-4">
                    <p>You have no parks selected for this date. Please go to your <Link to="/profile">Profile</Link> to select one
                        or visit the <Link to="/my-trip">My Trip</Link> page to develop a custom itinerary for this date.</p>
                </div>
            </div> :
            <>
                {parks.filter((park) => {
                        return park.data.name === selectedPark;
                    })
                        .map((park) => {
                            return(
                            <div key={park.parkId} className="park">
                                <h1 key={`${park.data.name}`}>Name: {park.data.name}</h1>
                                <div className="attractions">
                                <h2>Attractions</h2>
                                {attractions.filter(attraction => attraction.data.parkId === park.parkId).map((attraction => {
                                                        
                                    return(
                                        <SingleAttraction onChange={() => changeCheckedStatus(attraction.name)} key={attraction.name} attraction={attraction}/>
                                    )
                                }))}
                                </div>
                            </div>
                            )
                        })
                }
            </>
            }
        </>
        }
    </>
    )
}
