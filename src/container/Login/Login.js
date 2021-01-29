import React from 'react';
import { connect } from 'react-redux';
import { postData } from '../../actions/index';
import formInputs from './Login.json';
import PageView from '../../components/PageView/PageView';
import * as Constants from '../../global-constants';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          loginStatus: ''
        }
      }
    
      static getDerivedStateFromProps = (props, state) => {
          console.log(props)
        if(props.loginStatus !== state.loginStatus){
          if(props.loginStatus === 200) {
            props.history.push('/' + Constants.UrlHome);
          }

          return {
            loginStatus: props.loginStatus
          }
        }
        return null;
      }
    
      loginUser = (user) => {
        this.props.postData(Constants.UrlLoginApi, user);
      }
    render() {
        return (
            <main className="login" aria-labelledby="form-title" aria-describedby="form-description">
                <PageView title={Constants.LoginTitle} desc={Constants.LoginDescription} formInputs={formInputs} formSubmit={this.loginUser}/>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      loginStatus: state.setData.loginStatus
    }
}

export default connect(mapStateToProps, { postData })(Login)