export const SIGN_UP_USER = "SIGN_UP_USER";
export const LOG_OUT_USER = "LOG_OUT_USER";
export const LOG_IN_USER = "LOG_IN_USER";

export const signUpUser = (userInfo) => {
    return {
        type: SIGN_UP_USER,
        payload: { userInfo }
    };
}

export const logOutUser = () => {
    return {
        type: LOG_OUT_USER
    };
}

export const logInUser = (userInfo) => {
    return {
        type: LOG_IN_USER,
        payload: { userInfo }
    };
}