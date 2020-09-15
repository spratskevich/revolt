import React from 'react';
import {v4 as uuidv4} from 'uuid';

import MeetingItem from '../MeetingItem';

import './MeetingsList.css';

export default (props) => {
    console.log(props);
    return (
        <main className="meetings-list">
          {props.meetings.map((item) => 
            <MeetingItem key={uuidv4()} meetingInfo={item} />
          )}
          <div className="meetings-list__add-button">
            <button type="button" onClick={()=>props.showPopup()}></button>
          </div>
        </main>
    );
};