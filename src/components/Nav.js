import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

function Nav(){
    const [error, setError] = useState("");
    const { userData, logout, currentUser } = useAuth();
    const navigation = useNavigate();

    async function handleLogout(){
        setError('');
        try{
            await logout();
            navigation("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    useEffect(() => {

    }, [userData])

    return(
        <>
        <nav className="navbar navbar-expand-lg bg-light navbar-light sticky-top px-4">
                <Link className="nav-link logo" to="/"><i className="fa-brands fa-fort-awesome-alt"></i></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <div className="container-fluid">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Disney Daily Planner</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/attractions">Attractions</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/my-trip">My Trip</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                <li className="nav-item dropdown">
                    <button className="nav-link nav-item dropdown-toggle border-0 bg-light" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-user"></i>
                        {(currentUser && userData) ? 
                        <span>{userData.firstName !== "" ? ` ${userData.firstName}` : ` ${currentUser.email}`}</span> : 
                        " Sign Up or Log In"}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        {currentUser && <li><Link className="dropdown-item" to="/profile">Profile</Link></li>}
                        {currentUser && <li><Button className="dropdown-item" onClick={handleLogout}>Sign Out</Button></li>}
                        {!currentUser && <li><Link className="dropdown-item" to="/sign-up">Sign Up</Link></li>}
                        {!currentUser && <li><Link className="dropdown-item" to="/login">Log In</Link></li>}
                    </ul>
                </li>
            </div>
        </nav>
        {error && <Alert variant="danger">{error}</Alert>}
        </>
    )
}

export default Nav;