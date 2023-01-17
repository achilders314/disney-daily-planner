import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


//Used to push user to the login page if they attempt to visit "My Trip" or other pages for members only.
export default function PrivateRoute() {
    const { currentUser } = useAuth();
  
    return (
        <>
            { 
                currentUser ? <Outlet /> : <Navigate to="/please-login" />
            }
        </>
  )
}
