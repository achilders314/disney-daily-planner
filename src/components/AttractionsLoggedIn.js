import React, {useEffect, useState, useRef} from 'react'
import { Link } from 'react-router-dom';
import SingleAttraction from './SingleAttraction'
import { Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';


export default function AttractionsLoggedIn(props){
    const parks = props.parks;
    const { userData, currentUser, lookupUserDetails, updateUserDetails } = useAuth();
    const [selectedPark, setSelectedPark] = useState("");
    const [attractions, setAttractions] = useState([]);
    const [selectedAttractions, setSelectedAttractions] = useState([]);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    let dateSelector = useRef();
    
    function changeTripDay(){
        setError('')
        setSuccess('')
        if(dateSelector.current.value){
            let parkDayFilter = userData.trip[0].parkDays.filter((day) => day.tripDate === dateSelector.current.value);
            setSelectedPark(parkDayFilter[0].park === "None" ? "" : parkDayFilter[0].park);
        }
        setSelectedAttractions([])
    }

    function changeCheckedStatus(attractionName){
        setError('')
        setSuccess('')
        console.log(attractionName)
        let attractionsCopy = attractions;
        let attractionsEntry = attractionsCopy.findIndex((attraction) => attraction.name === attractionName);
        attractionsCopy[attractionsEntry].isChecked = !attractionsCopy[attractionsEntry].isChecked;
        setAttractions(attractionsCopy)
        setSelectedAttractions(attractions.filter((attraction) => attraction.isChecked));     
    }

    async function addToTrip(e){
        e.preventDefault();
        // setAddedAttractions(false);
        // try{
        let selectedAttractionsCopy = selectedAttractions;
        selectedAttractionsCopy = selectedAttractionsCopy.map((attraction) => {
            return {...attraction, isChecked: false, startTime: "", endTime: ""}
        });
        if(selectedAttractionsCopy.length === 0){
            return setError("Please select at least one attraction to add.")
        }
        if(dateSelector.current.value){
            let parkDayFilter = userData.trip[0].parkDays.filter((day) => day.tripDate === dateSelector.current.value);
            let tripDayIndex = userData.trip[0].parkDays.findIndex((day) => day === parkDayFilter[0]);
            let attractionsCopy = parkDayFilter[0].attractions;
            let result = !attractionsCopy ? selectedAttractionsCopy : [...new Set([...attractionsCopy, ...selectedAttractionsCopy])]
            userData.trip[0].parkDays[tripDayIndex].attractions = result;
            let tripCopy = userData.trip;
            let update = {};
            update[`users/${currentUser.uid}/trip`] = tripCopy
            await updateUserDetails(update);
            setSelectedAttractions([]);
            await lookupUserDetails();
            return setSuccess("Attractions updated successfully for this date. They should now appear on your \"My Trip\" page.")
        }
    // } catch(err){
    //     setSuccess('');
    //     console.log(err.message);
    //     return setError("An error has occurred, please try again.");
    // }
        // setAddedAttractions(false);
    }

    useEffect(() => {
        function initialSelectedPark(){
            if(userData && userData.trip && userData.trip.length && userData.trip[0].parkDays){
            if(dateSelector.current.value){
                /*  filters out all of the park day entries to only the one selected in the drop-down - should be an array
                with length 1.  */
                let parkDayFilter = userData.trip[0].parkDays.filter((day) => day.tripDate === dateSelector.current.value);
                setSelectedPark(parkDayFilter[0].park === "None" ? "" : parkDayFilter[0].park);
                return parkDayFilter;
            }
            }
            return null;
        }
        function loadUserAttractions(parkDayFilter){
            const attractionProps = props.attractions;
            const currentAttractions = parkDayFilter[0].attractions ? 
                                       parkDayFilter[0].attractions.map((current) => current.name) : 
                                       [];
            console.log(currentAttractions)
            const modifiedAttractions = attractionProps.map((attraction) => {return {...attraction, isChecked: false, startTime: "", endTime: ""}})
                                                       .filter((attraction) => {
                                                        return !currentAttractions.includes(attraction.name)
                                                        })
            setAttractions(modifiedAttractions);
                                                    }
        let initialPark = initialSelectedPark();
        if(initialPark){
            loadUserAttractions(initialPark);
        }
        
    }, [userData])

  return (

        <>
            <div className="d-flex justify-content-between align-items-end my-4 mx-4">
                <Form >
                    <Form.Group>
                        <Form.Label className="text-white">Trip Day:</Form.Label>
                        <Form.Control id="trip-date-selector" as="select" type="select" 
                                    defaultValue={userData.trip.length > 0 ? userData.trip[0].parkDays[0].tripDate : ""} 
                                    onChange={changeTripDay}
                                    ref={dateSelector}
                                    required>
                                {userData.trip[0].parkDays.map((day) => {
                                    return <option key={day.tripDate} value={day.tripDate}>{day.tripDate} ({day.park})</option>
                                })}
                        </Form.Control>
                    </Form.Group>
                </Form>
                <Button onClick={addToTrip}>Add {selectedAttractions.length} to Trip</Button>
            </div>
            {
            selectedPark === 'None' || selectedPark === "" ? 
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
                                {success && <Alert variant="success">{success}</Alert>}
                                {error && <Alert variant="danger">{error}</Alert>}
                                <h1 key={`${park.data.name}`}>Name: {park.data.name}</h1>
                                <div className="attractions">
                                <h2>Attractions</h2>
                                {attractions.filter(attraction => attraction.data.parkId === park.parkId).map((attraction => {
                                                        
                                    return(
                                        <SingleAttraction loggedIn={true} onChange={changeCheckedStatus} key={attraction.name} attraction={attraction}/>
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
    )
}
