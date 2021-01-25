import React from 'react';
import './PinkButton.scss'

export default function PinkButton(props) {
    return (
        <button className={`button-pink ${props.className ? props.className : ''} ${props.rightContent ? 'button-pink--space-between' : ''}`} onClick={props.handleClick}>
            <span>{props.text}</span>
            {props.rightContent && <span>{props.rightContent}</span>}
        </button>
    )
}
