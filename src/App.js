import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import axios from 'axios';

import { AppHeader, MeetingsList, AddMeetingForm } from './components';

import './App.css';

export default () => {
  let mainPageTitles = ['777 meetings now', '777 777 protesters'];
  let [list, setList] = useState([]);
  
  let [isAddPopupVisible, setAddPopupVisibility] = useState(false);
  let [meetingID, setMeetingID] = useState(1);
  useEffect(() => {
    axios
      .get('http://localhost:3004/meetings')
      .then(({data}) => {
        setList(data);
      });
  }, []);

  return (
    <Router>
      <Route exact path="/">
        <div className={classNames("App", {"blockout": isAddPopupVisible})}>
          <AppHeader titleList={mainPageTitles} />
          <MeetingsList meetings={list}
                        showPopup={() => setAddPopupVisibility(true)}
                        showMeeting={(id) => setMeetingID(id)}
          />
          {isAddPopupVisible && <AddMeetingForm onClick={() => setAddPopupVisibility(false)}/>}
        </div>
      </Route>
      <Route path="/meeting">
        <p>{`meeting : ${meetingID}`}</p>
      </Route>
    </Router>
    ); 
};