import React from "react";
import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
        if (isSignedIn) {
            return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signout')} className="nav-button f3 link dim pa3 pointer br2 shadow-2 ma2">Sign Out</p>
            </nav>
            )
        } else {
            return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className="nav-button f3 link dim pa3 pointer br2 shadow-2 ma2">Sign In</p>
                <p onClick={() => onRouteChange('register')} className="nav-button f3 link dim pa3 pointer br2 shadow-2 ma2">Register</p>
            </nav>
            )
        }
}

export default Navigation;