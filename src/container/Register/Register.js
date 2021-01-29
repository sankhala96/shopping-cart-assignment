import React from 'react';
import { connect } from 'react-redux';
import { postData } from '../../actions/index';
import formInputs from './Register.json';
import PageView from '../../components/PageView/PageView';
import * as Constants from '../../global-constants';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          registerStatus: ''
        }
      }
    
      static getDerivedStateFromProps(props, state) {
        if (props.registerStatus !== state.registerStatus) {
          if(props.registerStatus === 200) {
            props.history.push('/' + Constants.UrlHome);        
          }
          return {
            registerStatus: props.registerStatus
          }; 
        }
        return null;
      }

    registerUser = (user) => {
        delete user[Constants.ConfirmPassword];
        this.props.postData(Constants.UrlRegisterApi, user);
    }

    render() {
        return (
            <main className="register" aria-labelledby="form-title" aria-describedby="form-description">
                <PageView title={Constants.RegisterTitle} desc={Constants.RegisterDescription} formInputs={formInputs} formSubmit={this.registerUser}/>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      registerStatus: state.setData.registerStatus
    }
}
  

export default connect(mapStateToProps, { postData })(Register)
