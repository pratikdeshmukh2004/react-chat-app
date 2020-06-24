import React from 'react';
import "./InfoBar.css";

const InfoBar = ({room}) =>{

    return(
    <div className="infoBar">
        <div className="leftInnerContainer">
            <h3 style={{textTransform: "uppercase"}}>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/" style={{color: "yellow", textDecoration: "none"}}>Leave</a>
        </div>
    </div>
    )
}
export default InfoBar;