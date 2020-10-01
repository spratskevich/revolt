export const SET_ROOMS_MEETING_ID = "SET_ROOMS_MEETING_ID";

export const setRoomsMeetingID = (meetingID) => ({
    type: SET_ROOMS_MEETING_ID,
    payload: { meetingID }
});