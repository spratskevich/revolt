import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import axios from 'axios';

import { AppHeader, MeetingsList, AddMeetingForm, MeetingRoom } from './components';

import './App.css';

const App = () => {
  let [meetingsList, setmeetingsList] = useState([]);

  
  let [isAddPopupVisible, setAddPopupVisibility] = useState(false);
  //let [meetingID, setMeetingID] = useState(1);
  useEffect(() => {
    axios
      .get('http://localhost:3004/meetings')
      .then(({data}) => {
        setmeetingsList(data);
      });
  },[isAddPopupVisible]);

  return (
    <Router>
      <Route exact path="/">
        <div className={classNames("App", {"blockout": isAddPopupVisible})}>
          <AppHeader />
          <MeetingsList meetings={meetingsList}
                        showPopup={() => setAddPopupVisibility(true)}
                        /*showMeeting={(id) => setMeetingID(id)}*/
          />
          {isAddPopupVisible && <AddMeetingForm onClick={() => setAddPopupVisibility(false)}/>}
        </div>
      </Route>
      <Route path={`/meeting`}>
        <MeetingRoom />
      </Route>
    </Router>
    );
};

export default App;