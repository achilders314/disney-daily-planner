import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Form, Button } from 'react-bootstrap';
import loadingIcon from '../assets/loadingIcon.gif'

export default function MyTrip() {
  const { currentUser, userData, loading, updateUserDetails, lookupUserDetails } = useAuth();
  const [scheduled, setScheduled] = useState([]);
  const [unscheduled, setUnscheduled] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  let dateSelector = useRef();

  function changeTripDay(){
      setError('')
      setSuccess('')
      if(dateSelector.current.value){
          let parkDayFilter = userData.trip[0].parkDays.filter((day) => day.tripDate === dateSelector.current.value);
          const scheduledAttractions = parkDayFilter[0].attractions ? 
                                  parkDayFilter[0].attractions.filter((attraction) => attraction.startTime !== "") : 
                                  [];
          const unscheduledAttractions = parkDayFilter[0].attractions ? 
                              parkDayFilter[0].attractions.filter((attraction) => attraction.startTime === "") : 
                              [];
          setScheduled(scheduledAttractions);
          setUnscheduled(unscheduledAttractions);
      }
  }

  function initialSelectedPark(){
    if(userData && userData.trip && userData.trip.length && userData.trip[0].parkDays){
    if(dateSelector.current.value){
        /*  filters out all of the park day entries to only the one selected in the drop-down - should be an array
        with length 1.  */
        let parkDayFilter = userData.trip[0].parkDays.filter((day) => day.tripDate === dateSelector.current.value);
        return parkDayFilter;
    }
    }
    return null;
}

function loadUserAttractions(parkDayFilter){
  const scheduledAttractions = parkDayFilter[0].attractions ? 
                            parkDayFilter[0].attractions.filter((attraction) => attraction.startTime !== "") : 
                            [];
  const unscheduledAttractions = parkDayFilter[0].attractions ? 
                      parkDayFilter[0].attractions.filter((attraction) => attraction.startTime === "") : 
                      [];
  setScheduled(scheduledAttractions);
  setUnscheduled(unscheduledAttractions);
}

  // When user clicks the trashcan under each attraction in their "My Trip" page, deletes that attraction
  // from that day of their Firebase data. Should immediately update the UI.
  async function deleteAttraction(attractionName){
    let parkDayFilter = await initialSelectedPark();
    let currentAttractions = parkDayFilter[0].attractions;
    let tripDayIndex = userData.trip[0].parkDays.findIndex((day) => day.tripDate === parkDayFilter[0].tripDate);
    const attractionsCopy = currentAttractions.map((attraction) => attraction.name);
    const attractionIndex = attractionsCopy.indexOf(attractionName);
    currentAttractions.splice(attractionIndex, 1);
    let update = {}
    update[`users/${currentUser.uid}/trip/0/parkDays/${tripDayIndex}/attractions`] = currentAttractions;
    await updateUserDetails(update);
    await lookupUserDetails();

  }
  
  useEffect(() => {


    let initialPark = initialSelectedPark();
    if(initialPark !== null){
        loadUserAttractions(initialPark);
    }
    
  }, [userData, dateSelector])

  // If startTime and EndTime
  return (
    
    <main className="d-flex justify-content-center align-items-center flex-column"
          style={{ minHeight: "80vh"}}>
        {loading || !userData ?
        <div className="d-flex h-50 justify-content-center align-items-center">
          <img src={loadingIcon} alt="loading spinner" style={{backgroundColor: "white", width: "60px", borderRadius: "50%"}} />
        </div> :
        <>
          <h2 className="text-white mb-4">My Trip</h2>
          <div className="bg-white rounded p-4">
            <p>(Coming Soon) Soon, you'll be able to create a customized schedule for your 
              Walt Disney World trip! Keep visiting this page regularly as updates come out.
            </p>
            <h3>User Details:</h3>
            <p>
              Email: {userData.email}
            </p>  
            <p>
              Name: {userData.firstName}
            </p>      
            <div>
              Trip Dates: {(userData && userData.trip && userData.trip[0] && userData.trip[0].tripStart === "") ? 
              <span className='text-muted fst-italic'>No trips yet, please visit <Link to="/profile">your profile</Link> to add one.</span> : 
              <span>{userData.trip[0].tripStart} - {userData.trip[0].tripEnd}</span>}          
            </div>
            <p className="text-center fs-6 text-muted mt-4">Visit your profile page if you'd like to edit your trip dates. Visit your Attractions page if you'd like to add attractions to each day.</p>
            
            <div className="itinerary">
              <h3>Itinerary:</h3>
              {userData.trip[0].tripStart === "" ? 
                "" :
                <div className="d-flex justify-content-center" id="my-trip-date">
                    <Form >
                        <Form.Group>
                            <Form.Label>Itinerary For:</Form.Label>
                            <Form.Select id="itinerary-date-selector" as="select" type="select" 
                                        defaultValue={userData.trip[0].parkDays[0].tripDate} 
                                        ref={dateSelector}
                                        onChange={changeTripDay}
                                        required>
                                    {userData.trip[0].parkDays.map((day) => {
                                        return <option key={day.tripDate} value={day.tripDate}>{day.tripDate} ({day.park})</option>
                                    })}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                    <Button>Update Itinerary</Button>
                </div>}
                <section className="d-flex" id="itinerary-container">
                  <div className="itinerary-current">
                    <h4>Currently Scheduled:</h4>
                    
                      {scheduled.length === 0 ?
                      <p><em>No events scheduled yet. Visit the "Attractions" page to add some & then come back here to set up your schedule!</em></p> :
                      <>
                        {scheduled.map((attraction) => {
                        return (
                          <div key={attraction.name} className="itinerary-card d-flex">
                            <h6 className="w-100">{attraction.name}</h6>
                            <input type="time" defaultValue={attraction.startTime} />
                            {" - "}
                            <input type="time" defaultValue={attraction.endTime} />
                            <i className="fa-solid fa-trash" onClick={()=>deleteAttraction(attraction.name)}></i>
                          </div>
                        )
                        })}
                      </>
                      }

                  </div>
                  <div className="itinerary-current">
                    <h4>Unscheduled Items:</h4>
                      {unscheduled.length === 0 ?
                      <p><em>No events added yet. Visit the "Attractions" page to add some.</em></p> :
                      <div className="d-flex itinerary-cards-flex">  
                        {unscheduled.map((attraction) => {
                          return(
                            <div key={attraction.name} className="itinerary-card d-flex">
                              <h6 className="w-100">{attraction.name}</h6>
                              <input type="time" className="form-control time" defaultValue={new Date().getTime()} />
                              {" - "}
                              <input type="time" className="form-control time" defaultValue={attraction.endTime} />
                              <i className="fa-solid fa-trash mx-1" onClick={()=>deleteAttraction(attraction.name)}></i>
                            </div>
                          )
                          })}
                      </div>
                      }

                  </div>
                  </section>
            </div>
          
            
          </div>
        </>
        }
    </main>
  )
}
