import React, { useRef, useState } from 'react'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, googleLogin } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        let regexForEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if(emailRef.current.value === '' || passwordRef.current.value === ''){
            return setError("Please enter a valid email and password.")
        }
        if(emailRef.current.value.match(regexForEmail) == null){
            return setError("Invalid email, please try again")
        }
        if(passwordRef.current.value !== passwordConfirmRef.current.value){ return setError('Passwords to not match') }
        try{
            setLoading(true)
            setError('')
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch {
            setError('Failed to create an account')
        }

        setLoading(false)
    }

    async function handleGoogleLogin(e){
        e.preventDefault();

        try{
            setError('')
            await googleLogin()

        } catch {
            setError('Failed to sign in. Please try again.')
        }
    }

    return(
        <Container className="d-flex flex-column justify-content-center align-items-center my-4"
                    style={{ minHeight: "80vh", maxWidth: "400px"}}>
            <Card className="w-100">
                <Card.Body>
                    <h2 className="w-100 text-center mb-4">Sign Up</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form>
                        <Form.Group className="my-2" id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group className="my-2" id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group className="my-2" id="password-confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button className="w-100" type="submit" disabled={loading} onClick={handleSubmit}>Sign Up</Button>
                    </Form>
                    <button className="w-100 my-2 login-with-google-btn" onClick={handleGoogleLogin}>Sign in with Google</button>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </Container>
    )


}