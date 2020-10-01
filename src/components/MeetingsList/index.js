import React from "react";
import styled from  "styled-components";
import {v4 as uuidv4} from "uuid";

import MeetingItem from '../MeetingItem';

const MeetingList = (props) => {
    
    return (
        <MeetingListArea>
          {props.meetings.map((meetingInfo) => 
            <MeetingItem key={uuidv4()} meetingInfo={meetingInfo} redirectToMeetingRoom={props.showMeeting} />
          )}
          <div className="meetings-list__add-button">
            <AddMeetingButton type="button" onClick={()=>props.showPopup()}></AddMeetingButton>
          </div>
        </MeetingListArea>
    );
};

const MeetingListArea = styled.main `
  display: grid;
  @media (min-width: 1400px) {
    grid-template-columns: auto auto auto;
  }
  @media (min-width: 700px) and (max-width: 1400px) {
    grid-template-columns: auto auto;
  }
  justify-content: center;
  grid-gap: 20px;
  overflow: hidden;
`;

const AddMeetingButton = styled.button `
  border-sizing: border-box;
  min-width: 300px;
  max-width: 425px;
  width: 30vw;
  min-height: 360px;
  height: 40vh;
  margin: 10px;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-image: url("https://img.icons8.com/ios/100/000000/add.png");
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    cursor: pointer;
  }
`;

export default MeetingList;