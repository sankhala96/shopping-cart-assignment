import React from 'react';
import './BackDrop.scss';

export default function BackDrop(props) {
    return (
        <div className="backdrop" onClick={props.onClick}></div>
    )
}
