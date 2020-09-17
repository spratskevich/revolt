import React, {useState, useRef} from 'react';
import axios from 'axios';

import './SignUpForm.css';

export default (props) => {
    let [login, setLogin] = useState('');
    let [password, setPassword] = useState('');
    let avatarImageRef = useRef(null);
    let [avatarImage, setAvatarImage] = useState(null);
    
    function handleLoginChange(e) {
        setLogin(e.target.value);
    }
    
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleAvatarImage(e) {
        setAvatarImage(e.target.value);
    }

    function submitForm(e) {
        let item = {
            name: login,
            password: password,
            meetingId: 0
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

        
        item.img = URL.createObjectURL(avatarImageRef.current.files[0]);
        axios.post('http://localhost:3004/participants', item)
            .then((response) => {
                console.log(response);
            });

            setAvatarImage(item.img);
            props.hideForm(item.img);

        e.preventDefault();
    }

    return (
    <form className="sign-up-form" onSubmit={submitForm}>
        <label for="login">Введите имя</label>
        <br />
        <input type="text" id="login" name="login" value={login} onChange={handleLoginChange}></input>
        <label for="password">Введите пароль</label>
        <br />
        <input type="text" id="password" name="password" value={password} onChange={handlePasswordChange}></input>
        <label for="avatar-img">Выберите изображение</label>
        <br />
        <input type="file" id="avatar-img" name="avatar-img" ref={avatarImageRef}></input>
        <input type="submit" value="Зарегистрироваться"></input>
        <button type="button" onClick={props.hideForm}>Отмена</button>
    </form>
    );
}