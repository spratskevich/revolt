import React from 'react';
import './AppHeader.css';

let AppHeader = (props) => {
    console.log(props.titleList.map((item) => {return item;}));
    return (
    <header>
        {props.titleList.map((item) =>
        <div>
            <h1>{item}</h1>
        </div>
        )}
    </header>
    );
};

export default AppHeader;