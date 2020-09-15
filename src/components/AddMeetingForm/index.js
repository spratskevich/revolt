import React from 'react';
import './AddMeetingForm.css';

let AddMeetingForm = (props) => {
    return (
    <form className="meeting-form">
        <label for="meetings-name">Введите название</label>
        <br />
        <input type="text" id="meetings-name" name="meetings-name"></input>
        <br />
        <label for="meetings-img">Выберите изображение</label>
        <br />
        <input type="file" id="meetings-img" name="meetings-img"></input>
        <br />
        <input type="submit" value="Submit"></input>
        <button type="button" onClick={props.onClick}>Отмена</button>
        
    </form>
    );
}

export default AddMeetingForm;