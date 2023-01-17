import React, { useRef, useState } from 'react'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword(){
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);


    //checks that user is submitting a valid email, and then sends the reset password email to the user through Firebase.
    async function handleSubmit(e){
        e.preventDefault();
        let regexForEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        try{
            if(emailRef.current.value === ''){
                return setError("Please enter a valid email.")
            }
            if(emailRef.current.value.match(regexForEmail) == null){
                return setError("Invalid email, please try again")
            }
            setLoading(true)
            setMessage('')
            setError('')
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions.")
        } catch {
            setError('Failed to reset password. Please check your username and try again.')
        }

        setLoading(false)
    }

    return(
        <Container className="d-flex flex-column justify-content-center align-items-center my-4"
                    style={{ minHeight: "80vh", maxWidth: "400px"}}>
            <Card className="w-100">
                <Card.Body>
                    <h2 className="w-100 text-center mb-4">Reset Password</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {message && <Alert variant='success'>{message}</Alert>}
                    <Form>
                        <Form.Group className="my-2" id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        
                        <Button className="w-100" type="submit" disabled={loading} onClick={handleSubmit}>
                            Reset Password
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Log In</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/sign-up">Sign Up</Link>
            </div>
        </Container>
    )


}