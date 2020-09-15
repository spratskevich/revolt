import React, {useState, useEffect} from 'react';

export default (props) => {
    let currentBackgrImage = "http://localhost:3004/assets/1.jpg";

    return (
        <div className="meetings-list__item">
            <a href="http://localhost:3000/meeting" 
               onClick={()=> props.showMeeting("7")}
            >
                <p>{props.meetingInfo.title}</p>
                <img src={`http://localhost:3004/images/${props.meetingInfo.background_image}`} alt="Meeting poster"/>
            </a>
        </div>    
    );
}
