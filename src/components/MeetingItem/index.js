import React, {useState, useEffect} from 'react';

export default (props) => {
    let currentBackgrImage = "http://localhost:3004/assets/1.jpg";

    return (
        <div className="meetings-list__item">
            <a href="http://localhost:3000/meeting" 
               onClick={() => props.redirectToMeetingRoom(props.meetingInfo.id)}
            >
                <p>{props.meetingInfo.title}</p>
                <img src={props.meetingInfo.background_image} alt="Meeting poster"/>
                
            </a>
        </div>    
    );
}
