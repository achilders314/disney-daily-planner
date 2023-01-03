import React, {useRef, useState} from 'react'
import { Form, Button, Alert } from 'react-bootstrap'

export default function ProfileUpdate(props) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const userDetails = props.userDetails;
    const nameRef = useRef();
    const tripStartRef = useRef();
    const tripEndRef = useRef();
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    async function handleSubmit(e){
        e.preventDefault();
        console.log(tripStartRef.current.value);
        try{
            if(nameRef.current.value === ''){
                return setError("Please enter a name.")
            }
            if(tripStartRef.current.value === ""){
                return setError("Please enter a start date.")
            }
            else if(tripEndRef.current.value === ""){
                return setError("Please enter an end date.")
            } else if(tripEndRef.current.value < tripStartRef.current.value){
                return setError("Start date must be before or same as end date.")
            } else if(new Date(tripStartRef.current.value) < today){
                return setError("Trip dates must be in the future.")
            }
            setLoading(true);
            setError('');
        } catch {
            setError('Failed to update details. Please try again.')
        }

        setLoading(false)
    }
  return (
    <Form>
        <p>Email: {userDetails.email}</p>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="my-2" id="first-name">
            <Form.Label>Name: </Form.Label>
            <Form.Control className="w-50" type="text" ref={nameRef} defaultValue={userDetails.firstName} required />
        </Form.Group>
        <Form.Group className="my-2" id="first-name">
            <Form.Label>Trip Start: </Form.Label>
            <Form.Control className="w-50" type="date" ref={tripStartRef} required />
        </Form.Group>
        <Form.Group className="my-2" id="first-name">
            <Form.Label>Trip End: </Form.Label>
            <Form.Control className="w-50" type="date" ref={tripEndRef} required />
        </Form.Group>
        <Button className="w-50" type="submit" disabled={loading} onClick={handleSubmit}>Save Changes</Button>
    </Form>
  )
}
