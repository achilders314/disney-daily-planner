import React, {useEffect, useState, useRef} from 'react'
import { Link } from 'react-router-dom';
import SingleAttraction from './SingleAttraction'
import { Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { useAttractions } from '../contexts/AttractionContext';


export default function AttractionsLoggedIn(props){
    const { attractions, restaurants, shows, parks, attractionsLoading } = useAttractions();
    const { userData, currentUser, lookupUserDetails, updateUserDetails } = useAuth();
    const [selectedPark, setSelectedPark] = useState("");
    const [selectedType, setSelectedType] = useState("Attraction");
    const [ modAttractions, setModAttractions ] = useState([]);
    const [selectedAttractions, setSelectedAttractions] = useState([]);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const dateSelector = useRef();
    const typeSelector = useRef();


    //Triggered when user changes the dropdown menu of their trip dates. Updates to the park they've
    //selected for that new date, and updates to which attractions they haven't already selected.
    function changeTripDay(){
        setError('')
        setSuccess('')
        if(dateSelector.current.value){
            let parkDayFilter = userData.trip[0].parkDays.filter((day) => day.tripDate === dateSelector.current.value);
            loadUserAttractions(parkDayFilter);
            setSelectedPark(parkDayFilter[0].park === "None" ? "None" : parkDayFilter[0].park);
        }
        setModAttractions(modAttractions.map((attraction) => {
            return {...attraction, isChecked: false}
        }));
        setSelectedAttractions([]);
        typeSelector.current.value = "Attraction";
        setSelectedType("Attraction");
    }

    function changeType(){
        setError('')
        setSuccess('')
        setSelectedType(typeSelector.current.value)
        setModAttractions(modAttractions.map((attraction) => {
            return {...attraction, isChecked: false}
        }));
        setSelectedAttractions([]);
    }


    //Passed down as a prop to the SingleAttraction component, changes the checked status of each attraction and
    //adds each to the selectedAttractions array. This triggers them to color in blue.
    function changeCheckedStatus(attractionName){
        setError('')
        setSuccess('')
        let attractionsCopy = modAttractions;
        let attractionsEntry = attractionsCopy.findIndex((attraction) => attraction.name === attractionName);
        attractionsCopy[attractionsEntry].isChecked = !attractionsCopy[attractionsEntry].isChecked;
        setModAttractions(attractionsCopy)
        setSelectedAttractions(modAttractions.filter((attraction) => attraction.isChecked));
    }

    //Pushes the selectedAttractions array to the user's data under the correct day.
    async function addToTrip(e){
        e.preventDefault();
        try{
        let selectedAttractionsCopy = selectedAttractions;
        selectedAttractionsCopy = selectedAttractionsCopy.map((attraction) => {
            return {name: attraction.name, type: attraction.type, startTime: "", endTime: ""}
        });
        if(selectedAttractionsCopy.length === 0){
            return setError("Please select at least one attraction to add.")
        }
        if(dateSelector.current.value){
            let parkDayFilter = userData.trip[0].parkDays.filter((day) => day.tripDate === dateSelector.current.value);
            let tripDayIndex = userData.trip[0].parkDays.findIndex((day) => day === parkDayFilter[0]);
            let attractionsCopy = parkDayFilter[0].attractions;
            let result = !attractionsCopy ? selectedAttractionsCopy : [...new Set([...attractionsCopy, ...selectedAttractionsCopy])]
            userData.trip[0].parkDays[tripDayIndex].attractions = result.sort((a,b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) {return 1}
                else if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1}
                else {return 0}
            });
            let tripCopy = userData.trip;
            let update = {};
            update[`users/${currentUser.uid}/trip`] = tripCopy
            await updateUserDetails(update);
            setSelectedAttractions([]);
            await lookupUserDetails();
            return setSuccess("Attractions updated successfully for this date. They should now appear on your \"My Trip\" page.")
        }
    } catch(err){
        setSuccess('');
        console.log(err.message);
        return setError("An error has occurred, please try again.");
    }
    }

    //Sets up the initial selected park to the first day of the user's trip. Returns the entire first day object
    //for their trip which gets used in the "loadUserAttractions" function on initial render.
    function initialSelectedPark(){
        if(Object.keys(userData).length > 0 && userData.trip[0].parkDays){
        if(dateSelector.current.value){
            /*  filters out all of the park day entries to only the one selected in the drop-down - should be an array
            with length 1. */
            let parkDayFilter = userData.trip[0].parkDays.filter((day) => day.tripDate === dateSelector.current.value);
            setSelectedPark(parkDayFilter[0].park === "None" ? "" : parkDayFilter[0].park);
            return parkDayFilter;
        }
        }
        return null;
    }


    //Takes in filtered park day object from initialSelectedPark function, determines which ones the user
    //already chose for that day, and sets them to the modAttractions variable.
    function loadUserAttractions(parkDayFilter){
        const currentAttractions = parkDayFilter[0].attractions ? 
                                   parkDayFilter[0].attractions.map((current) => current.name) : 
                                   [];
        const allAttractions = attractions.concat(restaurants, shows);
        const modifiedAttractions = allAttractions.filter((attraction) => {
                                                    return !currentAttractions.includes(attraction.name);
                                                })
                                                .map((attraction) => {return {name: attraction.name, type: attraction.type, isChecked: false, startTime: "", endTime: "", parkId: attraction.data.parkId}})
                                                
        return setModAttractions(modifiedAttractions);
    }

    useEffect(() => {
        async function setUpAttractions(){
            let initialPark = await initialSelectedPark();
            if(await initialPark && await attractions){
                loadUserAttractions(initialPark);
            }
        }

        setUpAttractions();
    }, [userData, dateSelector, typeSelector, attractionsLoading, attractions])

  return (

        <>
            <div id="attractions-day-filter">
                <Form>
                    <Form.Group className="mx-2">
                        <Form.Label className="text-white">Trip Day:</Form.Label>
                        <Form.Select id="trip-date-selector" as="select" type="select" 
                                    defaultValue={userData.trip.length > 0 ? userData.trip[0].parkDays[0].tripDate : ""} 
                                    onChange={changeTripDay}
                                    ref={dateSelector}
                                    required>
                                {userData.trip[0].parkDays.map((day) => {
                                    return <option key={day.tripDate} value={day.tripDate}>{day.tripDate} ({day.park})</option>
                                })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mx-2">
                        <Form.Label className="text-white">Type:</Form.Label>
                        <Form.Select id="type-selector" as="select" type="select" 
                                    defaultValue={"Attraction"} 
                                    onChange={changeType}
                                    ref={typeSelector}
                                    required>
                                <option value="Attraction">Attractions</option>
                                <option value="Restaurant">Restaurants</option>
                                <option value="Show">Shows</option>
                        </Form.Select>
                    </Form.Group>
                    <Button className="mx-2" onClick={addToTrip}>Add {selectedAttractions.length} to Trip</Button>
                </Form>
            </div>
            {
            selectedPark === 'None' || selectedPark === "" || attractionsLoading ? 
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
                                <h1 key={`${park.data.name}`}>Park: {park.data.name}</h1>
                                <div className="attractions-wrap">
                                    <div className="attractions" style={{borderRadius: "20px"}}>
                                    <h2>{selectedType}s</h2>
                                    {modAttractions.filter((attraction) => {
                                        return attraction.parkId === park.parkId && attraction.type === selectedType
                                    })
                                                .map((attraction) => {
                                                        return(
                                                            <SingleAttraction loggedIn={true} 
                                                                              key={attraction.name} 
                                                                              attractionName={attraction.name} 
                                                                              isChecked={attraction.isChecked}
                                                                              onChange={changeCheckedStatus} />
                                                        )
                                                })
                                    }
                                    </div>
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
