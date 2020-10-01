import React, {useState, useRef} from "react";
import { connect } from "react-redux";
import axios from "axios";
import styled from "styled-components";

import { signUpUser } from "../../store/UserAuthorization/actions.js";


const SignUpForm =  (props) => {
    let [login, setLogin] = useState('');
    let [password, setPassword] = useState('');
    let avatarImageRef = useRef(null);
    
    function handleLoginChange(e) {
        setLogin(e.target.value);
    }
    
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function submitForm(e) {
        let item = {
            name: login,
            password: password,
            meetingID: props.meetingID
        };

        //Save image on server as base64
        /*let reader = new FileReader();
        reader.onloadend = function() {
            item.img = reader.result;
            axios.post('http://localhost:3004/participants', item)
            .then((response) => {
                console.log(response);
            });
            setAvatarImage(reader.result);
            props.hideForm(reader.result);
        };
        reader.readAsDataURL(avatarImageRef.current.files[0]);*/

        if(avatarImageRef.current.files[0])
            item.img = URL.createObjectURL(avatarImageRef.current.files[0]);
        axios.post('http://localhost:3004/participants', item)
            .then(({ data }) => {
                delete item.meetingID;
                delete item.password;
                item.userID = data.id;
                props.signUpUser(item);
                props.hideForm();
            })
            .catch((error) => {
                console.log(error);
            });

        e.preventDefault();
    }

    return (
    <StyledSignUpForm onSubmit={submitForm}>
        <label htmlFor="login">Введите имя</label>
        <br />
        <input type="text" id="login" name="login" value={login} onChange={handleLoginChange} autoComplete="on" required></input>
        <label htmlFor="password">Введите пароль</label>
        <br />
        <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required></input>
        <label htmlFor="avatar-img">Выберите изображение</label>
        <br />
        <input type="file" id="avatar-img" name="avatar-img" ref={avatarImageRef} required accept="image/x-png,image/gif,image/jpeg"></input>
        <br />
        <input type="submit" value="Зарегистрироваться"></input>
        <button type="button" onClick={props.hideForm}>Отмена</button>
    </StyledSignUpForm>
    );
}

const StyledSignUpForm = styled.form `
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

export default connect(mapStateToProps, { signUpUser })(SignUpForm);