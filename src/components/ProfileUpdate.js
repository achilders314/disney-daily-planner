import React, {useRef, useState} from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';

export default function ProfileUpdate() {
    // const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const { userData, updateUserDetails, currentUser } = useAuth();
    const nameRef = useRef();
    const tripStartRef = useRef();
    const tripEndRef = useRef();
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    

    async function handleSubmit(e){
        e.preventDefault();
        // try{
            setLoading(true);
            setError('');
            setSuccess('');
            let timeZoneOffset = new Date().getTimezoneOffset() * 60 * 1000; //timezone offset in milliseconds
            let tripStart = tripStartRef.current.value === "" ? "" : new Date(tripStartRef.current.value);
            let tripEnd = tripEndRef.current.value === "" ? "" : new Date(tripEndRef.current.value);
            tripStart.setTime(tripStart.getTime() + timeZoneOffset);
            tripEnd.setTime(tripEnd.getTime() + timeZoneOffset);
            if(nameRef.current.value === ' '){
                return setError("Please enter a name.")
            }
            if(tripStart === ""){
                return setError("Please enter a start date.")
            }
            else if(tripEnd === ""){
                return setError("Please enter an end date.")
            } else if(tripEnd < tripStart){
                return setError("Start date must be before or same as end date.")
            } else if(tripStart < today){
                return setError("Trip dates must be in the future.")
            } else if(tripStart.toDateString() === userData.trip[0].tripStart && 
                      tripEnd.toDateString() === userData.trip[0].tripEnd){
              console.log("dates are the same");
              let parkDays = userData.trip[0].parkDays;
              parkDays.map((day) => {
                let {tripDate, park} = day;
                let selection = document.getElementById(tripDate);
                park = selection.value;
                day.park = park;
                return day;
            })
             let update = {}
             update[`users/${currentUser.uid}/`] = {
                firstName: nameRef.current.value,
                email: currentUser.email,
                lastActivity: new Date(),
                trip:[{
                    tripStart: tripStart.toDateString(),
                    tripEnd: tripEnd.toDateString(),
                    parkDays: parkDays,
                }]
             }
             await updateUserDetails(update);
            
            } else{
                console.log("catch all")
                let parkDays = [];
                let numDays = tripEnd.getDate() - tripStart.getDate() + 1;
                for(let i=0; i<numDays; i++){
                    let thisDate = new Date(tripStart);
                    thisDate.setDate(thisDate.getDate()+i)
                    let tripDaySummary = {
                      tripDate: thisDate.toDateString(),
                      park: "None",
                    }
                    parkDays.push(tripDaySummary);
                  }
                  let update = {}
                  update[`users/${currentUser.uid}/`] = {
                     firstName: nameRef.current.value,
                     email: currentUser.email,
                     lastActivity: new Date(),
                     trip:[{
                         tripStart: tripStart.toDateString(),
                         tripEnd: tripEnd.toDateString(),
                         parkDays: parkDays,
                     }]
                  }
                await updateUserDetails(update);
            }
            setLoading(false)
            setError('');
            return setSuccess('Profile updated successfully.')
        // } catch(err){
        //     console.log(err.message)
        //     setLoading(false)
        //     return setError('Failed to update details. Please try again.')
        // }

    }
  return (
    <Form className="profile-update-form">
        <p className="text-danger">Warning: changing your trip dates will erase any saved itineraries you may have created.</p>
        <p>Email: {userData.email}</p>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form.Group className="my-2" id="first-name">
            <Form.Label>Name: </Form.Label>
            <Form.Control className="" type="text" ref={nameRef} defaultValue={userData.firstName} required />
        </Form.Group>
        <Form.Group className="my-2" id="trip-start">
            <Form.Label>Trip Start: </Form.Label>
            <Form.Control as="input" className="" type="date" ref={tripStartRef} 
                          defaultValue={userData && userData.trip.length > 0 ?
                            new Date(userData.trip[0].tripStart) : today} required />
        </Form.Group>
        <Form.Group className="my-2" id="trip-end">
            <Form.Label>Trip End: </Form.Label>
            <Form.Control as="input" className="" type="date" ref={tripEndRef} 
                          defaultValue={userData.trip.length > 0 ?
                            new Date(userData.trip[0].tripEnd) : tomorrow} required />
        </Form.Group>
        <h4>Park Selection:</h4>
        <p>Please choose the parks you will visit each day. If you have no park that day, just select "none."</p>
        {(userData.trip && userData.trip.length > 0 && userData.trip[0].parkDays) ?
            userData.trip[0].parkDays.map((day, index) => {
                return(
                <Form.Group className="my-2" key={`${day.tripDate}-group`}>
                    <Form.Label key={`${day.tripDate}-label`}>Day {index+1}: {day.tripDate}</Form.Label>
                    <Form.Control key={day.tripDate} id={day.tripDate} as="select" className="" type="select" 
                                defaultValue={day.park} required>
                            <option value={"None"}>None</option>
                            <option value={"Magic Kingdom Park"}>Magic Kingdom</option>
                            <option value={"EPCOT"}>EPCOT</option>
                            <option value={"Disney's Hollywood Studios"}>Hollywood Studios</option>
                            <option value={"Disney's Animal Kingdom Theme Park"}>Animal Kingdom</option>
                    </Form.Control>
                </Form.Group>
                )
            }) : ""}
        <Button variant="success" className="" type="submit" disabled={loading} onClick={(e) => handleSubmit(e)}>Save Changes</Button>
    </Form>
  )
}
