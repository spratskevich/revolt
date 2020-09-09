import React from 'react';
import i from './1.jpg';
import './MeetingsList.css';

function MeetingsList(props) {
    return (
        <main className="meetings-list">
          {props.meetings.map((item, index) => 
            <div className="meetings-list__item" onClick={()=> props.showMeeting(7)}>
              <a href="http://localhost:3000/meeting" >
              <p>Название митинга</p>
                <img src={i} />
              </a>
            </div>    
          )}
           <div className="meetings-list__add-button">
             <button type="button" onClick={()=>props.showPopup()}></button>
            </div>
        </main>
    );
};

export default MeetingsList;