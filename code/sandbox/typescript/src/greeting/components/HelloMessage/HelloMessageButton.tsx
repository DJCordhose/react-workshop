import * as React from 'react';
import {SyntheticEvent} from "react";

const HelloMessageButton = ({text, onClicked} : {text:string, onClicked : () => void}) => {
    return <div>
        <button
            onClick={() => onClicked()}>
            {text}
        </button>
    </div>
}

export default HelloMessageButton;