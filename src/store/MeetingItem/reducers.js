import { SET_ROOMS_MEETING_ID } from "./actions";

const initialState =  0;

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_ROOMS_MEETING_ID:
            const { meetingID } = action.payload;
            return meetingID;
        default:
            return state;
    }
}