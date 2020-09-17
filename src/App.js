import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import axios from 'axios';

import { AppHeader, MeetingsList, AddMeetingForm, MeetingRoom } from './components';

import './App.css';

export default () => {
  let [list, setList] = useState([]);
  let [userID, setUserID] = useState(1);
  
  let [isAddPopupVisible, setAddPopupVisibility] = useState(false);
  let [meetingID, setMeetingID] = useState(1);
  useEffect(() => {
    axios
      .get('http://localhost:3004/meetings')
      .then(({data}) => {
        setList(data);
      });
  },[isAddPopupVisible]);

  return (
    <Router>
      <Route exact path="/">
        <div className={classNames("App", {"blockout": isAddPopupVisible})}>
          <AppHeader />
          <MeetingsList meetings={list}
                        showPopup={() => setAddPopupVisibility(true)}
                        showMeeting={(id) => setMeetingID(id)}
          />
          {isAddPopupVisible && <AddMeetingForm onClick={() => setAddPopupVisibility(false)}/>}
        </div>
      </Route>
      <Route path={`/meeting`}>
        <MeetingRoom meetingID={meetingID} userID={userID} />
      </Route>
    </Router>
    ); 
};