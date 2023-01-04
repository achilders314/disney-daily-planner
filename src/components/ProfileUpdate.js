import React, {useRef, useState} from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfileUpdate(props) {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { updateUserDetails } = useAuth();
    const userDetails = props.userDetails;
    const nameRef = useRef();
    const tripStartRef = useRef();
    const tripEndRef = useRef();
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    async function handleSubmit(e){
        e.preventDefault();
        try{
            let timeZoneOffset = new Date().getTimezoneOffset() * 60 * 1000; //timezone offset in milliseconds
            let tripStart = tripStartRef.current.value === "" ? "" : new Date(tripStartRef.current.value);
            let tripEnd = tripEndRef.current.value === "" ? "" : new Date(tripEndRef.current.value);
            if(nameRef.current.value === ''){
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
            } else if(userDetails.trip.length > 0 && tripStart.toDateString() === userDetails.trip[0].tripStart && 
                      tripEnd.toDateString() === userDetails.trip[0].tripEnd){
              updateUserDetails({ firstName: nameRef.current.value })
            }
                else{
                let tripDays = [];
                tripStart.setTime(tripStart.getTime() + timeZoneOffset);
                tripEnd.setTime(tripEnd.getTime() + timeZoneOffset);
                let numDays = tripEnd.getDate() - tripStart.getDate() + 1;
                for(let i=0; i<numDays; i++){
                    let thisDate = new Date(tripStart);
                    thisDate.setDate(thisDate.getDate()+i)
                    let tripDaySummary = {
                      tripDate: thisDate.toDateString(),
                      park: "",
                      attractions: [],
                    }
                    tripDays.push(tripDaySummary);
                  }
                let userUpdate = {
                    firstName: nameRef.current.value,
                    trip: [{
                        tripStart: tripStart.toDateString(),
                        tripEnd: tripEnd.toDateString(),
                        parkDays: tripDays,
                    }],
                    lastActivity: new Date(), 
                }
                updateUserDetails(userUpdate)
            }
            setLoading(true);
            setError('');
            navigate("/my-trip");
        } catch(err){
            console.log(err.message)
            setError('Failed to update details. Please try again.')
        }

        setLoading(false)
    }
  return (
    <Form>
        <p className="text-danger">Warning: changing your trip dates will erase any saved itineraries you may have created.</p>
        <p>Email: {userDetails.email}</p>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="my-2" id="first-name">
            <Form.Label>Name: </Form.Label>
            <Form.Control className="w-50" type="text" ref={nameRef} defaultValue={userDetails.firstName} required />
        </Form.Group>
        <Form.Group className="my-2" id="first-name">
            <Form.Label>Trip Start: </Form.Label>
            <Form.Control as="input" className="w-50" type="date" ref={tripStartRef} 
                          defaultValue={userDetails.trip.length > 0 ?
                            new Date(userDetails.trip[0].tripStart) : today} required />
        </Form.Group>
        <Form.Group className="my-2" id="first-name">
            <Form.Label>Trip End: </Form.Label>
            <Form.Control as="input" className="w-50" type="date" ref={tripEndRef} 
                          defaultValue={userDetails.trip.length > 0 ?
                            new Date(userDetails.trip[0].tripEnd) : tomorrow} required />
        </Form.Group>
        <Button variant="success" className="w-50" type="submit" disabled={loading} onClick={(e) => handleSubmit(e)}>Save Changes</Button>
    </Form>
  )
}
