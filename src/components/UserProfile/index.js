import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import styled from "styled-components";

import { logOutUser } from "../../store/UserAuthorization/actions.js";



const UserProfile = (props) => {
    function handleLogOut() {
        axios.patch(`http://localhost:3004/participants/${props.userID}`, {
            meetingID: 0
        });
        props.logOutUser();
    }

    return (
        <StyledUserProfile>
            <img src={props.image} className="user-profile__img" alt="avatar"/>
            <p className="user-profile__name">{props.name}</p>
            <button type="button" className="user-profile__logOut-button" onClick={handleLogOut}>
                Выйти
            </button>
        </StyledUserProfile>
    );
};

const StyledUserProfile = styled.div `
    display: flex;
    position: absolute;
    box-sizing: border-box;
    margin: 0;
    right: 0px;
    top: 2px;
    align-items: center;

    .user-profile__img {
        width: 40px;
        height: 40px;
        border-radius: 50px;
        margin: 0 5px;
    }
    
    .user-profile__name {
        float: left;
        color: white;
        margin: 5px;
        text-dexoration: none;
        background-color: rgba(160, 160, 160, 0);
    }
`;

const mapStateToProps = state => {
    return {
        userID: state.authorizedUser.userID
    };
}

export default connect(mapStateToProps, { logOutUser })(UserProfile);