import React from "react";
import './PageView.scss';
import Form from "../Form/Form";

export default function PageView(props) {
  return (
    <div className="page-view">
      <div className="page-view-desc">
        <h3 id="form-title">{props.title}</h3>
        <p id="form-description">{props.desc}</p>
      </div>
      <Form
        formInputs={props.formInputs}
        btnText={props.title}
        formSubmit={props.formSubmit}
      />
    </div>
  );
}
