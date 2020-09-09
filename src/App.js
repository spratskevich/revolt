import React, { Fragment, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './AppHeader.js';
import MeetingsList from './MeetingsList.js'
import classNames from 'classnames';
import AddMeetingForm from './AddMeetingForm.js'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

function App() {
  let mainPageTitles = ['777 meetings now', '777 777 protesters'];
  let list = ['some', 'soem', 'some', 'soem', 'some', 'soem', 'some', 'soem', 'some', 'soem'];
  let [isAddPopupVisible, changeAddPopupVisibility] = useState(false);
  let [meetingID, setMeetingID] = useState(null);

  return (
    <Router>
      <Route exact path="/">
        <div className={classNames("App", {"blockout": isAddPopupVisible})}>
          <AppHeader titleList={mainPageTitles} />
          <MeetingsList meetings={[...list, '1'] } showPopup={() => changeAddPopupVisibility(true)} showMeeting={(id) => setMeetingID(id)} />
          {isAddPopupVisible && <AddMeetingForm onClick={() => changeAddPopupVisibility(false)}/>}
        </div>
      </Route>
      <Route path="/meeting">
        <p>{`meeting : ${meetingID}`}</p>
      </Route>
    </Router>
    );
  
}

export default App;
