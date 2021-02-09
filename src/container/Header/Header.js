import React from "react";
import "./Header.scss";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as Constants from "../../global-constants";
import CartButton from '../../components/Buttons/CartButton';
import { saveData } from '../../actions/index';

const navLinks = [
  {
    url: "home",
    name: "Home",
  },
  {
    url: "plp",
    name: "Products",
  },
  {
    url: "login",
    name: "Sign In",
  },
  {
    url: "register",
    name: "Register",
  },
];

class Header extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      loginStatus: '',
      registerStatus: '',
      menuOpen: false
    }
  }

  static getDerivedStateFromProps(props,state) {
    if(props.loginStatus !== state.loginStatus) {
      return {
        loginStatus: props.loginStatus
      }
    }

    if(props.registerStatus !== state.registerStatus) {
      return {
        registerStatus: props.registerStatus
      }
    }

    return null
  }

  handleLogout = () => {
    this.props.saveData(Constants.UrlLogout);
  }

  handleMenuItemClick = (menuItem) => {
    this.props.history.push("/" + menuItem);
  };
  render() {
    return (
      <header className="header">
        {this.props.screenSize === Constants.ScreenMobile && (
          <div className="header-mobile" onClick={() => this.setState({menuOpen: !this.state.menuOpen})}>
            <div className="header-mobile-icon">1</div>
            <div className="header-mobile-icon">2</div>
            <div className="header-mobile-icon">3</div>
          </div>
        )}
        <a href="/">
        <img
          src={Constants.UrlPublic + Constants.ImgLogo}
          alt="logo"
          className="header-logo"
        ></img>
        </a>
        {(this.props.screenSize === Constants.ScreenLaptop ||
          this.props.screenSize === Constants.ScreenTablet) && (
          <nav className="header-nav">
            {navLinks.slice(0, 2).map((navlink, index) => (
              <NavLink
                className="header-link"
                activeClassName="header-link--active"
                to={"/" + navlink.url}
                key={index}
                onClick={() => this.handleMenuItemClick(navlink.url)}
              >
                {navlink.name}
              </NavLink>
            ))}
          </nav>
        )}
        <div className="header-rightpane">
          {(this.props.screenSize === Constants.ScreenLaptop ||
            this.props.screenSize === Constants.ScreenTablet) && (
            <nav className="header-nav  header-nav-right">
              {(this.state.registerStatus === 200 || this.state.loginStatus === 200) 
              ?
              <NavLink
                  className="header-link"
                  activeClassName="header-link--active"
                  to={"/" + Constants.UrlLoginApi}
                  onClick={() => this.handleLogout()}
              >{Constants.Logout}</NavLink>
              : navLinks.slice(2).map((navlink, index) => (
                <NavLink
                  className="header-link"
                  activeClassName="header-link--active"
                  to={"/" + navlink.url}
                  key={index}
                  onClick={() => this.handleMenuItemClick(navlink.url)}
                >
                  {navlink.name}
                </NavLink>
              ))}
            </nav>
          )}
          <CartButton cartItems={this.props.cartItems} handleClick={this.props.openCart} />
        </div>
        {this.props.screenSize === Constants.ScreenMobile && this.state.menuOpen && (
          <nav className="header-mobile-nav">
            {navLinks.map((navlink, index) => (
              <NavLink
                className="header-link"
                activeClassName="header-link--active"
                to={"/" + navlink.url}
                key={index}
                onClick={() => this.handleMenuItemClick(navlink.url)}
              >
                {navlink.name}
              </NavLink>
            ))}
          </nav>
        )}
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginStatus: state.setData.loginStatus,
    registerStatus: state.setData.registerStatus
  }
}

export default withRouter(connect(mapStateToProps, { saveData })(Header));
