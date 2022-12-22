import { Link } from "react-router-dom";
import React from "react";

function Nav(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div className="container-fluid">
                <Link className="nav-link logo" to="/"><i class="fa-solid fa-suitcase-rolling"></i></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Disney Daily Planner</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/my-plans">Attractions</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/faq">FAQ</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contact">Contact Us</Link>
                    </li>
                </ul>
                </div>
                <li className="nav-item dropdown">
                    <Link className="nav-link nav-item dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-user"></i>  Alison's Profile
                    </Link>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li><Link className="dropdown-item" to="#">Profile Settings</Link></li>
                        <li><Link className="dropdown-item" to="#">Sign Out</Link></li>
                    </ul>
                </li>
            </div>
        </nav>
    )
}

export default Nav;