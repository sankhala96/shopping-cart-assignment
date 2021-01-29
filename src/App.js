import React from "react";
import "./App.scss";
import { Switch, Route, withRouter } from "react-router-dom";

import Header from "./container/Header/Header";
import Home from "./container/Home/Home";
import * as Constants from "./global-constants";
import Footer from "./components/Footer/Footer";
import PLP from "./container/PLP/PLP";
import { connect } from "react-redux";
import Cart from "./components/Cart/Cart";
import BackDrop from "./components/BackDrop/BackDrop";
import Register from "./container/Register/Register";
import Login from "./container/Login/Login";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: props.cart,
      isDrawerOpen: false,
      screenSize: window.matchMedia(`(min-width: ${Constants.ScreenLaptop})`)
        .matches
        ? Constants.ScreenLaptop
        : window.matchMedia(`(min-width: ${Constants.ScreenTablet})`).matches
        ? Constants.ScreenTablet
        : Constants.ScreenMobile,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.cart !== state.cart) {
      return {
        cart: props.cart
      }
    }
    return null;
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = (event) => {
    this.setState(
      {
        screenSize: window.matchMedia(`(min-width: ${Constants.ScreenLaptop})`)
          .matches
          ? Constants.ScreenLaptop
          : window.matchMedia(`(min-width: ${Constants.ScreenTablet})`).matches
          ? Constants.ScreenTablet
          : Constants.ScreenMobile,
      },
      () => {
        if (
          this.state.isDrawerOpen &&
          (this.state.screenSize === Constants.ScreenMobile ||
            this.state.screenSize === Constants.ScreenTablet)
        ) {
          this.toggleDrawer(false)(event);
          this.props.history.push("/" + Constants.UrlCart);
        }
        if (this.props.location.pathname === ('/' + Constants.UrlCart)
          && this.state.screenSize === Constants.ScreenLaptop) {
          this.toggleDrawer(true)(event);
          this.props.history.goBack();
        }
      }
    );
  };

  openCart = (event) => {
    if (this.state.screenSize === Constants.ScreenLaptop) {
      this.toggleDrawer(!this.state.isDrawerOpen)(event);
    } else {
      this.props.history.push('/' + Constants.UrlCart);
    }
  }

  toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    this.setState({
      isDrawerOpen: open,
    });
  };

  render() {
    return (
      <div className="app">
        <Header
          cartItems={Object.keys(this.state.cart).reduce(
            (totalItems, cartItem) => this.props.cart[cartItem].quantity + totalItems,
            0
          )}
          screenSize={this.state.screenSize}
          openCart={this.openCart}
        />
        <div className="app-container" tabIndex={this.state.isDrawerOpen ? '-1' : '0'}>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Home {...props} screenSize={this.state.screenSize} />
              )}
            />
            <Route
              exact
              path={`/${Constants.UrlHome}`}
              render={(props) => (
                <Home {...props} screenSize={this.state.screenSize} />
              )}
            />
            <Route
              exact
              path={`/${Constants.UrlPlp}`}
              render={(props) => (
                <PLP {...props} screenSize={this.state.screenSize} />
              )}
            />
            <Route
              exact
              path={`/${Constants.UrlCart}`}
              render={(props) => (
                <Cart {...props} screenSize={this.state.screenSize} />
              )}
            />
            <Route
              exact
              path={`/${Constants.UrlRegisterApi}`}
              render={(props) => (
                <Register {...props} />
              )}
            />
            <Route
              exact
              path={`/${Constants.UrlLoginApi}`}
              render={(props) => (
                <Login {...props} />
              )}
            />
          </Switch>
          {this.state.isDrawerOpen && <Cart closeCart={this.toggleDrawer(false)} screenSize={this.state.screenSize} />}
        </div>
        <Footer />
        {this.state.isDrawerOpen && <BackDrop onClick={this.toggleDrawer(false)} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.setData.cart,
  };
};

export default withRouter(connect(mapStateToProps, null)(App));
