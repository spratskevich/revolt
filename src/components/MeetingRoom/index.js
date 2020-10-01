import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styled, { keyframes } from "styled-components";

import SignUpForm from "../SignUpForm";
import LogInForm from "../LogInForm";
import UserProfile from "../UserProfile";



const MeetingRoom = (props) => {
    let [meetingInfo, setMeetingInfo] = useState({ title: "" });
    let [participantsList, setParticipantsList] = useState([]);
    let [isLogInFormVisible, setLogInFormVisible] = useState(false);
    let [isSignUpFormVisible, setSignUpFormVisible] = useState(false);

    useEffect(() => {
        if(props.meetingID) {
            axios.get(`http://localhost:3004/meetings?id=${props.meetingID}`)
             .then(({data}) => {
                 setMeetingInfo(data[0]);
             });
        let timerID = setInterval(() => {
            axios.get(`http://localhost:3004/participants?meetingID=${props.meetingID}`)
             .then(({data}) => {
                 setParticipantsList(data);
             });
        }, 3000);
        return () => clearInterval(timerID);
        }
    }, []);
    
    return (
        <>
            {(isSignUpFormVisible || isLogInFormVisible) &&<ShadedBackground onClick={(e)=>e.preventDefault()}/>}
            <StyledHeader>
                <h1>{meetingInfo.title}</h1>
                { !props.userID 
                  ? <ButtonContaier>
                      <button className="log-in" onClick={()=>setLogInFormVisible(true)}>Войти</button>
                      <button className="sign-up" onClick={()=>setSignUpFormVisible(true)}>Зарегестрироваться</button>
                    </ButtonContaier>
                  : <UserProfile image={props.img} name={props.name}/>/*<><img src={props.img} alt="avatar"/>{props.name}</>*/
                }
            </StyledHeader>
            <ParticipantsList>
                {participantsList.map((item) => {
                    return <li><img src={item.img} alt="User"/></li>;
                })}
            </ParticipantsList>
            {isLogInFormVisible && <LogInForm hideForm={() => setLogInFormVisible(false)} />}
            {isSignUpFormVisible && <SignUpForm hideForm={() => setSignUpFormVisible(false)} />}
        </>
    );
}

const ParticipantsList = styled.ul `
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
        margin: 40px 20px;
    }

    img {
        width: 100px;
        height: 100px;
        border-radius: 50px;
    }
`;

const HeaderGradient = keyframes `
    0% { background-image: linear-gradient(to right, #f15252 0%,  #813b3b 100%) }
    6.25% { background-image: linear-gradient(to right, #813b3b 0%, #f15252 6.25%, #813b3b 100%) }
    12.5% { background-image: linear-gradient(to right,  #813b3b 0%,  #f15252 12.5%,  #813b3b 100%) }
    18.75% { background-image: linear-gradient(to right,#813b3b 0%,  #f15252 18.75%,#813b3b 100%) }
    25% { background-image: linear-gradient(to right,#813b3b 0%,  #f15252 25%,#813b3b 100%) }
    31.25% { background-image: linear-gradient(to right,#813b3b 0%,  #f15252 31.25%,#813b3b 100%) }
    37.5% { background-image: linear-gradient(to right,#813b3b 0%,  #f15252 37.5%,#813b3b 100%) }
    43.75% { background-image: linear-gradient(to right,#813b3b 0%,  #f15252 43.75%,#813b3b 100%) }
    50% { background-image: linear-gradient(to right,#813b3b 0%,  #f15252 50%,#813b3b 100%) }
    56.25% { background-image: linear-gradient(to right,#813b3b 0%,  #f15252 56.25%,#813b3b 100%) }
    62.5% { background-image: linear-gradient(to right,#813b3b 0%,  #f15252 62.5%,#813b3b 100%) }
    68.75% { background-image: linear-gradient(to right,#813b3b 0%,  #f15252 68.75%,#813b3b 100%) }
    75% { background-image: linear-gradient(to right,#813b3b 0%,  #f15252 75%,#813b3b 100%) }
    81.25% { background-image: linear-gradient(to right,#813b3b 0%,  #f15252 81.25%,#813b3b 100%) }
    87.5% { background-image: linear-gradient(to right,#813b3b 0%,  #f15252 87.5%,#813b3b 100%) }
    93.75% { background-image: linear-gradient(to right,#813b3b 0%,  #f15252 93.75%,#813b3b 100%) }
    100% { background-image: linear-gradient(to right,#813b3b 0%,  #f15252 100%) }
`;

const StyledHeader = styled.header `
    display: flex;
    box-sizing: border-box;
    height: 12vh;
    min-height: 100px;
    margin-bottom: 10px;
    justify-content: space-around;
    align-items: center;
    flex-wrap: no-wrap;
    background-color: #813b3b;
    font-family: 'Roboto', sans-serif;
    color: white;

    animation-name: ${HeaderGradient};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: linear;
`;

const ButtonContaier = styled.div `
    position: absolute;
    box-sizing: border-box;
    margin: 0;
    right: 0px;
    top: 2px;
    // .button-container > img {
    //     left: -100px;
    //     border-radius: 15px;
    //     position: relative;
    //     width: 50px;
    //     height: 50px;
    //     z-index: 1000;
    // }

    .log-in {
        display: inline-block;
        margin-right: 10px;
        border-style: none;
        text-align: center;
        font-size: 14px;
        color: white;
        background-color: rgba(160, 160, 160, 0);
    }

    .log-in:hover {
        cursor: pointer;
    }

    .sign-up {
        display: inline-block;
        padding: 10px 20px;
        margin-right: 10px;
        border-style: none;
        border-radius: 3px;
        text-align: center;
        font-size: 14px;
        background-color: rgb(71, 71, 71);
        color: white;
    }

    .sign-up:hover {
        background-color: rgb(90, 90, 90);
        cursor: pointer;
    }

    .sign-up:active {
        background-color: rgb(60, 60, 60);
    }

`;

const ShadedBackground = styled.div `
    opacity: 0.5;
    background-color: gray;
    position: fixed;
    height: 100vw;
    width: 100vw;
`;

const mapStateToProps = state => {
    return { meetingID: state.currentRoomMeetingID,
             ...state.authorizedUser
           }
}

export default connect(mapStateToProps)(MeetingRoom);