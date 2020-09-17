import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default (props) => {
    let [meetingInfo, setMeetingInfo] = useState({});
    let [participantsList, setParticipantsList] = useState([]);

    useEffect(() => {
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
    }, []);
    return (
        <header>
            <div><h1>{meetingInfo.title}</h1></div>
            <ul>
                {participantsList.map((item) => {
                    return <li><img src={item.img} /></li>;
                })}
            </ul>
        </header>
    );
}