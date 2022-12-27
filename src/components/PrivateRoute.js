import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

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
