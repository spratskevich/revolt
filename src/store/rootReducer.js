import { combineReducers } from "redux";
import currentRoomMeetingID from "./MeetingItem/reducers.js";
import authorizedUser from "./UserAuthorization/reducers.js";

export default combineReducers({ currentRoomMeetingID, authorizedUser });