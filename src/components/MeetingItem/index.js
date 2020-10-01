import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from 'axios';
import styled from "styled-components";

import { setRoomsMeetingID } from "../../store/MeetingItem/actions.js";

const MeetingItem = (props) => {
    function handleMeetingEntry() {
        if(props.currentUser !== 0) {
            axios.patch(`http://localhost:3004/participants/${props.currentUser}`, {
                meetingID: props.meetingInfo.id
            })
        }
        props.setRoomsMeetingID(props.meetingInfo.id)
    }

    return (
        <MeetingCard>
            <Link to="/meeting"
                onClick={handleMeetingEntry}
            >
                <img src={props.meetingInfo.background_image} alt="Meeting poster"/>
                <div>
                  <h1>{props.meetingInfo.title}</h1>
                  <p>{props.meetingInfo.organizer}</p>
                  <p className="place">{props.meetingInfo.place}</p>
                  <p className="time">{props.meetingInfo["start time"]}</p>
                </div>
                
            </Link>
        </MeetingCard>    
    );
}

const MeetingCard = styled.div `
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

  a {
      text-decoration: none;
      color: #383734;
      font-size: 0.7em;
      font-family: Roboto, sans-serif;
  }
  
  img {
      dysplay: block;
      width: 100%;
      height: 70%;
      margin-bottom: -5px;
  }

  div {
      box-sizing: border-box;
      width: 100%;
      height: 30%;
      padding-left: 5px;
      text-align: left;
  }
  h1 {
      box-sizsing: border-box;
      margin: 0;

  }

  p {
    box-sizsing: border-box;
    margin: 0;
    font-size: 1.3em;
  }

  .place, .time {
      display: inline-block;
      width: 50%;
      margin-top: 20px;
  }

  .time {
      text-align: center;
  }
`;

const mapStateToProps = state => {
    return { 
        currentMeetingRoom: state.currentRoomMeetingID,
        currentUser: state.authorizedUser.userID
    };
};

export default connect(
    mapStateToProps,
    { setRoomsMeetingID }
)(MeetingItem);