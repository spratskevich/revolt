import React from 'react';
import {v4 as uuidv4} from 'uuid';

import './AppHeader.css';

export default (props) => {
    return (
    <header>
        {props.titleList.map((item) =>
        <div key={uuidv4()}>
            <h1>{item}</h1>
        </div>
        )}
    </header>
    );
};