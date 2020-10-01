import React, { useState } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import styled from "styled-components";

import { logInUser } from "../../store/UserAuthorization/actions.js";

const LogInForm = (props) => {
    let [login, setLogin] = useState("");
    let [password, setPassword] = useState("");


    function handleLoginChange(e) {
        setLogin(e.target.value);
    }
    
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function submitForm(e) {
        axios
             .get(`http://localhost:3004/participants?name=${login}&password=${password}`)
             .then(({ data }) => {
                 if(data.length){
                     let item = { ...data[0] };
                     delete item.meetingId;
                     delete item.password;
                     item.userID = item.id;
                     delete item.id;

                     props.logInUser(item);
                     if(props.meetingID) {
                        axios.patch(`http://localhost:3004/participants/${item.userID}`, {
                            meetingID: props.meetingID
                        });
                     }
                     props.hideForm();
                 }
                 else {
                     alert("Введен неверный логин илил пароль");
                 }
             })
             .catch((err) => {
                 console.log(err);
             });
             e.preventDefault();
    }

    return (
        <StyledLogInForm onSubmit={submitForm}>
            <label htmlFor="login">Введите имя</label>
            <br />
            <input type="text" id="login" name="login" value={login} onChange={handleLoginChange}></input>
            <label htmlFor="password">Введите пароль</label>
            <br />
            <input type="text" id="password" name="password" value={password} onChange={handlePasswordChange}></input>
            <input type="submit" value="Войти"></input>
            <button type="button" onClick={props.hideForm}>Отмена</button>
        </StyledLogInForm>
    );
};

const StyledLogInForm = styled.form `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 200px;
    max-width: 300px;
    width: 80vw;
    padding: 40px 25px;
    z-index: 1;
    text-align: left;
    font-family: 'Roboto', sans-serif;
    color: rgb(68, 68, 68);
    background-color: white;
    border-radius: 10px;

    input[type=text], input[type=password] {

        width: 100%;
        margin: 8px 0px;
        padding: 12px 20px;
        box-sizing: border-box;
        outline: none;
        border: 3px solid #ccc;
        transition: 0.5s;
    }

    input[type=text]:focus, input[type=password]:focus {
        border: 3px solid rgb(0, 140, 255);
    }
`;

const mapStateToProps = state => {
    return { meetingID: state.currentRoomMeetingID }
}

export default connect(mapStateToProps, { logInUser })(LogInForm);