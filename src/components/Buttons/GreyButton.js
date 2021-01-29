import React from 'react';
import './GreyButton.scss';

export default function GreyButton(props) {
    return (
        <button aria-label={`Go to ${props.text} Image`} className={`button-grey button-grey-${props.text}`} onClick={props.handleClick}>
            {props.text}
        </button>
    )
}
