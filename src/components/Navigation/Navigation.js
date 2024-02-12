import React from "react";
import "./Navigation.css";

const Navigation = () => {
    return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p className="nav-button f3 link dim pa3 pointer br2 shadow-2 ma2">Sign Out</p>
        </nav>
    );
}

export default Navigation;