import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0" style={{width: '150px'}}>
            <Tilt className="br2 shadow-2 Tilt"  tiltMaxAngleX = {35} tiltMaxAngleY = {35}>
                <div style={{ height: '150px', width: '150px'}}>
                    <h1>👀</h1>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;