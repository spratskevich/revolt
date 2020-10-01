import { SIGN_UP_USER, LOG_OUT_USER, LOG_IN_USER } from "./actions.js";

const initialState = {
    name: "",
    img: null,
    userID: 0
}

export default function(state = initialState, action) {
    switch (action.type) {
        case LOG_IN_USER:
        case SIGN_UP_USER:
           const { userInfo } = action.payload;
           return userInfo;
        case LOG_OUT_USER:
            return initialState;
        default:
            return state;
    }
}