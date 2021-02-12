import React from "react";
import "./PinkButton.scss";

export default function PinkButton(props) {
  return (
    <button
      className={`button-pink ${props.className ? props.className : ""}`}
      aria-label={props.ariaLabel}
      onClick={props.handleClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
}
