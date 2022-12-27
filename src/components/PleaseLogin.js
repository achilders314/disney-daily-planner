import React from 'react'
import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function PleaseLogin() {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center my-4"
                    style={{ minHeight: "75vh", maxWidth: "400px"}}>
            <Card className="w-100">
                <Card.Body>
                    <h2 className="w-100 text-center mb-4">You are currently logged out</h2>
                    <p>To access this page, please <Link to="/sign-up">sign up</Link> or <Link to="/please-login">log in.</Link></p>
                </Card.Body>
            </Card>
        </Container>
  )
}
