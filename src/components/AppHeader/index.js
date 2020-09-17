import React, { useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';

import SignUpForm from '../SignUpForm';

import './AppHeader.css';

export default (props) => {
    let [meetingsCnt, setMeetingsCnt] = useState('');
    let [protestersTotalCnt, setProtestersTotalCnt] = useState('');
    let [isSignUpFormVisible, setSignUpFormVisible] = useState('');
    let [avatarImage, setAvatarImage] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:3004/meetings")
             .then(({ data }) => {
                setMeetingsCnt(data.length);
        });
        axios.get("http://localhost:3004/participants")
             .then(({ data }) => {
                setProtestersTotalCnt(data.length);
        });
    });
    return (
        <>
            {isSignUpFormVisible &&<div className="blockout"></div>}
            <header className="header">
                <div className="header__elem" key={uuidv4()}>
                    <h1>{`${meetingsCnt} митингов`}</h1>
                </div>
                <div className="header__elem" key={uuidv4()}>
                    <h1>{`${protestersTotalCnt} участников`}</h1>
                    </div>
            </header>
            <div className="button-container">
                { !avatarImage 
                  ? <>
                      <button className="log-in">Войти</button>
                      <button className="sign-up" onClick={()=>setSignUpFormVisible(true)}>Зарегестрироваться</button>
                      </>
                  : <img src={avatarImage} />
                }
            </div>
            {isSignUpFormVisible && <SignUpForm hideForm={(avatarImage)=>{setAvatarImage(avatarImage); setSignUpFormVisible(false)}} />}
        </>
    );
};