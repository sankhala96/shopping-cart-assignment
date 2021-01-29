import React from "react";
import './Form.scss';
import PinkButton from "../Buttons/PinkButton";
import { validate } from './Validate';
import * as Constants from "../../global-constants";

class Form extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            active: '',
            data: {}
        }
    }

    handleChange = (e,formInput) => {
        const target = e.target;
        const data = this.state.data;

        data[target.name] = target.value;
        this.setState({data: data, active: ''});
        this.validateForm(formInput,target.value);
    }

    validateForm = (formInput, value) => {
        if (formInput.validations && formInput.validations.length > 0) {
          formInput.errorMessage = formInput.validations.reduce(
            (cumulativeMessage, checkIf) => {
              const errorMessage =
                formInput.name === Constants.ConfirmPassword
                  ? validate(checkIf, value, this.state.data.password)
                  : validate(checkIf, value);
              return (
                cumulativeMessage +
                (cumulativeMessage !== "" && errorMessage !== "" ? ", " : "") +
                errorMessage
              );
            },
            ""
          );
          formInput.valid = formInput.errorMessage === "" ? true : false;
        } else {
          formInput.errorMessage = "";
          formInput.valid = true;
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.formSubmit(this.state.data);
    }

    render() {
        return (
            <form autoComplete="off" aria-labelledby="form-title">
              {this.props.formInputs.map((formInput, idx) => {
                return (
                  <div key={formInput.name + idx} className={`form-group${this.state.active === formInput.name ? ' form-group-active': ''}`}>
                    <label htmlFor={formInput.name}>{formInput.label}</label>
                    <input
                      type={formInput.type}
                      name={formInput.name}
                      id={formInput.name}
                      onFocus={() => this.setState({active: formInput.name})}
                      onBlur={(e) => this.handleChange(e,formInput)}
                      required={formInput.validations.indexOf(Constants.Required) !== -1}
                      aria-required={formInput.validations.indexOf(Constants.Required) !== -1}
                      aria-invalid={!formInput.valid && formInput.errorMessage !== ""}
                      aria-describedby={`${formInput.name}-error`}
                    />
                    {!formInput.valid && formInput.errorMessage !== "" && (
                      <p id={`${formInput.name}-error`}>{formInput.errorMessage}</p>
                    )}
                  </div>
                );
              })}
              <PinkButton ariaLabel={this.props.btnText} text={this.props.btnText} type='submit' handleClick={this.handleSubmit} />
            </form>
        )
    }
}


export default Form;