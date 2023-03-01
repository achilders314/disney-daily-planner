import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Form, Button } from 'react-bootstrap';
import loadingIcon from '../assets/loadingIcon.gif';
import { useAttractions } from '../contexts/AttractionContext';
import AttractionPopUp from './AttractionPopUp';
import { PrintableSchedule } from './PrintableSchedule';
import { useReactToPrint } from 'react-to-print';

export default function MyTrip() {
  const { currentUser, userData, loading, updateUserDetails, lookupUserDetails } = useAuth();
  const { attractionsLoading } = useAttractions();
  const [scheduled, setScheduled] = useState([]);
  const [unscheduled, setUnscheduled] = useState([]);
  const [attractionPopup, setAttractionPopup] = useState("Peter Pan's Flight");
  const dateSelector = useRef();
  const printableRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printableRef.current,
  });

  function changeTripDay(){
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
                            parkDayFilter[0].attractions.filter((attraction) => attraction.startTime !== "")
                                                        .sort((a, b) => {
                                                          if(a.startTime > b.startTime){return 1}
                                                          else if(a.startTime < b.startTime){return -1}
                                                          else{return 0}
                                                        }) : 
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

  async function scheduleAttraction(attractionName){
    let parkDayFilter = await initialSelectedPark();
    let currentAttractions = parkDayFilter[0].attractions;
    let tripDayIndex = userData.trip[0].parkDays.findIndex((day) => day.tripDate === parkDayFilter[0].tripDate);
    const attractionsCopy = currentAttractions.map((attraction) => attraction.name);
    const attractionIndex = attractionsCopy.indexOf(attractionName);
    const selectedTime = document.getElementById(`${attractionName}-time`);
    currentAttractions[attractionIndex].startTime = selectedTime.value;
    let update = {}
    update[`users/${currentUser.uid}/trip/0/parkDays/${tripDayIndex}/attractions`] = currentAttractions;
    await updateUserDetails(update);
    await lookupUserDetails();
  }

  async function unscheduleAttraction(attractionName){
    let parkDayFilter = await initialSelectedPark();
    let currentAttractions = parkDayFilter[0].attractions;
    let tripDayIndex = userData.trip[0].parkDays.findIndex((day) => day.tripDate === parkDayFilter[0].tripDate);
    const attractionsCopy = currentAttractions.map((attraction) => attraction.name);
    const attractionIndex = attractionsCopy.indexOf(attractionName);
    currentAttractions[attractionIndex].startTime = "";
    let update = {}
    update[`users/${currentUser.uid}/trip/0/parkDays/${tripDayIndex}/attractions`] = currentAttractions;
    await updateUserDetails(update);
    await lookupUserDetails();
  }

  function displayDetails(attractionName){
    setAttractionPopup(attractionName);
  }
  
  useEffect(() => {


    let initialPark = initialSelectedPark();
    if(initialPark !== null){
        loadUserAttractions(initialPark);
    }
    
  }, [userData, dateSelector, attractionsLoading])


  return (
    <main className="d-flex justify-content-center align-items-center flex-column"
          style={{ minHeight: "80vh"}}>
        {loading || attractionsLoading || !userData ?
        <div className="d-flex h-50 justify-content-center align-items-center">
          <img src={loadingIcon} alt="loading spinner" style={{backgroundColor: "white", width: "60px", borderRadius: "50%"}} />
        </div> :
        <>
          <h2 className="text-white mb-4">My Trip</h2>
          <div className="bg-white rounded p-4">
            <h3>User Details:</h3>
            <p className="overflow-auto">
              Email: {userData.email}
            </p>  
            <p>
              Name: {userData.firstName}
            </p>      
            <div>
              Trip Dates: {(userData?.trip?.[0]?.tripStart === "") ? 
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
                    <i className="pb-1 fa-solid fa-print mx-2" onClick={handlePrint}></i>
                </div>}
                <section className="d-flex" id="itinerary-container">
                  <div className="itinerary-current">
                    <div className="d-flex align-items-center">
                      <h4 className="container-fluid">Currently Scheduled:</h4>
                    </div>
                      {scheduled.length === 0 ?
                      <p><em>No events scheduled yet. Visit the "Attractions" page to add some & then come back here to set up your schedule!</em></p> :
                      <>
                        {scheduled.map((attraction) => {
                          let startHours = parseInt(attraction.startTime.slice(0, 2));
                          let startMin = attraction.startTime.slice(3);
                        return (
                          <div key={attraction.name} className="itinerary-card d-flex">
                            <div className="d-flex justify-content-end w-100">
                                  <i className="fa-solid fa-circle-question" onClick={() => displayDetails(attraction.name)} data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                            </div>
                            <h6 className="w-100">{`${startHours === 12 ? 12 : startHours % 12}:${startMin}${startHours<12 ? "a" : "p"}`} 
                                                    - {attraction.name}<span className="text-black-50">{attraction.type ? ` (${attraction.type})` : ""}</span>
                            </h6>
                            <Button type="button" className="btn btn-danger btn-sm mx-1" onClick={() => unscheduleAttraction(attraction.name)}>Unschedule</Button>
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
                            <div key={`${attraction.name}-unscheduled`} className="itinerary-card d-flex p-2">
                              <div className="d-flex justify-content-end w-100">
                                <i className="fa-solid fa-circle-question" onClick={() => displayDetails(attraction.name)} data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                              </div>
                              <h6 className="w-100">{attraction.name}<span className="text-black-50">{attraction.type ? ` (${attraction.type})`: ""}</span></h6>
                              <input type="time" className="form-control time" id={`${attraction.name}-time`} defaultValue={new Date().getTime()} />
                              <Button type="button" className="btn btn-primary" onClick={() => scheduleAttraction(attraction.name)}>Schedule</Button>
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
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Attraction Details</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <AttractionPopUp style={{width: "100% !important"}} key={attractionPopup} attractionName={attractionPopup}/>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="printable" tabIndex="-1" aria-labelledby="printableModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title container-fluid" id="printableModalLabel">Printable PDF (Preview)</h5>
                  <i className="fa-solid fa-print" onClick={handlePrint}></i>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <PrintableSchedule ref={printableRef}/>
                </div>
              </div>
            </div>
          </div>
        </>
        }

    </main>
  )
}
