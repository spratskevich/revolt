import React, {useState, useRef} from 'react';
import axios from 'axios';
import styled from "styled-components";



let AddMeetingForm = (props) => {
    let [meetingInfo, setMeetingInfo] = useState({});
    let backgroundImageRef = useRef(null);

    function handleInputChange(event) {
        let newState = {};
        Object.assign(newState, meetingInfo);
        const value = event.target.name === 'background_image'
                      ? URL.createObjectURL(event.target.files[0])
                      : event.target.value;
        newState[event.target.name] = value;
        setMeetingInfo(newState);
    }

    function submitForm(event) {
        /*let item = {};
        Object.assign(item, meetingInfo);
        let reader = new FileReader();
        reader.onloadend = function() {
            item.img = reader.result;
            axios.post('http://localhost:3004/meetings', item)
            .then((response) => {
                console.log(response);
            });
            
            props.onClick();
        };
        reader.readAsDataURL(backgroundImageRef.current.files[0]);*/

        axios.post('http://localhost:3004/meetings', meetingInfo)
        .then((response) => {
            console.log(response);
        });

        
        props.onClick();

        event.preventDefault();
    }

    return (
    <StyledAddMeetingForm onSubmit={submitForm}>
        <label for="title">Название</label>
        <br />
        <input type="text" id="title" name="title" value={meetingInfo["title"]} onChange={handleInputChange} required></input>
        <label for="organizer">Организатор</label>
        <br />
        <input type="text" id="organizer" name="organizer" value={meetingInfo["organizer"]} onChange={handleInputChange} required></input>
        <label for="place">Место проведения</label>
        <br />
        <input type="text" id="place" name="place" value={meetingInfo["place"]} onChange={handleInputChange} required></input>
        <label for="start time">Время начала</label>
        <br />
        <input type="datetime-local" id="start time" name="start time" value={meetingInfo["start time"]} onChange={handleInputChange}></input>
        {/* <label for="duration">Предпологаемая длительность</label>
        <br />
        <input type="number" id="duration" name="duration" value={meetingInfo["duration"]} onChange={handleInputChange}></input> */}
        <br />
        <label for="background_image">Выберите изображение</label>
        <br />
        <input type="file" id="background_image" name="background_image" ref={backgroundImageRef} onChange={handleInputChange} required accept="image/x-png, image/jpeg"></input>
        <br />
        <input type="submit" value="Создать"></input>
        <button type="button" onClick={props.onClick}>Отмена</button>
    </StyledAddMeetingForm>
    );
}

const StyledAddMeetingForm = styled.form `
    text-align: left;
    padding: 10px;
    min-width: 250px;
    background-color: white;
    border-radius: 10px;
    border: 1px solid black;
    position: fixed;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    input[type=text] {
    
        width: 100%;
        margin: 8px 0px;
        padding: 12px 20px;
        box-sizing: border-box;
        outline: none;
        border: 3px solid #ccc;
        transition: 0.5s;
    }

    input[type=text]:focus {
        border: 3px solid rgb(0, 140, 255);
    }
`;

export default AddMeetingForm;